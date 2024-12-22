import React, { useState } from "react"

interface FormData {
    name : string ,
    location : string ,
    price_range : string 
}

// React.FC is the type for a react functional component
function AddRestaurant():React.ReactElement{
    const [formData , setFromData] = useState<FormData>({
        name : "" ,
        location : "" ,
        price_range : ""
    });
    
    const handlechange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setFromData((prev)=>{
        
            
        })
    }
    const handleRestaurants = () => {
            
    }
    return (
        <div className='bg-slate-900'>
                <form action="" className='flex flex-row gap-5 p-2 justify-center '>
                        <input type="text" onChange={handlechange} className='p-2 rounded-lg' placeholder='Name '/>
                        <input type="text" className='p-2 rounded-lg' placeholder='Location'/>
                        <input type="text" className='p-2 rounded-lg' placeholder='Price_range' />
                        <button onClick={handleRestaurants} className='px-5 rounded-lg bg-yellow-300 text-black font-thin'>Add</button>
                </form>
                
        </div>
    )
}

export default AddRestaurant
