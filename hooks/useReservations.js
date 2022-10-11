import { getReservationsFirebase, addReservationFirebase } from 'helpers/firebase';
import React, { useEffect, useState } from 'react';

const reservationsMock = [
  { id: '3535213', hour: 9, user: {}, service: {} },
  { id: '3535873', hour: 11, user: {}, service: {} },
  { id: '3535652', hour: 12, user: {}, service: {} },
  { id: '3515248', hour: 14, user: {}, service: {} },
];

export function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getReservations(date) {
    if (!date) return;
    setLoading(true);
    // const result = reservationsMock; //await getReservationsFirebase(date);
    const result = await getReservationsFirebase(date);
    console.log(result);
    setReservations(result);
    setLoading(false);
  }

  async function addReservation(reservation, date) {
    setLoading(true);
    const result = addReservationFirebase(reservation, date);
    setLoading(false);
  }

  async function deleteReservation() {}

  return {
    reservations,
    loading,
    getReservations,
    addReservation,
    deleteReservation,
    addReservation,
  };
}
