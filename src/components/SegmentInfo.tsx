import type { FlightOption } from '@/interfaces/Card';

const SegmentInfo = ({ segment }: { segment: FlightOption['segments'][0] }) => (
    <div className="mb-2 flex gap-3 sm:gap-6 lg:gap-9">
        <div className="w-25 md:w-30">
            <div className="text-[#a8b7bf] text-sm">
                {segment.from} - {segment.to}
            </div>
            <div className="font-semibold text-[#676767]">
                {segment.departure} - {segment.arrival}
            </div>
        </div>

        <div className="w-15 md:w-24">
            <div className="text-[#a8b7bf] text-sm">В ПУТИ</div>
            <div className="font-semibold text-[#676767]">{segment.duration}</div>
        </div>

        <div className="flex-1 min-w-0 break-words">
            <div className="text-[#a8b7bf] text-sm">{segment.transfers.length} ПЕРЕСАДКИ</div>
            <div className="font-semibold text-[#676767]">
                {segment.transfers.join(', ') || 'БЕЗ ПЕРЕСАДОК'}
            </div>
        </div>
    </div>
);

export default SegmentInfo;
