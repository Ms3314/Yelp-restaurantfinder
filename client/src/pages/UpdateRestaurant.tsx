import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateRestaurant() {
  const navigate = useNavigate()
  const [formData, setFromData] = useState({
    name: "",
    location: "",
    price_range: 0,
  });

  const { id } = useParams(); // Access 'id' from the route
  useEffect(()=>{
    //@ts-expect-error-typeerror
    const data = JSON.parse(localStorage.getItem("data"))
    console.log("data got from local storage",data)
    setFromData({
      name : data.name ,
      location : data.location ,
      price_range : data.price_range
    })
  },[])
  

const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault()
    const {name , value} = e.target 
    setFromData((prev)=>
        ({
            ...prev ,
            [name] : value ,
         // Add a comma here
        })
    )
}
    const handleSubmit = async (e:unknown) => {
      e.preventDefault()
      console.log(formData)
      const data = {
          status : "PUT" ,
          payload : formData
      }
      axios.put(`${import.meta.env.VITE_SERVER_URL}/api/v1/restaurants/${id}`, data, {
      headers: {
          'Content-Type': 'application/json'
      }
      })
      .then((response) => {
          console.log(response.data , "this is the response that we got"); // This will log the response data from the API
          navigate("/")
      })
      .catch((error) => {
          console.error("Error occurred:", error); // Handles errors
      });


    }
  return (
    <div className='w-screen h-screen flex flex-col items-center '>
        <div className="max-w-[300px] flex flex-col  ">
            <button onClick={() => navigate('/')} className="w-20 mr-5 mt-2 h-10 p-1 bg-blue-500 rounded-xl text-white">Home</button>
            <h1 className="text-3xl mt-5 lg:text-5xl mb-10">UPDATE THE RESTAURANT 😋😋</h1>
        </div>
        <form action="" className=' rounded-xl bg-slate-900 flex flex-col  lg:w-[500px] gap-5 p-2 justify-center '>
                        <input type="text" name="name" onChange={handlechange} value={formData.name} className='p-2 rounded-lg' placeholder='Name'/>
                        <input type="text" name="location" onChange={handlechange} value={formData.location} className='p-2 rounded-lg' placeholder='Location'/>
                        <input type="number" name="price_range" onChange={handlechange} value={formData.price_range} className='p-2 rounded-lg' placeholder='Price Range' />
                        <button onClick={handleSubmit} className='px-5 py-2 rounded-lg bg-yellow-300 text-black font-thin'>Update</button>
        </form>
    </div>

  )
}

export default UpdateRestaurant
