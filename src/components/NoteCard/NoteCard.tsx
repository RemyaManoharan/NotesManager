import { Note } from '@/types/note';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { RichTextDisplay } from '../LexicalEditor/LexicalEditor';

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onClick: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onClick }) => {
  const { id, title, content, createdAt } = note;
  const [isExpanded, setIsExpanded] = useState(false);
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(note);
  };
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  return (
    // <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-card shadow-lg transition-shadow duration-200 hover:shadow-xl dark:border-gray-700 dark:shadow-none dark:hover:shadow-none">
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-all duration-300 ease-in-out animate-in slide-in-from-bottom-4 hover:scale-[1.02] hover:shadow-xl dark:border-muted dark:bg-card dark:shadow-none dark:hover:border-muted/60 dark:hover:shadow-none">
      {/* Title Section with Blue Background - Reduced padding */}
      <div
        className="h-10 px-3 py-2"
        style={{ backgroundColor: 'var(--note-primary)' }}
      >
        <h3 className="mb-2 from-neutral-100 text-lg text-white">{title}</h3>
      </div>
      {/* Content Section */}
      <div
        className={`flex-grow overflow-hidden p-4 ${isExpanded ? 'overflow-y-auto' : ''}`}
      >
               <RichTextDisplay content={content} isExpanded={isExpanded} />
        {content.length > 100 && (
          <button
            onClick={toggleExpand}
            className="mt-2 bg-transparent text-sm font-medium hover:opacity-80"
            style={{ color: 'var(--note-primary)' }}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      {/*Footer Section */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-3 py-2 dark:bg-muted/50">
        {/* Date */}
        <span className="text-xs text-muted-foreground">
          {new Date(createdAt).toLocaleDateString()}
        </span>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="rounded-full bg-transparent p-1 transition-colors hover:bg-transparent dark:hover:bg-muted"
            aria-label="Edit note"
          >
            <Pencil className="h-4 w-4 text-muted-foreground hover:text-blue-400" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="rounded-full bg-transparent p-1 transition-colors hover:bg-transparent dark:hover:bg-muted"
                aria-label="Delete note"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-blue-400" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this note?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete "
                  {title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-500">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
