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
    <div className="h-full w-64 bg-transparent px-4">
      <Tabs
        defaultValue={defaultSelected}
        orientation="vertical"
        className="w-full"
        onValueChange={handleCategoryClick}
      >
        <TabsList className="mt-5 flex h-full w-full flex-col space-y-4 p-2">
          {SIDEBAR_ITEMS.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.category}
              className={`flex w-full items-center justify-start gap-2 px-4 py-2 transition-colors ${
                selectedCategory === item.category
                  ? 'bg-white/10'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <span
                style={{
                  color:
                    selectedCategory === item.category
                      ? 'var(--note-primary)'
                      : 'var(--text)',
                  opacity: selectedCategory === item.category ? 1 : 0.8,
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  color:
                    selectedCategory === item.category
                      ? 'var(--note-primary)'
                      : 'var(--text)',
                  opacity: selectedCategory === item.category ? 1 : 0.8,
                }}
              >
                {item.category}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SideBar;
