import type { Ticket } from '@/interfaces/tickets';

const SegmentInfo = ({ segment }: { segment: Ticket['segments'][0] }) => {
    const departureDate = new Date(segment.date);
    const arrivalDate = new Date(departureDate.getTime() + segment.duration * 60 * 1000);

    const formatTime = (date: Date) =>
        date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="mb-2 flex gap-3 sm:gap-6 lg:gap-9">
            <div className="w-25 md:w-30">
                <div className="text-[#a8b7bf] text-sm">
                    {segment.origin} - {segment.destination}
                </div>
                <div className="font-semibold text-[#676767]">
                    {formatTime(departureDate)} - {formatTime(arrivalDate)}
                </div>
            </div>

            <div className="w-15 md:w-24">
                <div className="text-[#a8b7bf] text-sm">В ПУТИ</div>
                <div className="font-semibold text-[#676767]">
                    {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
                </div>
            </div>

            <div className="flex-1 min-w-0 break-words">
                <div className="text-[#a8b7bf] text-sm">
                    {segment.stops.length} {segment.stops.length === 0 ? 'ПЕРЕСАДОК' : 'ПЕРЕСАДКИ'}
                </div>
                <div className="font-semibold text-[#676767]">
                    {segment.stops.length ? segment.stops.join(', ') : 'БЕЗ ПЕРЕСАДОК'}
                </div>
            </div>
        </div>
    );
};

export default SegmentInfo;
