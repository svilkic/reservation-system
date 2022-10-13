import React, { useEffect, useState } from 'react';
import DatePicker from 'components/UI/DatePicker';
import HourPicker from 'components/UI/HourPicker';
import { ReservationForm } from 'components/UI/ReservationForm';
import { useReservations } from 'hooks/useReservations';
import { GrNext } from 'react-icons/gr';
//Styles
import styles from './reservation.module.css';

export function ReservationSection() {
  const { reservations, skip, loading: loadingReservations, getReservations, addReservation } = useReservations();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [step, setStep] = useState(1);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setStep(2);
  };

  useEffect(() => {
    async function asyncReserves() {
      await getReservations(selectedDate);
    }
    // TODO:
    // GET all reservations
    if (selectedDate) {
      asyncReserves();
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

    try {
      await addReservation(data);
      await getReservations(selectedDate);
    } catch (error) {
      alert(error);
    }
    setStep(2);
  };

  return (
    <section className={styles.section}>
      <div>
        <h2>Reserve your next appointment</h2>
      </div>
      <div className={styles.sections}>
        <DatePicker onChange={onDateChange} previousSelectable={false} />

        {step > 1 && selectedDate && (
          <>
            <div className={styles.arrowNext}>
              <GrNext />
            </div>
            <HourPicker
              date={selectedDate}
              loading={loadingReservations}
              reservations={reservations}
              onSelect={onHourSelect}
              skip={skip}
            />
          </>
        )}
        {step > 2 && (
          <>
            <div className={styles.arrowNext}>
              <GrNext />
            </div>
            <ReservationForm onReserve={onReserve} />
          </>
        )}
      </div>
    </section>
  );
}
