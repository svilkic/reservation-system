import React, { useEffect, useState } from 'react';
import DatePicker from 'components/UI/DatePicker';
import HourPicker from 'components/UI/HourPicker';
import { ReservationForm } from 'components/UI/ReservationForm';
import { useReservations } from 'hooks/useReservations';

//Styles
import styles from './reservation.module.css';

export function ReservationSection() {
  const { reservations, loading: loadingReservations, getReservations, addReservation } = useReservations();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [step, setStep] = useState(1);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  useEffect(() => {
    // TODO:
    // GET all reservations
    if (selectedDate) {
      getReservations(selectedDate);
    }
  }, [selectedDate]);

  const onHourSelect = (hour) => {
    setSelectedHour(hour + '');
    setStep(3);
  };

  const onReserve = async (reservation) => {
    const { firstName, lastName, email, phone, verificationToken } = reservation;
    const user = {
      firstName,
      lastName,
      email,
      phone,
    };
    const data = { reservation: { uid: verificationToken, user, hour: selectedHour }, date: selectedDate };
    delete data.verificationToken;

    await addReservation(data);
    setStep(1);
  };

  return (
    <section className={styles.section}>
      <div>
        <h2>Reserve your next appointment</h2>
      </div>
      <div className={styles.sections}>
        <DatePicker onChange={onDateChange} previousSelectable={false} />
        {step > 1 && selectedDate && (
          <HourPicker
            date={selectedDate}
            loading={loadingReservations}
            reservations={reservations}
            onSelect={onHourSelect}
          />
        )}
        {step > 2 && <ReservationForm onReserve={onReserve} />}
      </div>
    </section>
  );
}
