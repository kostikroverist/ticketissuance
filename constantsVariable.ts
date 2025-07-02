export const exampleFlight = {
    price: 13400,
    airline: 'Airlines',
    segments: [
        {
            from: 'MOW',
            to: 'NKT',
            departure: '10:45',
            arrival: '08:00',
            duration: '21ч 15м',
            transfers: ['HKG', 'JNB', 'JNB']
        },
        {
            from: 'MOW',
            to: 'NKT',
            departure: '11:20',
            arrival: '00:50',
            duration: '13ч 30м',
            transfers: ['HKG']
        }
    ]
};
export const checkboxFilters = [
    { id: 'all', label: 'Все', checked: true },
    { id: 'no-transfer', label: 'Без пересадок', checked: false },
    { id: 'one-transfer', label: '1 пересадка', checked: false },
    { id: 'two-transfers', label: '2 пересадки', checked: false },
    { id: 'three-transfers', label: '3 пересадки', checked: false },
];

export const allFlights = [
  {
    id: '1',
    price: 13400,
    airline: 'Airlines',
    segments: [
      {
        from: 'MOW',
        to: 'NKT',
        departure: '10:45',
        arrival: '08:00',
        duration: '21ч 15м',
        transfers: ['HKG', 'JNB', 'JNB']
      },
      {
        from: 'MOW',
        to: 'NKT',
        departure: '11:20',
        arrival: '00:50',
        duration: '13ч 30м',
        transfers: ['HKG']
      }
    ]
  },
  {
    id: '2',
    price: 9800,
    airline: 'SkyWays',
    segments: [
      {
        from: 'KBP',
        to: 'NYC',
        departure: '06:30',
        arrival: '14:45',
        duration: '16ч 15м',
        transfers: ['AMS', 'LHR']
      },
      {
        from: 'NYC',
        to: 'KBP',
        departure: '17:10',
        arrival: '09:30',
        duration: '18ч 20м',
        transfers: ['FRA']
      }
    ]
  },
  {
    id: '3',
    price: 15400,
    airline: 'GlobalAir',
    segments: [
      {
        from: 'BER',
        to: 'DEL',
        departure: '22:00',
        arrival: '08:30',
        duration: '10ч 30м',
        transfers: ['DOH']
      },
      {
        from: 'DEL',
        to: 'BER',
        departure: '03:45',
        arrival: '13:10',
        duration: '11ч 25м',
        transfers: ['IST']
      }
    ]
  },
   {
    id: '4',
    price: 15400,
    airline: 'GlobalAir',
    segments: [
      {
        from: 'BER',
        to: 'DEL',
        departure: '22:00',
        arrival: '08:30',
        duration: '10ч 30м',
        transfers: ['DOH']
      },
      {
        from: 'DEL',
        to: 'BER',
        departure: '03:45',
        arrival: '13:10',
        duration: '11ч 25м',
        transfers: ['IST']
      }
    ]
  },
];
