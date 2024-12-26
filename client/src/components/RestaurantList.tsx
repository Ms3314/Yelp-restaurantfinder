import { useContext , useEffect , useState} from "react"
import axios from "axios"
import { DataContext } from "../pages/App"
import { useNavigate } from "react-router";

 
interface FormData {
    id : number,
    name : string ,
    location : string ,
    price_range : number 
}

const RestaurantList = () => {
    const [data, setData] = useState([]);
    const [trydel , setTruDel] = useState(0)
    //@ts-expect-error
    const [dataAdd]  = useContext(DataContext);
    console.log(dataAdd , "this thing changed")

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/restaurants");
                
                console.log("the data",response.data);
                console.log(response.data.data.restaurant);
                setData(response.data.data.restaurant);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    },[trydel] );

    return (
        <div className="p-2 flex flex-col gap-y-5 justify-center lg:items-center mt-10">
            {data.map((x: FormData ) => {
                //@ts-expect-error-some
                return <Card data={x} setTruDel={setTruDel} key={x.id} id={x.id} name={x.name} location={x.location} price={x.price_range} />;
            })}
        </div>
    );
};
//@ts-ignore-error
 const Card = ({name , data ,location , price , id , setTruDel }) => {
    const [review , getReview] = useState([]);
    const navigate = useNavigate();
     const handleDelete = async () => {
        await axios.delete(`http://localhost:3000/api/v1/restaurants/${id}`).then(()=>{
            setTruDel(Math.random())
            console.log("This got deleted")
        }).catch((error)=>{
            console.log(error , "this is the error")
        })

    }
    const handlereview = () => {
        navigate(`/restaurant/${id}`)

    }
    const handleNavigate = () => {
        localStorage.setItem("data" , JSON.stringify(data)) 
        navigate(`/restaurant/${id}/update`)
    }
    // useEffect(()=>{
    //     async function AvgReview() {
    //         const results = await axios.get(`http://localhost:3000/api/v1/avgreview/${id}`)

    //     }
    //     AvgReview()
    // },[id])
    return (
        <div className='sm:h-[50px] flex flex-col  sm:flex-row  gap-2 p-3 text-white rounded-xl overflow-x lg:w-[800px]  content-between bg-slate-900'>
            <h2 className="w-full text-lg">{name} </h2>
            <h2 className="w-full text-lg">{location} </h2>
            <div className="flex gap-2 mr-10 flex-row">
            {
                [...Array(price)].map((k, index) => ( 
                    <span className="sm:w-full text-lg" key={index}>
                      $
                    </span>
                ))
            }
            </div>
            <div className="flex gap-4">
            <button onClick={()=>handleNavigate(id)} className="bg-yellow-500 p-2  sm:pb-2  rounded-lg ">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 p-2  sm:pb-2  rounded-lg" >Delete</button>
            </div>
            <button onClick={handlereview} className=" p-2 sm:px-2  sm:w-[500px] rounded-lg">Add Review</button>
            {/* p-2 sm:pt-1 sm:pb-6 sm:h-6  my-1  */}
        </div>
    )
}

export default RestaurantList
