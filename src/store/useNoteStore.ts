import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Note } from '../types/note';
import { v4 as uuidv4 } from 'uuid';

interface NotesState {
  notes: Note[];
  selectedCategory: string;
  addNote: (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  setSelectedCategory: (category: string) => void;
}
export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      selectedCategory: 'Work',
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      addNote: (noteData) => {
        const newNote: Note = {
          ...noteData,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          notes: [...state.notes, newNote],
        }));
      },

      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : note
          ),
        }));
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },

      getNoteById: (id) => {
        return get().notes.find((note) => note.id === id);
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
