import { useParams } from "react-router";
import RenderReviews from "../components/RenderReviews";
function Restaurantdetail() {
  const {id} = useParams()
  return (
    <div>
      <RenderReviews id={id} />
    </div>
  );
}

export default Restaurantdetail;
