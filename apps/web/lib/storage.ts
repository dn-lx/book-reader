import type { Book } from "@leaf/core";
export type StoredBook = {
  book: Book;
  pdf: Blob;
  audio: { name: string; blob: Blob }[];
};
const open = () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const r = indexedDB.open("leaf-library", 1);
    r.onupgradeneeded = () =>
      r.result.createObjectStore("books", { keyPath: "book.id" });
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
async function run<T>(
  mode: IDBTransactionMode,
  action: (s: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("books", mode),
      r = action(tx.objectStore("books"));
    tx.oncomplete = () => {
      resolve(r.result);
      db.close();
    };
    tx.onerror = () => {
      reject(tx.error || r.error);
      db.close();
    };
    tx.onabort = () => {
      reject(tx.error || new Error("Storage was interrupted."));
      db.close();
    };
  });
}
export const getLocalBooks = () =>
  run<StoredBook[]>("readonly", (s) => s.getAll());
export const putLocalBook = (book: StoredBook) =>
  run("readwrite", (s) => s.put(book));
export const deleteLocalBook = (id: string) =>
  run("readwrite", (s) => s.delete(id));
export function readSaved<T>(key: string, fallback: T): T {
  try {
    return (
      JSON.parse(localStorage.getItem("leaf." + key) || "null") ?? fallback
    );
  } catch {
    return fallback;
  }
}
export function writeSaved(key: string, value: unknown) {
  try {
    localStorage.setItem("leaf." + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function materialize(record: StoredBook): Book {
  return {
    ...record.book,
    local: true,
    pdf: URL.createObjectURL(record.pdf),
    chapters: record.book.chapters.map((c, i) => ({
      ...c,
      audio: URL.createObjectURL(record.audio[i].blob),
    })),
  };
}
