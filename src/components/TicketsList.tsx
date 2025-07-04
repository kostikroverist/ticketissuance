import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import FlightBookingCard from '@/components/FlightBookingCard';
import { selectFilteredAndSortedTickets } from '@/features/tickets/ticketsSelectors'; 

const TicketsList = () => {
  const tickets = useSelector(selectFilteredAndSortedTickets);
  const status = useSelector((state: RootState) => state.tickets.status);
  const stopFetching = useSelector((state: RootState) => state.tickets.stopFetching);
  const error = useSelector((state: RootState) => state.tickets.error);

  if (status === 'loading' && tickets.length === 0) {
    return <p>Завантажуємо перші квитки...</p>;
  }

  if (status === 'failed' && tickets.length === 0) {
    return <p style={{ color: 'red' }}>Не вдалося завантажити квитки: {error}</p>;
  }

  if (tickets.length === 0 && status === 'succeeded' && stopFetching) {
    return <p>Квитки не знайдено за вашими критеріями або всі квитки завантажено.</p>;
  }

  return (
    <div className="tickets-list flex flex-col items-center">
      {tickets.length > 0 ? (
          tickets.map((ticket, index) => ( 
            <FlightBookingCard key={index} flightOption={ticket} />
          ))
      ) : (
          status !== 'loading' && <p>Немає квитків, що відповідають вибраним фільтрам.</p>
      )}


      {!stopFetching && status === 'loading' && (
          <p className="mt-4">Завантажуємо більше квитків...</p>
      )}
      {stopFetching && status === 'succeeded' && (
          <p className="mt-4">Усі доступні квитки завантажено.</p>
      )}
    </div>
  );
};

export default TicketsList;