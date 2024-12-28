import { useParams  } from "react-router";
import RenderReviews from "../components/RenderReviews";
import AddReviews from "../components/AddReviews";
import { useState } from "react";



interface Review {
  reviews : string , 
    name : string , 
    rating : number , 
}



function Restaurantdetail() {
  // Define the type for `id` coming from useParams
  const { id } = useParams<{ id: string }>();
  const [review , setReview] = useState<Review>({
    name: "",
    reviews: "",
    rating: 0,
  }) 

  return (
    // <ReviewContext.Provider value={{ context1, setContext1 }}>
      <div className="flex flex-col justify-center items-center">
        <RenderReviews id = {id || ""} review={review}  />
        <AddReviews id={id || ""} reviewContext={setReview}/>
      </div>
      // </ReviewContext.Provider>
    );
  }

export default Restaurantdetail;
