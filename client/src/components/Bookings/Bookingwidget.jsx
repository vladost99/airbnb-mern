import { differenceInCalendarDays } from "date-fns";
import useInputHook from "../../hooks/use-input.hook";
import { bookingAPI } from "../../api/booking.api";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user.context";
import { routerLink } from "../../routes";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { prefixCurrency } from "../../utils/prefixCurrency";
import Button from "../Button";

const Bookingwidget = ({ place }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const checkIn = useInputHook("");
  const checkOut = useInputHook("");
  const maxGuests = useInputHook(1);
  const name = useInputHook("");
  const mobile = useInputHook("");
  let numberOfDays = useMemo(() => {
    if (checkIn.value && checkOut.value) {
      return differenceInCalendarDays(
        new Date(checkOut.value),
        new Date(checkIn.value)
      );
    }
    return 0;
  }, [checkIn.value, checkOut.value]);

  let disabledBtnBook = useMemo(() => {
    return (mobile.value && isValidPhoneNumber(mobile.value) ? true : false) &&
      name.value &&
      maxGuests.value > 0 &&
      maxGuests.value <= place.maxGuests &&
      checkIn.value &&
      checkOut.value
      ? false
      : true;
  }, [
    mobile.value,
    name.value,
    maxGuests.value,
    checkIn.value,
    checkOut.value,
  ]);

  const bookThisPlace = async () => {
    const data = {
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      place: place._id,
      name: name.value,
      phone: mobile.value,
      numberOfGuests: Number(maxGuests.value),
      price: Number(numberOfDays * place.price),
    };

    try {
      const bookingItem = await bookingAPI.create(data);
      navigate(`/account/bookings/${bookingItem._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: {prefixCurrency}
          {place.price} / per night
        </div>

        <div className="border rounded-2xl mt-4">
          <div className="flex xs:flex-col md:flex-row">
            <div className="py-3 px-4">
              <label>Check in:</label>
              <input
                value={checkIn.value}
                onChange={checkIn.handleInput}
                type="date"
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check out:</label>
              <input
                value={checkOut.value}
                onChange={checkOut.handleInput}
                type="date"
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests:</label>
            <input
              value={maxGuests.value}
              onChange={maxGuests.handleInput}
              type="number"
              max={place.maxGuests}
              min={1}
            />
          </div>

          {user && numberOfDays > 0 && (
            <div className="py-3 px-4 border-t">
              <label>You full name: </label>
              <input
                value={name.value}
                onChange={name.handleInput}
                type="text"
              />
              <label>Phone number: </label>
              <PhoneInput
                placeholder="Enter phone number"
                value={mobile.value}
                onChange={mobile.setValue}
              />
            </div>
          )}
        </div>
        {user && (
          <Button
            onClick={bookThisPlace}
            className={"mt-4"}
            disabled={disabledBtnBook}
          >
            Book this place
            {numberOfDays > 0 && (
              <span className="ml-2">
                {prefixCurrency}
                {numberOfDays * place.price}
              </span>
            )}
          </Button>
        )}
        {!user && (
          <Link to={routerLink.login} className=" mt-4">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Bookingwidget;
