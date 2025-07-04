import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { FilterOption } from '@/interfaces/Filters';
import { useDispatch } from 'react-redux';
import { toggleFilter } from '@/features/filters/filtersSlice';

interface Props {
    filters: FilterOption[];
    onChange: (filters: FilterOption[]) => void;
}

const TransferFilter = ({ filters }: Props) => {
    const dispatch = useDispatch();

    const handleCheckboxChange = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // ❗ Зупиняє подію, щоб не триггерився onClick у div
        dispatch(toggleFilter(id));
    };

    const toggleCheckboxByDivClick = (id: string) => {
        dispatch(toggleFilter(id));
    };

    return (
        <Card className="w-64 bg-gray-50 pt-6 pb-6 gap-2">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Количество пересадок
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {filters.map(filter => (
                    <div
                        key={filter.id}
                        className="flex items-center space-x-3 w-full py-2 px-6 hover:bg-[#f0f4f8] transition-colors duration-200 cursor-pointer"
                        onClick={() => toggleCheckboxByDivClick(filter.id)}
                    >
                        <Checkbox
                            id={filter.id}
                            checked={filter.checked}
                            onClick={e => handleCheckboxChange(e, filter.id)}
                            className="cursor-pointer data-[state=checked]:white data-[state=checked]:border-[#35a0f4]"
                        />
                        <label
                            htmlFor={filter.id}
                            className="text-sm text-gray-700 select-none cursor-pointer"
                            onClick={e => e.stopPropagation()}
                        >
                            {filter.label}
                        </label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default TransferFilter;
