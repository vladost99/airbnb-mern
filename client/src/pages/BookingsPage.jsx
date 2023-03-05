import { useEffect, useState } from "react";
import AccountNav from "./../components/AccountNav";
import useLoading from "../hooks/use-loading";
import { bookingAPI } from "../api/booking.api";

import Loader from "../components/Loader";
import Card from "../components/Bookings/Card";

const BookingsPage = () => {
  const { loading, setLoading } = useLoading(true);
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const bookings = await bookingAPI.list();
        setBookingList([...bookings]);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <AccountNav subpage={"bookings"} />
      <div>
        {bookingList.length > 0 &&
          bookingList.map((booking) => (
            <Card key={booking._id} booking={booking} />
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
