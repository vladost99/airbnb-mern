import { useEffect, useState } from "react";
import { placesAPI } from "../api/places.api";
import useLoading from "../hooks/use-loading";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import { routerLink } from "../routes";
import { prefixCurrency } from "../utils/prefixCurrency";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const { loading, setLoading } = useLoading(true);
  useEffect(() => {
    setLoading(true);
    const getList = async () => {
      try {
        const { list } = await placesAPI.list();
        setPlaces([...list]);
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
    <div className="grid gap-x-6 gap-y-8  mt-8  grid-cols-2 md:grid-cols-3 xsm:grid-cols-2 lg:grid-cols-4 xs:grid-cols-1">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={routerLink.place(place._id)} key={place._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm  text-gray-500"> {place.title}</h3>
            <div className="mt-1">
              <span className="font-bold mr-2">
                {prefixCurrency}
                {place.price}
              </span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
