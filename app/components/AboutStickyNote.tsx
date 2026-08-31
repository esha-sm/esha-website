"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

type Note = {
  id: string;
  text: string;
  createdAt: string;
};

type Position = { x: number; y: number };

const STORAGE_POS = "esha-sticky-pos";
const STORAGE_NOTES = "esha-sticky-notes";
const NOTE_WIDTH = 154;
const NOTE_MIN_VISIBLE = 48;

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function defaultPosition(): Position {
  const left = Math.max(24, window.innerWidth - NOTE_WIDTH - 36);
  const top = Math.min(Math.round(window.innerHeight * 0.32), window.innerHeight - 260);
  return { x: left, y: Math.max(72, top) };
}

function clampPosition(pos: Position): Position {
  const maxX = Math.max(8, window.innerWidth - NOTE_MIN_VISIBLE);
  const maxY = Math.max(8, window.innerHeight - NOTE_MIN_VISIBLE);
  return {
    x: Math.min(Math.max(-NOTE_WIDTH + NOTE_MIN_VISIBLE, pos.x), maxX),
    y: Math.min(Math.max(8, pos.y), maxY),
  };
}

export function AboutStickyNote() {
  const noteRef = useRef<HTMLElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState("");
  const [pos, setPos] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const savedPos = window.localStorage.getItem(STORAGE_POS);
    if (savedPos) {
      try {
        setPos(clampPosition(JSON.parse(savedPos) as Position));
      } catch {
        setPos(defaultPosition());
      }
    } else {
      setPos(defaultPosition());
    }

    const load = async () => {
      try {
        const response = await fetch("/api/notes");
        if (!response.ok) throw new Error("bad response");
        const data = (await response.json()) as Note[];
        if (Array.isArray(data)) {
          setNotes(data);
          window.localStorage.setItem(STORAGE_NOTES, JSON.stringify(data));
          return;
        }
      } catch {
        const cached = window.localStorage.getItem(STORAGE_NOTES);
        if (cached) {
          try {
            setNotes(JSON.parse(cached) as Note[]);
          } catch {
            setNotes([]);
          }
        }
      }
    };

    void load();
  }, []);

  useEffect(() => {
    const onResize = () => {
      setPos((current) => (current ? clampPosition(current) : current));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!pos) return;
    window.localStorage.setItem(STORAGE_POS, JSON.stringify(pos));
  }, [pos]);

  const persistLocal = useCallback((next: Note[]) => {
    window.localStorage.setItem(STORAGE_NOTES, JSON.stringify(next));
  }, []);

  const pinNote = async () => {
    const text = draft.replace(/\s+/g, " ").trim();
    if (!text || saving) return;
    setSaving(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const note = (await response.json()) as Note;
        setNotes((current) => {
          const next = [note, ...current.filter((item) => item.id !== note.id)];
          persistLocal(next);
          return next;
        });
        setDraft("");
        return;
      }
    } catch {
      // Fall through to local pin.
    } finally {
      setSaving(false);
    }

    const note: Note = {
      id: `${Date.now()}`,
      text,
      createdAt: new Date().toISOString(),
    };
    setNotes((current) => {
      const next = [note, ...current];
      persistLocal(next);
      return next;
    });
    setDraft("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const text = editDraft.replace(/\s+/g, " ").trim();
    const id = editingId;
    setEditingId(null);
    if (!text) return;

    setNotes((current) => {
      const next = current.map((note) => (note.id === id ? { ...note, text } : note));
      persistLocal(next);
      return next;
    });

    try {
      await fetch("/api/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, text }),
      });
    } catch {
      // Local copy already updated.
    }
  };

  const deleteNote = async (id: string) => {
    if (editingId === id) setEditingId(null);
    setNotes((current) => {
      const next = current.filter((note) => note.id !== id);
      persistLocal(next);
      return next;
    });

    try {
      await fetch("/api/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Local copy already updated.
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("textarea, input, button")) return;
    if (!pos) return;

    event.preventDefault();
    dragOffset.current = { x: event.clientX - pos.x, y: event.clientY - pos.y };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!dragging) return;
    setPos(
      clampPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      })
    );
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!dragging) return;
    setDragging(false);
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Already released.
    }
  };

  if (!pos) return null;

  return (
    <aside
      ref={noteRef}
      className={`sticky-note${dragging ? " is-dragging" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-label="Leave a note"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="sticky-note-pin" aria-hidden="true" />
      <p className="sticky-note-label">leave a note</p>
      <textarea
        className="sticky-note-input"
        rows={1}
        maxLength={240}
        placeholder="say hi..."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            void pinNote();
          }
        }}
      />
      <button
        type="button"
        className="sticky-note-pin-btn"
        onClick={() => void pinNote()}
        disabled={saving || !draft.trim()}
      >
        pin it
      </button>
      {notes.length > 0 ? (
        <ul className="sticky-note-list">
          {notes.map((note) => (
            <li key={note.id}>
              {editingId === note.id ? (
                <textarea
                  className="sticky-note-input sticky-note-input--edit"
                  rows={1}
                  maxLength={240}
                  value={editDraft}
                  autoFocus
                  onChange={(event) => setEditDraft(event.target.value)}
                  onBlur={() => void saveEdit()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void saveEdit();
                    }
                    if (event.key === "Escape") setEditingId(null);
                  }}
                />
              ) : (
                <div className="sticky-note-item">
                  <button
                    type="button"
                    className="sticky-note-item-text"
                    onClick={() => {
                      setEditingId(note.id);
                      setEditDraft(note.text);
                    }}
                  >
                    <span>{note.text}</span>
                    <em>- {formatDate(note.createdAt)}</em>
                  </button>
                  <button
                    type="button"
                    className="sticky-note-delete"
                    onClick={() => void deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
