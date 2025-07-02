import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { FilterOption } from '@/interfaces/Filters';

interface Props {
    filters: FilterOption[];
    onChange: (filters: FilterOption[]) => void;
}

const TransferFilter = ({ filters, onChange }: Props) => {
    const handleFilterChange = (id: string, checked: boolean) => {
        let updatedFilters: FilterOption[] = [];

        if (id === 'all') {
            updatedFilters = filters.map(filter =>
                filter.id === 'all' ? { ...filter, checked: true } : { ...filter, checked: false }
            );
        } else if (id === 'no-transfer') {
            updatedFilters = filters.map(filter =>
                filter.id === 'no-transfer' ? { ...filter, checked } : { ...filter, checked: false }
            );
        } else {
            updatedFilters = filters.map(filter =>
                filter.id === id
                    ? { ...filter, checked }
                    : filter.id === 'all' || filter.id === 'no-transfer'
                    ? { ...filter, checked: false }
                    : filter
            );
        }

        onChange(updatedFilters);
    };

    const toggleCheckbox = (id: string) => {
        const currentFilter = filters.find(f => f.id === id);
        if (currentFilter) {
            handleFilterChange(id, !currentFilter.checked);
        }
    };

    return (
        <Card className="w-64 bg-gray-50 pt-6 pb-6 gap-2">
            <CardHeader className="">
                <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    Количество пересадок
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {filters.map(filter => (
                    <div
                        key={filter.id}
                        className="flex items-center space-x-3 w-full py-2 px-6 hover:bg-[#f0f4f8] transition-colors duration-200 cursor-pointer"
                        onClick={() => toggleCheckbox(filter.id)}
                    >
                        <Checkbox
                            id={filter.id}
                            checked={filter.checked}
                            onCheckedChange={checked => {
                                handleFilterChange(filter.id, checked as boolean);
                            }}
                            className="cursor-pointer data-[state=checked]:white  data-[state=checked]:border-[#35a0f4]"
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
