import React from 'react';
import { RiHome6Line } from 'react-icons/ri';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LightbulbIcon, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotesStore } from '@/store/useNoteStore';

interface SidebarItem {
  id: number;
  category: string;
  icon: React.ReactNode;
}
interface SidebarProps {
  onCategoryChange?: (category: string) => void;
  defaultSelected?: string;
}

const SideBar: React.FC<SidebarProps> = ({
  onCategoryChange,
  defaultSelected = 'Work',
}) => {
  const setSelectedCategory = useNotesStore(
    (state) => state.setSelectedCategory
  );
  const selectedCategory = useNotesStore((state) => state.selectedCategory);
  // const [selectedCategory, setSelectedCategory] = useState<string>('Work');
  const ICON_CLASS = 'h-5 w-5';
  const SIDEBAR_ITEMS: SidebarItem[] = [
    {
      id: 0,
      category: 'Work',
      icon: <RiHome6Line className={ICON_CLASS} />,
    },
    {
      id: 1,
      category: 'Personal',
      icon: <HiOutlineDocumentReport className={ICON_CLASS} />,
    },
    {
      id: 2,
      category: 'Ideas',
      icon: <LightbulbIcon className={ICON_CLASS} />,
    },
    {
      id: 3,
      category: 'Others',
      icon: <MoreHorizontal className={ICON_CLASS} />,
    },
  ];
  const handleCategoryClick = (categoryName: string): void => {
    setSelectedCategory(categoryName);
    onCategoryChange?.(categoryName);
  };

  return (
    <div className="h-full w-64 border-r border-gray-200 bg-white px-4">
      <Tabs
        defaultValue={defaultSelected}
        orientation="vertical"
        className="w-full"
        onValueChange={handleCategoryClick}
      >
        <TabsList className="flex h-full w-full flex-col space-y-4 bg-white p-2">
          {SIDEBAR_ITEMS.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.category}
              className="flex w-full items-center justify-start gap-2 px-4 py-2"
            >
              <span
                className={`${selectedCategory === item.category ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {item.icon}
              </span>
              <span>{item.category}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SideBar;
