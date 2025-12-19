import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import BookingProgress from './booking/BookingProgress';
import DateSelection from './booking/DateSelection';
import GuestDetailsForm from './booking/GuestDetailsForm';
import PaymentSummary from './booking/PaymentSummary';

const BookingPanel = ({
    hotel,
    user,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    showCalendar,
    setShowCalendar,
    handleBooking
}) => {
    const [bookingStep, setBookingStep] = useState('dates');
    const [guestDetails, setGuestDetails] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        idProofType: 'aadhaar',
        idNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        specialRequests: ''
    });


    return (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6">Book Your Stay</h2>

            <BookingProgress currentStep={bookingStep} />

            <AnimatePresence mode="wait">
                {bookingStep === 'dates' && (
                    <DateSelection
                        hotel={hotel}
                        user={user}
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        checkOut={checkOut}
                        setCheckOut={setCheckOut}
                        guests={guests}
                        setGuests={setGuests}
                        showCalendar={showCalendar}
                        setShowCalendar={setShowCalendar}
                        onContinue={() => {
                            if (!checkIn || !checkOut) {
                                alert('Please select check-in and check-out dates');
                                return;
                            }
                            setBookingStep('details');
                        }}
                    />
                )}

                {bookingStep === 'details' && (
                    <GuestDetailsForm
                        guestDetails={guestDetails}
                        setGuestDetails={setGuestDetails}
                        onBack={() => setBookingStep('dates')}
                        onContinue={() => setBookingStep('payment')}
                    />
                )}

                {bookingStep === 'payment' && (
                    <PaymentSummary
                        hotel={hotel}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        guests={guests}
                        guestDetails={guestDetails}
                        onBack={() => setBookingStep('details')}
                        onConfirm={() => handleBooking(guestDetails)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

BookingPanel.propTypes = {
    hotel: PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
    user: PropTypes.object,
    checkIn: PropTypes.instanceOf(Date),
    setCheckIn: PropTypes.func.isRequired,
    checkOut: PropTypes.instanceOf(Date),
    setCheckOut: PropTypes.func.isRequired,
    guests: PropTypes.number.isRequired,
    setGuests: PropTypes.func.isRequired,
    showCalendar: PropTypes.string.isRequired,
    setShowCalendar: PropTypes.func.isRequired,
    handleBooking: PropTypes.func.isRequired
};

export default BookingPanel;

