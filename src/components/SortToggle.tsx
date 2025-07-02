import React, { useState } from 'react';

export type SortOption = 'cheapest' | 'fastest';

interface SortToggleProps {
    onSortChange: (sortOption: SortOption) => void;
    initialSortOption?: SortOption;
}

const SortToggle: React.FC<SortToggleProps> = ({
    onSortChange,
    initialSortOption = 'cheapest'
}) => {
    const [activeSort, setActiveSort] = useState<SortOption>(initialSortOption);

    const handleSortClick = (option: SortOption) => {
        setActiveSort(option);
        onSortChange(option);
    };

    return (
        <div className="flex rounded-[5px]  bg-white border border-gray-300 shadow-sm">
            <button
                className={`
          flex-1  py-4 px-4 rounded-tl-[5px] rounded-bl-[5px] text-base 
          transition-all duration-300 ease-in-out
          ${
              activeSort === 'cheapest'
                  ? 'bg-[#2196f3] text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200'
          } 
        `}
                onClick={() => handleSortClick('cheapest')}
            >
                Самый дешевый
            </button>
            <button
                className={`
          flex-1 py-4 px-4  text-base 
          transition-all duration-300 ease-in-out
          rounded-tr-[5px] rounded-br-[5px]
          ${
              activeSort === 'fastest'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-transparent text-gray-700 hover:bg-gray-200'
          } 
        `}
                onClick={() => handleSortClick('fastest')}
            >
                Самый быстрый
            </button>
        </div>
    );
};

export default SortToggle;
