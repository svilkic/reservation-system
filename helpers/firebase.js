import { db } from 'libs/initFirebase';
import { doc, getDoc, setDoc, runTransaction } from 'firebase/firestore';

/**
 * Functions used for CRUD operations with FIREBASE
 */

const getFirebaseFormatID = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const collectionID = `${year}`;
  const documentID = `${day}${month}`;
  return { collectionID, documentID };
};

export const getOneReservationFirebase = async (date, hour) => {
  try {
    const { collectionID, documentID } = getFirebaseFormatID(date);
    const docRef = doc(db, collectionID, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data[hour]) return data[hour];
    } else {
      return null;
    }
  } catch (error) {
    alert(error);
  }
};

export const getReservationsFirebase = async (date) => {
  try {
    const { collectionID, documentID } = getFirebaseFormatID(date);
    const docRef = doc(db, collectionID, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const { reservations, skip } = convertReservationsFromFirebaseToArray(data);
      return reservations;
    } else {
      return [];
    }
  } catch (error) {
    alert(error);
  }
};

export const addReservationFirebase = async (data) => {
  const { reservation, date } = data;
  const { collectionID, documentID } = getFirebaseFormatID(date);
  let docRef = doc(db, collectionID, documentID);
  try {
    await runTransaction(db, async (transaction) => {
      // Check if reservation already exists
      const reservationSnap = await transaction.get(docRef);
      if (reservationSnap.exists()) {
        const res = reservationSnap.data();
        if (!res[reservation.hour]) {
          docRef = doc(db, collectionID, documentID);
          await transaction.set(docRef, { [reservation.hour]: reservation }, { merge: true });
          alert('Reservation made!');
        } else {
          alert('Error! Reservation already exists.');
          return;
        }
      }
    });
  } catch (error) {
    alert(error);
    console.log('Transaction failed: ', error);
  }
};

export const convertReservationsFromFirebaseToArray = (reservationsList) => {
  let reservations = Object.keys(reservationsList).map((key) => {
    if (+key > 0 && +key < 24) return reservationsList[key];
  });
  reservations = reservations.filter((reservation) => reservation);
  const skip = reservationsList.skip || [];
  return { reservations, skip };
};
