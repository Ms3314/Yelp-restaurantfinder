require("dotenv").config();
import express from 'express';
import morgan from 'morgan';
import { Client } from 'pg'; 

const db = new Client()
 
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(morgan('dev'))
app.use(express.json())

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

//adding the restaurant data 
app.post("/api/v1/restaurants" ,async (req ,res) =>{
    try {
        let {name , location , price_range} = req.body;
        const results = await db.query("INSERT INTO restaurants (name , location , price_range) VALUES ($1 , $2 , $3) returning *",[name , location , price_range ])
        res.status(201).json({
            status : "success" ,
            message : "data addded succesfully",
            data : results.rows
        })
    } catch (error) {
        res.status(500).json({
            err : error
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
        let {name , location , price_range} = req.body;
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
