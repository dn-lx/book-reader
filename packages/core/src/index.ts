export type Segment = {
  start: number;
  end: number;
  page: number;
  text: string;
};
export type Chapter = {
  id?: string;
  title: string;
  audio: string;
  file?: string;
  duration: number;
  firstPage?: number;
  segments: Segment[];
};
export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description?: string;
  voice?: string;
  pageCount: number;
  pdf: string;
  cover?: string;
  chapters: Chapter[];
  duration: number;
  timing?: string;
  local?: boolean;
  narration?: "kokoro" | "google";
  alternateNarration?: string;
};
export type Progress = {
  chapter: number;
  time: number;
  page: number;
  updated: number;
  view?: "text" | "pdf";
  follow?: boolean;
};
export type Bookmark = {
  id: string;
  bookId: string;
  chapter: number;
  time: number;
  page: number;
  text: string;
  created: number;
};
export const palette = {
  background: "#f5f3ec",
  paper: "#fffefb",
  ink: "#292e24",
  muted: "#73786b",
  accent: "#65704f",
  accentSoft: "#e9eddf",
  border: "#dfdfd3",
  terra: "#b46d48",
};
export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(Number(v)) ? Number(v) : min));
export function formatTime(seconds: number, long = false) {
  const n = Math.floor(Math.max(0, Number(seconds) || 0));
  const h = Math.floor(n / 3600),
    m = Math.floor((n % 3600) / 60),
    s = n % 60;
  return h || long
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}
export function listeningLength(seconds: number) {
  if (!(seconds > 0)) return "Audio included";
  const h = Math.floor(seconds / 3600),
    m = Math.round((seconds % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m} min`;
}
export function segmentAt(segments: Segment[], time: number) {
  if (!segments?.length || time < segments[0].start) return -1;
  let lo = 0,
    hi = segments.length - 1;
  while (lo < hi) {
    const m = Math.ceil((lo + hi) / 2);
    if (segments[m].start <= time) lo = m;
    else hi = m - 1;
  }
  return lo;
}
export function globalPosition(
  chapters: Chapter[],
  chapter: number,
  time: number,
) {
  return (
    chapters.slice(0, chapter).reduce((n, x) => n + x.duration, 0) +
    clamp(time, 0, chapters[chapter]?.duration || 0)
  );
}
export function locatePosition(chapters: Chapter[], time: number) {
  let remaining = clamp(
    time,
    0,
    chapters.reduce((n, x) => n + x.duration, 0),
  );
  for (let i = 0; i < chapters.length; i++) {
    if (remaining < chapters[i].duration || i === chapters.length - 1)
      return { chapter: i, time: remaining };
    remaining -= chapters[i].duration;
  }
  return { chapter: 0, time: 0 };
}
export function validateTimedBook(
  data: unknown,
  audioNames: string[],
  pageCount: number,
): Chapter[] {
  const d = data as { chapters?: Array<Record<string, unknown>> };
  if (!d || !Array.isArray(d.chapters) || !d.chapters.length)
    throw new Error("The timing file needs a chapters list.");
  return d.chapters.map((chapter, i) => {
    const file = String(chapter.file || chapter.audio || "")
      .split("/")
      .pop()!;
    if (!audioNames.includes(file))
      throw new Error(
        `Choose the audio file “${file || `chapter ${i + 1}`}” too.`,
      );
    const duration = Number(chapter.duration);
    if (!(duration > 0) || !Number.isFinite(duration))
      throw new Error("Each timed chapter needs a positive duration.");
    if (chapter.segments !== undefined && !Array.isArray(chapter.segments))
      throw Error("Chapter passages must be a list.");
    let previous = -1;
    const segments = ((chapter.segments || []) as Segment[]).map((s) => {
      const start = Number(s.start),
        end = Number(s.end),
        page = Number(s.page);
      if (
        !Number.isFinite(start) ||
        !Number.isFinite(end) ||
        start < 0 ||
        start < previous ||
        end <= start ||
        end > duration + 0.2 ||
        !Number.isInteger(page) ||
        page < 1 ||
        page > pageCount ||
        typeof s.text !== "string" ||
        !s.text.trim()
      )
        throw new Error("A passage has an invalid time, page number or text.");
      previous = end;
      return { start, end, page, text: s.text };
    });
    return {
      title: String(chapter.title || `Chapter ${i + 1}`),
      file,
      audio: file,
      duration,
      segments,
    };
  });
}
export function validateBook(value: unknown): Book {
  const b = value as Book;
  if (
    !b ||
    typeof b.id !== "string" ||
    !/^[a-zA-Z0-9_-]+$/.test(b.id) ||
    typeof b.author !== "string" ||
    typeof b.pdf !== "string" ||
    !b.pdf ||
    typeof b.title !== "string" ||
    !Array.isArray(b.chapters) ||
    !b.chapters.length ||
    !Number.isInteger(b.pageCount) ||
    b.pageCount < 1 ||
    b.chapters.some(
      (c) =>
        !c ||
        typeof c.audio !== "string" ||
        !c.audio ||
        (c.file !== undefined && typeof c.file !== "string") ||
        (c.firstPage !== undefined &&
          (!Number.isInteger(c.firstPage) ||
            c.firstPage < 1 ||
            c.firstPage > b.pageCount)),
    )
  )
    throw new Error("This book file is incomplete.");
  const chapters = validateTimedBook(
    b,
    b.chapters.map((c) => (c.file || c.audio).split("/").pop()!),
    b.pageCount,
  ).map((c, i) => ({
    ...c,
    audio: b.chapters[i].audio,
    firstPage: b.chapters[i].firstPage || c.segments[0]?.page || 1,
  }));
  return {
    ...b,
    chapters,
    duration: chapters.reduce((n, c) => n + c.duration, 0),
  };
}
