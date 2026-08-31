import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type StickyNote = {
  id: string;
  text: string;
  createdAt: string;
};

const NOTES_BLOB = "sticky-notes.json";
const NOTES_PATH = path.join(process.cwd(), "data", "sticky-notes.json");
const MAX_NOTES = 40;
const MAX_LENGTH = 240;

const jsonHeaders = { "Cache-Control": "no-store" };

let writeLock = Promise.resolve();

function withLock<T>(fn: () => Promise<T>) {
  const run = writeLock.then(fn, fn);
  writeLock = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

function sanitize(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, MAX_LENGTH);
}

function parseNotes(raw: string): StickyNote[] {
  try {
    const parsed = JSON.parse(raw) as StickyNote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function readNotes(): Promise<StickyNote[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const result = await get(NOTES_BLOB, {
      access: "private",
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) return [];
    const raw = await new Response(result.stream).text();
    return parseNotes(raw);
  }

  try {
    const raw = await fs.readFile(NOTES_PATH, "utf8");
    return parseNotes(raw);
  } catch {
    return [];
  }
}

async function writeNotes(notes: StickyNote[]) {
  const body = `${JSON.stringify(notes, null, 2)}\n`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(NOTES_BLOB, body, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60,
    });
    return;
  }

  await fs.mkdir(path.dirname(NOTES_PATH), { recursive: true });
  await fs.writeFile(NOTES_PATH, body);
}

export async function GET() {
  const notes = await readNotes();
  return Response.json(notes, { headers: jsonHeaders });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { text?: string } | null;
  const text = sanitize(body?.text ?? "");
  if (!text) {
    return Response.json({ error: "Note cannot be empty." }, { status: 400 });
  }

  const note = await withLock(async () => {
    const notes = await readNotes();
    const next: StickyNote = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...notes].slice(0, MAX_NOTES);
    await writeNotes(updated);
    return next;
  });

  return Response.json(note, { headers: jsonHeaders });
}

export async function PATCH(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { id?: string; text?: string }
    | null;
  const id = body?.id?.trim() ?? "";
  const text = sanitize(body?.text ?? "");
  if (!id || !text) {
    return Response.json({ error: "Note is missing." }, { status: 400 });
  }

  const note = await withLock(async () => {
    const notes = await readNotes();
    const index = notes.findIndex((item) => item.id === id);
    if (index === -1) return null;
    notes[index] = { ...notes[index], text };
    await writeNotes(notes);
    return notes[index];
  });

  if (!note) {
    return Response.json({ error: "Note not found." }, { status: 404 });
  }

  return Response.json(note, { headers: jsonHeaders });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = (url.searchParams.get("id") ?? body?.id ?? "").trim();
  if (!id) {
    return Response.json({ error: "Note is missing." }, { status: 400 });
  }

  const removed = await withLock(async () => {
    const notes = await readNotes();
    const next = notes.filter((item) => item.id !== id);
    if (next.length === notes.length) return false;
    await writeNotes(next);
    return true;
  });

  if (!removed) {
    return Response.json({ error: "Note not found." }, { status: 404 });
  }

  return Response.json({ ok: true }, { headers: jsonHeaders });
}
