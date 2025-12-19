export const getMonthlyStats = (bookings) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  const monthlyData = months.map((month, index) => {
    const monthBookings = bookings.filter(b => {
      const bookingDate = new Date(b.createdAt || b.checkIn);
      return bookingDate.getMonth() === index && bookingDate.getFullYear() === currentYear;
    });
    return {
      month,
      bookings: monthBookings.length,
      revenue: monthBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0)
    };
  });
  return monthlyData;
};

export const getTotalRevenue = (bookings) => {
  return bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0);
};

export const getActiveUsers = (users) => {
  return users.filter(u => !u.banned && u.role !== 'admin').length;
};
