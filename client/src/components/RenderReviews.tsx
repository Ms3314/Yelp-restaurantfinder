import axios from "axios"
import { useNavigate } from "react-router";
import { useEffect, useState  } from "react"
import star from "../assets/star-svgrepo-com.svg"

interface Card {
    reviews : string , 
    name : string , 
    rating : number , 
}



function RenderReviews({ id , review}: { id: string , review:Card }) {
    const [data, setData] = useState<Card[]>([]); // Define `data` as an array of `Review`
    const [error, setError] = useState<string | null>(null); // Add error handling
    const navigate = useNavigate()
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const results = await axios.get(`http://localhost:3000/api/v1/restaurants/${id}/reviews`);
                console.log(results, "the data I got");

                // Ensure results.data is an array
                if (Array.isArray(results.data.data)) {
                    setData(results.data.data);
                } else {
                    console.error("Unexpected response format:", results.data.data);
                    setError("Unexpected data format received from the server.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch reviews.");
            }
        };

        fetchdata();
    }, [id , review]); // Include `id` in the dependency array

    if (error) {
        return <div className="error-message">{error}</div>;
    }
    if(data.length === 0) {
        return (
            <>
            <button className="bg-yellow-400 text-black text-lg mt-3 ml-3 p-2 rounded-xl" onClick={()=>{
                navigate("/")
            }}>Home</button>
            <div className="text-3xl mt-10 ml-10 !!">
               Be the first To Give a review 
            </div>
            </>
        )
    }
    return (
        <>
        <button className="bg-yellow-400 text-black text-lg mt-3 ml-3 p-2 rounded-xl" onClick={()=>{
            navigate("/")
        }}>Home</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {data &&
                data.map((review, index) => (
                    <Card
                        key={index} // Add a unique key
                        reviews={review.reviews}
                        name={review.name}
                        rating={review.rating}
                    />
                ))
                
            
            }
                
        </div>
        </>
    );
}

// @ts-ignore
function Card({ reviews, name, rating }) {
    return (
        <div className="bg-blue-800 rounded-xl p-4 w-[240px] text-white max-w-sm mx-auto">
            {/* Name */}
            <p className="text-sm font-bold mb-2">{name}</p>
            
            {/* Review */}
            <p className="text-lg break-words whitespace-normal mb-3">{reviews}</p>
            
            {/* Rating */}
            <div className="flex mt-2 gap-2">
                {
                    [...Array(rating)].map((_, index) => (
                        <img key={index} className="w-5 h-5" src={star} alt="Star" />
                    ))
                }
            </div>
        </div>
    );
}

export default RenderReviews;
