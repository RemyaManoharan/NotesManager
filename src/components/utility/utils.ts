import { Note } from "@/types/note";

const NOTES_STORAGE_KEY = "notes";

export const saveNotesToLocalStorage = (notes: Note[]) => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

export const getNotesFromLocalStorage = (): Note[] => {
    const notesJSON = localStorage.getItem(NOTES_STORAGE_KEY);
    return notesJSON ? JSON.parse(notesJSON) : [];
};
