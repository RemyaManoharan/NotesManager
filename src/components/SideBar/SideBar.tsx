import React, { useEffect, useState } from 'react';
import { RiHome6Line } from 'react-icons/ri';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import {
  LightbulbIcon,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotesStore } from '@/store/useNoteStore';
import { Button } from '../ui/button';

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
  const [isExpanded, setIsExpanded] = useState<boolean>(
    window.innerWidth > 768
  );
  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
    <div
      className={`relative flex h-full flex-col bg-transparent transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'}`}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 z-50 h-6 w-6 rounded-full bg-gray-400 p-0.5 text-white hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

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
              {isExpanded && (
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
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SideBar;
