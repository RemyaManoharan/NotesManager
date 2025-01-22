/* eslint-disable  */
import React from 'react';
import { useNotesStore } from '../../store/useNoteStore';
import { Note } from '../../types/note';
import {  useNavigate } from 'react-router-dom';
import NoteCard from '@/components/NoteCard/NoteCard';

const NoteList: React.FC= () => {
const { notes } = useNotesStore();
const deleteNote = useNotesStore((state) => state.deleteNote);
  const navigate = useNavigate();
   const handleEditClick = (note :Note) =>{
    navigate(`/note/${note.id}`);
   }

  return (
    <div className='grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 p-4'>
      {notes.map((note) => (
        <NoteCard
        key={note.id}
        note={note}
        onDelete={deleteNote}
        onClick={handleEditClick}
      />
      ))}
      
    </div>
  )
}

export default NoteList
