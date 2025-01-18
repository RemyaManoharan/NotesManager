import React from 'react';
import  { Formik, Form, Field, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotesStore } from '../../store/useNoteStore';
import * as Yup from 'yup';



type CategoryType = 'Work' | 'Personal' | 'Ideas' | 'Others';

interface NoteFormValues {
  title: string;
  content: string;
  category: CategoryType;
}

const categories: CategoryType[] = ['Work', 'Personal', 'Ideas', 'Others'];

const NoteSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    category: Yup.string().oneOf(['Work', 'Personal', 'Ideas', 'Others']).required('Category is required'),
  });

  
  const NoteEditor : React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { addNote, updateNote, getNoteById } = useNotesStore();

    const note = id ? getNoteById(id) : null;
    const isEditMode = Boolean(note);
// Inside your NoteEditor component
const { notes } = useNotesStore();
console.log("All Notes in Store:", notes);
    const initialValues: NoteFormValues = {
      title: note?.title || '', 
      content: note?.content || '',
      category: note?.category || 'Work',
    };
    const handleSubmit = async (values: NoteFormValues , { setSubmitting }: FormikHelpers<NoteFormValues>) : Promise<void> => {
     try {
       if ( isEditMode && id ) {
           updateNote(id, values);
           console.log("Updated Note:", values);
       } else {
           addNote(values);
           console.log("New Note Added:", values);
       }
       navigate('/');
     } catch (error) {
       console.log(error);
     
     }   
     finally {
       setSubmitting(false);
     }
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
          
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Update Note' : 'New Note'}
        </h1>
        
        <Formik
          initialValues={initialValues}
          validationSchema={NoteSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-7">
              <div>
                <Field
                  name="title"
                  type="text"
                  placeholder="Note Title"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>
  
              <div>
                <Field
                  as="textarea"
                  name="content"
                  rows={6}
                  placeholder="Note Content"
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm mt-1">{errors.content}</div>
                )}
              </div>
  
              <div>
                <legend className="text-lg font-medium mb-2">Category</legend>
                <div className="flex gap-4 flex-wrap">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <Field
                        type="radio"
                        name="category"
                        value={category}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category}</span>
                    </label>
                  ))}
                </div>
                {errors.category && touched.category && (
                  <div className="text-red-500 text-sm mt-1">{errors.category}</div>
                )}
              </div>
  
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isEditMode ? 'Update' : 'Add Note'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
  
  export default NoteEditor
  