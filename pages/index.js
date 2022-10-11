import Head from 'next/head';
import { ReservationSection } from 'components/sections/reservation';

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Reservation System </title>
      </Head>
      <ReservationSection />
    </div>
  );
}
