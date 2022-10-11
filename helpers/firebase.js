import { db } from 'libs/initFirebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getFirebaseID = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const collectionID = `${year}`;
  const documentID = `${day}${month}`;
  return { collectionID, documentID };
};

export const getReservationsFirebase = async (date) => {
  try {
    const { collectionID, documentID } = getFirebaseID(date);
    const docRef = doc(db, collectionID, documentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const { reservations, skip } = convertReservations(data);
      console.log(data);
      return reservations;
    } else {
      return [];
    }
  } catch (error) {
    alert(error);
  }
};

export const addReservationFirebase = async (data) => {
  try {
    const { reservation, date } = data;
    const { collectionID, documentID } = getFirebaseID(date);
    console.log(reservation, date);
    const docRef = doc(db, collectionID, documentID);
    const result = await setDoc(docRef, { [reservation.hour]: reservation }, { merge: true });
    console.log(result);
  } catch (error) {
    alert(error);
  }
};

export const convertReservations = (reservationsList) => {
  let reservations = Object.keys(reservationsList).map((key) => {
    if (+key > 0 && +key < 24) return reservationsList[key];
  });
  reservations = reservations.filter((reservation) => reservation);
  const skip = reservationsList.skip || [];
  return { reservations, skip };
};
