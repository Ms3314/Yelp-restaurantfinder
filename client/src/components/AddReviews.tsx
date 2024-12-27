import axios from 'axios';
import React from 'react'
import { useState  } from 'react';
// import { ReviewContext } from '../pages/RestaurantDetail';

// const context = useContext(ReviewContext);


interface ReviewFormData {
    reviews : string , 
    name : string , 
    rating : number ,
}

interface AddReviewsProps {
  reviewContext: React.Dispatch<React.SetStateAction<ReviewFormData>>; // Change `any` to the actual type of your review if needed
  id: string;
}


const AddReviews: React.FC<AddReviewsProps> = ({reviewContext , id}:{reviewContext:React.Dispatch<React.SetStateAction<ReviewFormData>>, id:string}) => {
// const { setReviewconst }:any = context;


  const [formData, setFormData] = useState<ReviewFormData>({
    name: "",
    reviews: "",
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value, // Ensure rating is a number
    }));
  };

  const handleReviews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/v1/restaurants/${id}/reviews`,
            formData
        );
        console.log("Data has been added:", response.data);
        reviewContext(formData)
        // Reset the form
        setFormData({ name: "", reviews: "", rating: 0 });
        
        // Optional: Trigger a re-fetch or notify parent component
        // setRefreshKey((prev) => prev + 1); // Example if using refreshKey
    } catch (err) {
        console.error("An error has occurred:", err);
        alert("Failed to submit the review. Please try again later.");
    }
};
  return (
    <div>
      <h1 className="text-3xl ml-5">ADD A REVIEW</h1>
      <div className="text-lg rounded-xl m-3 bg-slate-900">
        <form
          onSubmit={handleReviews}
          className="flex flex-col gap-5 p-3 justify-center"
        >
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            className="p-2 rounded-lg"
            placeholder="Name"
          />
          <textarea
            name="reviews"
            onChange={handleChange}
            value={formData.reviews}
            className="p-2 rounded-lg min-h-20"
            placeholder="reviews"
          />
          <div>
            <label htmlFor="rating" className="text-slate-300 mr-3">
            Ratings / 5 {`->`}
            </label>
            <input
              type="number"
              name="rating"
              onChange={handleChange}
              value={formData.rating}
              className="p-2 rounded-lg"
              placeholder="Rating"
              min="0"
              max="5"
            />
          </div>
          <button
            type="submit"
            className="px-5 rounded-lg bg-yellow-300 text-black font-thin"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
