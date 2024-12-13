import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ScrollButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        " md:hidden absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:bg-gray-100",
        direction === 'left' ? '-left-4' : '-right-4'
      )}
    >
      {direction === 'left' ? (
        <ChevronLeft className="h-6 w-6" />
      ) : (
        <ChevronRight className="h-6 w-6" />
      )}
    </button>
  );
}
