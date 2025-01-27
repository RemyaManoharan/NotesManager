import React from 'react';
import { useNotesStore } from '../../store/useNoteStore';
import { Note } from '../../types/note';
import { useNavigate } from 'react-router-dom';
import NoteCard from '@/components/NoteCard/NoteCard';

const NoteList: React.FC = () => {
  const { notes, selectedCategory } = useNotesStore();
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const filteredNotes = notes.filter(
    (note) => note.category === selectedCategory
  );
  const navigate = useNavigate();
  const handleEditClick = (note: Note) => {
    navigate(`/note/${note.id}`);
  };

  return (
    <div className="grid auto-rows-fr grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {filteredNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onClick={handleEditClick}
        />
      ))}
    </div>
 
  );
};

export default NoteList;
