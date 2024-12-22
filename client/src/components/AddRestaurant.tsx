import React, { useContext, useState } from "react"
import axios from "axios"
import { DataContext } from "../pages/App"

interface FormData {
    name : string ,
    location : string ,
    price_range : number 
}

// React.FC is the type for a react functional component
function AddRestaurant():React.ReactElement{
    //@ts-ignore
    const { setDataAdd } = useContext(DataContext); // Fix the destructuring

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
             // Add a comma here
            })
        )
    }
    const handleRestaurants = async (e:unknown) => {
        e.preventDefault()
        console.log(formData)
        const data = {
            status : "POST" ,
            payload : formData
        }
        axios.post('http://localhost:3000/api/v1/restaurants', data, {
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then((response) => {
            console.log(response.data); // This will log the response data from the API
            location.reload()
        })
        .catch((error) => {
            console.error("Error occurred:", error); // Handles errors
        });


    }
    return (
        <div className='text-lg bg-slate-900'>
                <form action="" className='flex flex-row gap-5 p-2 justify-center '>
                        <input type="text" name="name" onChange={handlechange} value={formData.name} className='p-2 rounded-lg' placeholder='Name'/>
                        <input type="text" name="location" onChange={handlechange} value={formData.location} className='p-2 rounded-lg' placeholder='Location'/>
                        <input type="number" name="price_range" onChange={handlechange} value={formData.price_range} className='p-2 rounded-lg' placeholder='Price Range' />
                        <button onClick={handleRestaurants} className='px-5 rounded-lg bg-yellow-300 text-black font-thin'>Add</button>
                </form>
                
        </div>
    )
}

export default AddRestaurant;
