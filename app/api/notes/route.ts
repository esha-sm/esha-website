import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type StickyNote = {
  id: string;
  text: string;
  createdAt: string;
};

const NOTES_PATH = path.join(process.cwd(), "data", "sticky-notes.json");
const MAX_NOTES = 40;
const MAX_LENGTH = 240;

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

async function readNotes(): Promise<StickyNote[]> {
  try {
    const raw = await fs.readFile(NOTES_PATH, "utf8");
    const parsed = JSON.parse(raw) as StickyNote[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeNotes(notes: StickyNote[]) {
  await fs.mkdir(path.dirname(NOTES_PATH), { recursive: true });
  await fs.writeFile(NOTES_PATH, `${JSON.stringify(notes, null, 2)}\n`);
}

export async function GET() {
  const notes = await readNotes();
  return Response.json(notes);
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

  return Response.json(note);
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

  return Response.json(note);
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

  return Response.json({ ok: true });
}
