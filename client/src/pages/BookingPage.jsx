import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../hooks/use-loading";
import { useEffect, useState } from "react";
import { bookingAPI } from "../api/booking.api";
import Loader from "../components/Loader";
import AddressLink from "../components/AddressLink";
import PhotoGallery from "./../components/PhotoGallery";
import BookingsDates from "../components/Bookings/BookingsDates";
import { routerLink } from "../routes";
import { prefixCurrency } from "../utils/prefixCurrency";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const getBooking = async () => {
      try {
        if (!id) {
          navigate(routerLink.bookings);
          return;
        }

        const bookingItem = await bookingAPI.getById(id);
        setBooking(bookingItem);
      } finally {
        setLoading(false);
      }
    };

    getBooking();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-8 max-w-[1100px] mx-auto">
      <h1 className="md:text-3xl xs:text-xl">{booking.place.title}</h1>
      <AddressLink className={"my-2 block"} place={booking.place} />
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center xs:flex-col md:flex-row">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          <BookingsDates
            booking={booking}
            className={`mb-2 mt-4 text-gray-500`}
          />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl xs:w-full flex flex-col xs:items-center md:w-auto">
          <div>Total price:</div>{" "}
          <div className="text-3xl">
            {prefixCurrency}
            {booking.price}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <PhotoGallery place={booking.place} />
      </div>
    </div>
  );
};

export default BookingPage;
