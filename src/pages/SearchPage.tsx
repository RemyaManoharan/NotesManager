import React, { useState, useEffect } from 'react';
import { useNotesStore } from '@/store/useNoteStore';
import { useNavigate } from 'react-router-dom';
import NoteCard from '@/components/NoteCard/NoteCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { Note } from '@/types/note';

const SearchPage = () => {
  const { notes } = useNotesStore();
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const navigate = useNavigate();
  const [searchTitle, setsearchTitle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const handleEditClick = (note: Note) => {
    navigate(`/note/${note.id}`);
  };
  const clearDate = () => {
    setSelectedDate(undefined);
  };
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };
  useEffect(() => {
    let filteredNotes = notes;
    if (searchTitle) {
      filteredNotes = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (selectedDate) {
      filteredNotes = filteredNotes.filter((note) => {
        const noteDate = new Date(note.createdAt).setHours(0, 0, 0, 0);
        const searchDate = selectedDate.setHours(0, 0, 0, 0);
        return noteDate === searchDate;
      });
    }
    setSearchedNotes(filteredNotes);
  }, [searchTitle, selectedDate, notes]);

  return (
    <div className="bg-grey-50 container mx-auto mt-8 p-4">
      <div className="space-y-4">
        {/* Search Filters */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search by Title */}
          <div className="flex flex-1 gap-2">
            <Input
              placeholder="Search by Title"
              value={searchTitle}
              onChange={(e) => setsearchTitle(e.target.value)}
              className="w-full"
            />
            {searchTitle && (
              <Button
                type="button"
                onClick={() => {
                  setsearchTitle('');
                }}
              >
                X
              </Button>
            )}
          </div>

          {/* Search by Date */}
          <div className="flex gap-2">
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 px-4">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, 'M/d/yyyy')
                  ) : (
                    <span>Filter by date </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-o w-auto" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {selectedDate && (
              <Button variant="ghost" size="icon" onClick={clearDate}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Results*/}
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            Search Results ({searchedNotes.length})
          </h2>
          {searchedNotes.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No notes found matching your search criteria.
            </p>
          ) : (
            <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
              {searchedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={deleteNote}
                  onClick={handleEditClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
