import { Link } from "react-router-dom";
import { imagesURL } from "../../api";
import { routerLink } from "../../routes";

const PlaceCard = ({ place }) => {
  return (
    <Link
      to={routerLink.myplace(place._id)}
      className="bg-gray-100 p-4 mt-3 rounded-2xl flex gap-4 cursor-pointer"
    >
      <div className="w-32 h-32 bg-gray-300 grow shrink-0">
        {place.photos.length > 0 && (
          <img
            className="w-full object-cover h-full"
            src={`${imagesURL}/${place.photos[0]}`}
          />
        )}
      </div>
      <div className="grow-0 shrink">
        <h2 className="text-xl">{place.title}</h2>
        <p className="text-sm mt-2">{place.description}</p>
      </div>
    </Link>
  );
};

export default PlaceCard;
