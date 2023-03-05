import { Navigate, useParams } from "react-router-dom";
import useLoading from "../hooks/use-loading";
import { useEffect, useState } from "react";
import { placesAPI } from "../api/places.api";
import Loader from "../components/Loader";
import Bookingwidget from "../components/Bookings/Bookingwidget";
import PhotoGallery from "../components/PhotoGallery";
import AddressLink from "../components/AddressLink";
import { routerLink } from "../routes";

const PlacePage = () => {
  const { id } = useParams();
  const { loading, setLoading } = useLoading(true);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const getPlace = async () => {
      if (!id) return <Navigate to={routerLink.home} />;

      try {
        setLoading(true);
        const placeItem = await placesAPI.getById(id);
        setPlace(placeItem);
      } finally {
        setLoading(false);
      }
    };

    getPlace();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-4 mx-auto max-w-[1100px]  px-8 pt-8">
      <h1 className="md:text-2xl xs:text-xl">{place.title}</h1>
      <AddressLink place={place} />
      <div className="flex justify-center">
        <PhotoGallery place={place} />
      </div>
      <div className="mt-8 mb-4 gap-8 grid xs:grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guest: {place.maxGuests}
        </div>
        <Bookingwidget place={place} />
      </div>
      <div className="-mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
