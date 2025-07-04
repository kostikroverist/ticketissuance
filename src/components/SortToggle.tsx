import { setSortOption } from '@/features/sort/sortSlice';
import type { SortOption } from '@/interfaces/tickets';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router';

interface SortToggleProps {
    onSortChange: (sortOption: SortOption) => void;
    activeSort: SortOption;
}

const SortToggle: React.FC<SortToggleProps> = ({ onSortChange, activeSort }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const currentSortFromPath: SortOption = location.pathname.includes('/fast')
            ? 'fastest'
            : 'cheapest';
        if (currentSortFromPath !== activeSort) {
            dispatch(setSortOption(currentSortFromPath));
            onSortChange(currentSortFromPath);
        }
    }, [location.pathname, dispatch, onSortChange, activeSort]);

    const handleClick = (option: SortOption) => {
        dispatch(setSortOption(option));
        onSortChange(option);
    };
    return (
        <div className="flex text-center rounded-[5px] bg-white border border-gray-300 shadow-sm">
            <Link
                to="/cheap"
                onClick={() => handleClick('cheapest')}
                className={`
                    flex-1 py-4 px-4 rounded-tl-[5px] rounded-bl-[5px] text-base
                    transition-all duration-300 ease-in-out
                    ${
                        activeSort === 'cheapest'
                            ? 'bg-[#2196f3] text-white shadow-md'
                            : 'bg-transparent text-gray-700 hover:bg-gray-200'
                    }
                `}
            >
                Самый дешевый
            </Link>
            <Link
                to="/fast"
                onClick={() => handleClick('fastest')}
                className={`
                    flex-1 py-4 px-4 text-base rounded-tr-[5px] rounded-br-[5px]
                    transition-all duration-300 ease-in-out
                    ${
                        activeSort === 'fastest'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-transparent text-gray-700 hover:bg-gray-200'
                    }
                `}
            >
                Самый быстрый
            </Link>
        </div>
    );
};

export default SortToggle;
