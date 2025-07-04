import type { Ticket } from '@/interfaces/tickets';
import SegmentInfo from './SegmentInfo';
import { Card } from './ui/Card';
import { CardContent } from './ui/Card';

type PropsType = {
    flightOption: Ticket;
};

const FlightBookingCard = ({ flightOption }: PropsType) => {
    return (
        <Card className="mb-4 w-[370px]  md:w-[450px] lg:w-[500px]  bg-white shadow-sm border border-gray-200 py-5">
            <CardContent className="px-4 sm:px-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="text-2xl font-bold text-[#2498f3]">{flightOption.price} ₽</div>
                    <div className="flex items-center gap-2 pr-10">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-md font-bold">
                                {flightOption.carrier.slice(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-[#797d80] font-medium text-xl ">
                            {flightOption.carrier}
                        </span>
                    </div>
                </div>
                {flightOption.segments.map((segment, index) => (
                    <SegmentInfo key={index} segment={segment} />
                ))}
            </CardContent>
        </Card>
    );
};

export default FlightBookingCard;
