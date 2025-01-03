import React, {  useState } from "react"
import axios from "axios"

interface FormData {
    name : string ,
    location : string ,
    price_range : number 
}

// React.FC is the type for a react functional component
function AddRestaurant():React.ReactElement{

    const [formData, setFromData] = useState<FormData>({
        name: "",
        location: "",
        price_range: 0,
    });
    
    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        const {name , value} = e.target 
        setFromData((prev)=>
            ({
                ...prev ,
                [name] : value ,
            })
        )
    }
    const handleRestaurants = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(formData)
        const data = {
            status : "POST" ,
            payload : formData
        }
        axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/restaurants`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(() => {
            // console.log(response.data); // This will log the response data from the API
            location.reload()
        })
        .catch((error) => {
            console.error("Error occurred:", error); // Handles errors
        });


    }
    return (
        <div className='text-lg rounded-xl m-3 bg-slate-900'>
                <form action="" className='flex flex-col  md:flex-row gap-5 p-2 justify-center '>
                        <input type="text" name="name" onChange={handlechange} value={formData.name} className='p-2 rounded-lg' placeholder='Name'/>
                        <input type="text" name="location" onChange={handlechange} value={formData.location} className='p-2 rounded-lg' placeholder='Location'/>
                        <div>
                        <label htmlFor="price_range " className="text-slate-300 mr-3">Price range {`->`} </label>
                        <input type="number" name="price_range" onChange={handlechange} max={3} value={formData.price_range} className='p-2 rounded-lg' placeholder='Price Range' />
                        </div>
                        <button onClick={handleRestaurants} className='px-5 rounded-lg bg-yellow-300 text-black font-thin'>Add</button>
                </form>
                
        </div>
    )
}

export default AddRestaurant;
