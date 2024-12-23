require("dotenv").config();
import express from 'express';
import morgan from 'morgan';
import { Client } from 'pg'; 
import cors from "cors";
import { CorsOptions } from 'cors';


const db = new Client()
 
const app = express();
const PORT = process.env.PORT || 3000; 

const allowedOrigins = [ // React app
    'http://localhost:5173', // Another frontend;
]
  
  // Configure CORS options
const corsOptions: CorsOptions = {
    origin: allowedOrigins,
};

app.use(express.json());
app.use(cors(corsOptions));

// database connected 
db.connect().then(() => {
    console.log('Database connected successfully.');
}).catch((err) => {
    console.error('Database connection error:', err.stack);
});

//getting the restaurants here !! 
app.get('/api/v1/restaurants' , async (req , res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants")
        res.status(200).json({
            status : "success" ,
            results : results.rows.length,
            data: {
                restaurant : results.rows , 
                // restaurant : ['mcdonals','Cafe555','Karachi bakkery','Pista House']
            }
        })
    } catch (error) {
        res.status(500).json({"err" : error});
    }
    
})

//adding the restaurant data  (completed)
app.post("/api/v1/restaurants" , async (req ,res) =>{
    try {
        // console.log(req.body , "the data I get from the frontend ")
        let {name , location , price_range} = req.body.payload;
        // console.log(name , location , price_range , "the data")
        const results = await db.query("INSERT INTO restaurants (name , location , price_range) VALUES ($1 , $2 , $3) returning *",[name , location , price_range ])
        // console.log(results.rows , "no results now")
        res.status(201).json({
            status : "success" ,
            message : "data addded succesfully",
            data : results.rows
        })
    } catch (error) {
        res.status(500).json({
            type : "this is the server error ",
            // @ts-ignore
            err : error.message
        })
    }
    

})

// getting a specific restaurant with using an ID 
app.get('/api/v1/restaurants/:id' ,async (req , res)=>{
    try {
        const resid = req.params.id ;
        const inputquery = "SELECT * FROM restaurants WHERE id = $1"
        const query =await  db.query(inputquery,[resid ])
        console.log(query)
        res.status(200).json({
            status : "success" ,
            data: {
                restaurant : query.rows
            }
        })
    } catch (error) {
        res.status(500).json({"err" : error})
    }
    
})

// Update a particular restaurant Data
app.put("/api/v1/restaurants/:id" , async (req , res) =>{
    try {
        const id = req.params.id ;
        let {name , location , price_range} = req.body.payload;
        const results = await  db.query("UPDATE restaurants SET name= $2 , location= $3 , price_range= $4 WHERE id = $1 returning *",[id , name , location , price_range ]);
        console.log(req.params.id);
        console.log(req.body);
        console.log(results , "these are the results");
        res.status(200).json({
            status : "success" ,
            data: { 
                restaurant : results.rows
            }
        })
    } catch (error) {
        res.status(500).json({
            err : error
        })
    }

    
})

// Deleting a restaurant 
app.delete("/api/v1/restaurants/:id" ,async (req , res) =>{
    try {
        const id = req.params.id;
        await db.query("DELETE FROM restaurants WHERE id = $1" , [id]);
        res.status(200).json({
            status : "success" ,
        })
    } catch (error) {
        res.status(500).json({
            err : error
        })
    }
})

app.listen(PORT , ()=>{
    console.log(`Port is running on port ${PORT}`);
})
