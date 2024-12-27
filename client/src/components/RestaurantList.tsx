import {   useEffect , useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router";
import Star from '../assets/star-svgrepo-com.svg'
 
interface FormData {
    id : number,
    name : string ,
    location : string ,
    price_range : number 
}

const RestaurantList = () => {
    const [data, setData] = useState([]);
    const [trydel , setTruDel] = useState(0)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/restaurants`);
                
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
                // @ts-ignore
                return <Card data={x} setTruDel={setTruDel} key={x.id} id={x.id} name={x.name} location={x.location} price={x.price_range} />;
            })}
        </div>
    );
};

    interface Carddel  {
        name : string ,
        data : [FormData],
        location : string ,
        price : number ,
        id : number ,
        setTruDel : React.Dispatch<React.SetStateAction<number>> ,
    }

 const Card:React.FC<Carddel> = ({name , data ,location , price , id , setTruDel }) => {
    const [review , setReview] = useState(0);
    const navigate = useNavigate();
     const handleDelete = async () => {
        await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/restaurants/${id}`).then(()=>{
            setTruDel(Math.random())
            console.log("This got deleted")
        }).catch((error)=>{
            console.log(error , "this is the error")
        })

    }
    const handlereview = () => {
        navigate(`/restaurant/${id}`)

    }
    // 
    const handleNavigate = () => {
        console.log(data , "abcd this is the data i dont like this ")
        localStorage.setItem("data" , JSON.stringify(data)) 
        navigate(`/restaurant/${id}/update`)
    }

    useEffect(()=>{
        async function AvgReview() {
            try {
                const results = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/avgreview/${id}`)
                console.log(results.data, "the data here ")
                let count = 0; 
                const temp = results.data.data;
                let temp2:number = 0;
                for(let i = 0 ; i < temp.length ; i++ ) 
                    {   
                        count ++ ;
                    }
                temp.map((x:{rating:number})=>{
                    temp2 += x.rating
                })
                console.log(temp2 , count , "temp and count ")
                //@type-ignore
                const temp3 = temp2/count
                console.log(temp3 , typeof(temp3))
                console.log(Math.round(temp3),"round figure")
                setReview(Math.round(temp3))
                // console.log(parseInt(temp2/count));
            } catch (error) {
                console.log(error)
            }
            
        }
        AvgReview()
    },[id])
    return (
        <div className='sm:h-[50px] flex flex-col  sm:flex-row  gap-2 p-3 text-white rounded-xl overflow-x lg:w-[800px] justify-between content-between bg-slate-900'>
            <h2 className="w-full text-lg">{name} </h2>
            <h2 className="w-full text-lg">{location} </h2>
            <div className="flex gap-2 mr-10 flex-row">
            {
                [...Array(price)].map(( index) => ( 
                    <span className="sm:w-full text-lg" key={index}>
                      $
                    </span>
                ))
            }
            </div>
            <div className="w-[200px] flex gap-2 mr-20 flex-row">
            {
                review ?
                [...Array(review)].map(( index) => ( 
                    <img key={index} className="w-3 h-5" src={Star} alt="Star" />
                ))
                :
                <p >No reviews</p>
            }
            </div>
            <div className="flex gap-4">
            <button onClick={()=>handleNavigate()} className="bg-yellow-500 p-2  sm:pb-2  rounded-lg ">Edit</button>
            <button onClick={handleDelete} className="bg-red-500 p-2  sm:pb-2  rounded-lg" >Delete</button>
            </div>
            <button onClick={handlereview} className=" p-2 sm:px-2  sm:w-[500px] rounded-lg">Add Review</button>
            {/* p-2 sm:pt-1 sm:pb-6 sm:h-6  my-1  */}
        </div>
    )
}

export default RestaurantList
