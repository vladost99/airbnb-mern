import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { placesAPI } from "../api/places.api";
import PlaceCard from "../components/Places/PlaceCard";
import AccountNav from "../components/AccountNav";
import useLoading from "../hooks/use-loading";
import Loader from "../components/Loader";
import { routerLink } from "../routes";

const Places = () => {
  const [listPlaces, setListPlaces] = useState([]);
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const getList = async () => {
      try {
        setLoading(true);
        const { list } = await placesAPI.mylist();

        setListPlaces([...list]);
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
      <AccountNav subpage={"places"} />
      <div className="text-center">
        <Link
          className="bg-primary  inline-flex gap-1 text-white py-2 px-6 rounded-full"
          to={routerLink.newplace}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div>
        {listPlaces &&
          listPlaces.length > 0 &&
          listPlaces.map((place) => (
            <PlaceCard place={place} key={place._id} />
          ))}
      </div>
    </div>
  );
};

export default Places;
