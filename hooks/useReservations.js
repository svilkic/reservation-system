import { getReservationsFirebase, addReservationFirebase } from 'helpers/firebase';
import React, { useEffect, useState } from 'react';

const reservationsMock = [
  { id: '3535213', hour: 9, user: {}, service: {} },
  { id: '3535873', hour: 11, user: {}, service: {} },
  { id: '3535652', hour: 12, user: {}, service: {} },
  { id: '3515248', hour: 14, user: {}, service: {} },
];

const DEFAULT_SKIPS = process.env.NEXT_PUBLIC_SKIP_HOURS.split(',');

export function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [skip, setSkip] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getReservations(date) {
    if (!date) return;
    setLoading(true);
    const result = await getReservationsFirebase(date);
    setReservations(result.reservations);
    const skips = result.skip || [];
    setSkip([...DEFAULT_SKIPS, ...skips]);
    setLoading(false);
  }

  async function addReservation(reservation, date) {
    setLoading(true);
    const result = await addReservationFirebase(reservation, date);
    await getReservations(date);
    setLoading(false);
  }

  async function deleteReservation() {}

  return {
    reservations,
    skip,
    loading,
    getReservations,
    addReservation,
    deleteReservation,
    addReservation,
  };
}
