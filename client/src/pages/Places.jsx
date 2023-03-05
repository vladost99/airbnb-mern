import { useParams } from "react-router-dom";
import NewPlace from "./PlaceForm";
import List from "./MyListPlaces";
const Places = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && <List />}
      {action === "new" && <NewPlace />}
    </div>
  );
};

export default Places;
