import { Link } from "react-router-dom";
import Image from "../Image";
import BookingsDates from "./BookingsDates";
import { routerLink } from "../../routes";
import { prefixCurrency } from "../../utils/prefixCurrency";

const Card = ({ booking }) => {
  return (
    <Link
      to={routerLink.mybooking(booking._id)}
      className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-3"
    >
      <div className="w-48">
        <Image
          className="object-cover aspect-square"
          src={booking?.place?.photos?.[0]}
        />
      </div>
      <div className="py-3 grow pr-3">
        <h2 className="text-xl">{booking.place.title}</h2>
        <div className="text-xl">
          <BookingsDates
            className={`mb-2 mt-4 text-gray-500`}
            booking={booking}
          />
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
            <span className="text-2xl">
              Total price: {prefixCurrency}
              {booking.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
