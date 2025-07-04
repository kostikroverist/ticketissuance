import TransferFilter from '@/components/TransferFilter';
import { checkboxFilters } from '../../constantsVariable';
import { useState } from 'react';
import SortToggle from '@/components/SortToggle';
import { GiCommercialAirplane } from 'react-icons/gi';

const HomePage = () => {
    const [filters, setFilters] = useState(checkboxFilters);

    const handleFilterUpdate = (updatedFilters: typeof filters) => {
        setFilters(updatedFilters);

        const activeIds = updatedFilters.filter(f => f.checked).map(f => f.id);
        console.log('Активні фільтри:', activeIds);
    };
    return (
        <div className="pt-10 bg-[#f3f7fa] min-h-screen ">
            <div
                style={{ boxShadow: '0px 0px 50px 0px rgba(0,0,0,0.2)' }}
                className="shadow-md   mx-auto w-[75px] h-[75px] flex justify-center items-center space-x-2 mb-4  bg-[#2196f3] rounded-full p-2"
            >
                <GiCommercialAirplane className="w-10 h-10 text-white" />
            </div>
            <div className="flex justify-center   flex-wrap space-y-4 p-4 gap-4">
                <div className="flex items-start  ">
                    <TransferFilter filters={filters} onChange={handleFilterUpdate} />
                </div>
                <div className=" flex flex-col space-y-5">
                    <SortToggle onSortChange={option => console.log('Сортировка по:', option)} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
