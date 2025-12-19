export const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
};

export const calculateRooms = (guests) => {
  return Math.ceil(guests / 2);
};

export const calculateTotal = (hotel, checkIn, checkOut, guests) => {
  const rooms = calculateRooms(guests);
  const nights = calculateNights(checkIn, checkOut);
  return hotel.price * nights * rooms;
};

export const guestOptions = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} Guest${i > 0 ? 's' : ''}`
}));
