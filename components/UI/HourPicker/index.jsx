import React, { useEffect, useState } from 'react';
import { Hour } from './hour';
import { genDaysFrom } from '/helpers/date';
// Styles
import styles from './hourpicker.module.css';
import { generateArray, generateReservationArray } from 'helpers/hourpicker';
import { Spinner } from '../Spinner';

const startHour = 8;
const endHour = 20;

function HourPicker({ date, loading, reservations, onSelect }) {
  const [fullReservations, setFullReservations] = useState([]);
  const [selectedHour, setSelectedHour] = useState(0);
  const selectedClass = (hour) => (selectedHour == hour ? styles.selected : '');

  // TODO:
  // Send Date and hour to be reserved for specific user
  const handleReservation = (hour) => {
    setSelectedHour(hour);
    // console.log(date + ' : ' + hour);
    onSelect(hour);
  };

  useEffect(() => {
    setSelectedHour(-1);
    const available = generateArray({ from: startHour, to: endHour });
    const array = generateReservationArray(available, reservations);
    setFullReservations(array);
  }, [reservations]);

  return (
    <div className={styles.section}>
      {loading && (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      )}
      <div className={styles.hours}>
        {fullReservations.map((reservation) => (
          <Hour
            key={reservation.hour}
            hour={reservation.hour}
            reserved={reservation.user}
            className={selectedClass(reservation.hour)}
            onClick={() => {
              if (!reservation.user) handleReservation(reservation.hour);
            }}
          />
        ))}
      </div>
    </div>
  );
}

HourPicker.defaultProps = {
  date: null,
  reservations: [],
  loading: false,
};

export default HourPicker;
