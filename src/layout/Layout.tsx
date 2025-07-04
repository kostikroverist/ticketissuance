// src/Layout.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchIdStart } from '@/features/tickets/ticketsSlice';
import type { RootState, AppDispatch } from '@/app/store';
import SortToggle from '@/components/SortToggle';
import TransferFilter from '@/components/TransferFilter';
import { GiCommercialAirplane } from 'react-icons/gi';
import { setFilters } from '@/features/filters/filtersSlice'; // Імпортуємо дії для фільтрів
import { setSortOption } from '@/features/sort/sortSlice'; // Імпортуємо дію для сортування
import type { FilterOption } from '@/interfaces/Filters'; // Тип для FilterOption
import { Outlet } from 'react-router';
import type { SortOption } from '@/interfaces/tickets';

const Layout = () => {
  const dispatch: AppDispatch = useDispatch();
  const ticketsStatus = useSelector((state: RootState) => state.tickets.status);
  const ticketsError = useSelector((state: RootState) => state.tickets.error);

  const filters = useSelector((state: RootState) => state.filters.options);
  const currentSort = useSelector((state: RootState) => state.sort.currentSort);


  useEffect(() => {
    if (ticketsStatus === 'idle') {
      dispatch(fetchSearchIdStart());
    }
  }, [dispatch, ticketsStatus]);

  const handleFilterChange = (updatedFilters: FilterOption[]) => {
    dispatch(setFilters(updatedFilters));
  };

  const handleSortChange = (sortOption: SortOption) => {
    dispatch(setSortOption(sortOption));
  };

  return (
    <div className="pt-10 bg-[#f3f7fa] min-h-screen ">
      <div
        style={{ boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.2)' }}
        className="shadow-md mx-auto w-[75px] h-[75px] flex justify-center items-center space-x-2 mb-4 bg-[#2196f3] rounded-full p-2"
      >
        <GiCommercialAirplane className="w-10 h-10 text-white" />
      </div>
      <div className="flex justify-center flex-wrap space-y-4 p-4 gap-4">
        <div className="flex items-start">
          <TransferFilter filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="flex flex-col space-y-5">
          <SortToggle onSortChange={handleSortChange} activeSort={currentSort} /> {/* Передаємо activeSort */}
          {ticketsStatus === 'loading' && ticketsError === null && <p>Завантаження квитків...</p>}
          {ticketsStatus === 'failed' && <p style={{ color: 'red' }}>Помилка завантаження: {ticketsError}</p>}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;