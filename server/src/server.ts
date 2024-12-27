require("dotenv").config();
import express from 'express';
import morgan from 'morgan';
import { Client } from 'pg'; 
import cors from "cors";
import { CorsOptions } from 'cors';


const db = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    ssl: {
      rejectUnauthorized: false // Adjust if needed
    }
  }); 

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


// Handle preflight requests
app.options('*', cors(corsOptions));

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

app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
    const id = req.params.id;
    console.log(req.body , "1")
    // console.log(req.body.data.data , "2")
    const { reviews , name, rating } = req.body;

    console.log(reviews, name, rating);

    const query = `
        INSERT INTO reviews (name, reviews, rating, restaurants_id) 
        VALUES ($1, $2, $3, $4)
    `;

    try {
        // its actually reviews in the db but i have used descripton in the frontend do sorry 
        await db.query(query, [name, reviews, rating, id]);
        res.status(200).json({
            message: "Your review has been added 😀😀😀"
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            error: "An error occurred while adding the review."
        });
    }
});

app.get("/api/v1/restaurants/:id/reviews", async (req, res) => {
    const id = req.params.id;
    const { reviews, name, rating } = req.body;
    

    const query = `
        SELECT * FROM reviews WHERE restaurants_id = $1 
    `;

    try {
        var results = await db.query(query, [id]);
        res.status(200).json({
            status : "success" ,
            message : "data addded succesfully",
            data : results.rows
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            error: "An error occurred while adding the review."
        });
    }
});

app.get("/api/v1/avgreview/:id",async (req , res)=>{
    const id = req.params.id;
    const query = `
        SELECT rating FROM reviews WHERE restaurants_id = $1 
    `;
    try {
        var results = await db.query(query, [id]);
        res.status(200).json({
            data : results.rows
        });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({
            error: "An error occurred while adding the review."
        });
    }


})

app.listen(PORT , ()=>{
    console.log(`Port is running on port ${PORT}`);
})
