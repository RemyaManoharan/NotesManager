export interface Note {
    id: string;
    title: string;
    content: string;
    category: 'Personal' | 'Work' | 'Ideas' | 'Others';
    createdAt: string;
    updatedAt: string;
   
}