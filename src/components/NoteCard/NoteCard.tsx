/* eslint-disable  */
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
interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onClick: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onClick }) => {
  const { id, title, content, createdAt } = note;
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(note);
  };
  return (
    <div className="flex w-64 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-200 hover:shadow-xl">
      {/* Title Section with Blue Background - Reduced padding */}
      <div className="h-10 bg-blue-400 px-3 py-2">
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      </div>
      {/* Content Section */}
      <div className="flex-grow p-4">
        <p className="line-clamp-5 text-sm text-gray-600">{content}</p>
      </div>
      {/*Footer Section */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-3 py-2">
        {/* Date */}
        <span className="text-xs text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="rounded-full p-1 transition-colors hover:bg-gray-200"
            aria-label="Edit note"
          >
            <Pencil className="h-4 w-4 text-gray-600" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                
                className="rounded-full p-1 transition-colors hover:bg-gray-200"
                aria-label="Delete note"
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
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
                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
