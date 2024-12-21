require("dotenv").config();
import express from 'express';
import morgan from 'morgan';
import pg from 'pg'
import { Client } from 'pg'; 



// const db = new Client({
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     host: process.env.PGHOST,
//     port: parseInt(process.env.PGPORT || "5432"), // Provide a default value for PGPORT
//     database: process.env.PGDATABASE,
// })
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
app.post("/api/v1/restaurants" , (req ,res) =>{
    console.log(req.body);
    res.status(201).json({
        status : "success" ,
        data: {
            restaurant : ['mcdonals','Cafe555','Karachi bakkery','Pista House']
        }
    })

})

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

app.put("/api/v1/restaurants/:id" , (req , res) =>{
    console.log(req.params.id)
    console.log(req.body)
    res.status(200).json({
        status : "success" ,
        data: {
            restaurant : ['mcdonals','Cafe555','Karachi bakkery','Pista House']
        }
    })
})
// Deleting a restaurant 
app.delete("/api/v1/restaurants/:id" , (req , res) =>{
    console.log(req.params.id)
    console.log(req.body)
    res.status(200).json({
        status : "success" ,
    })
})

app.listen(PORT , ()=>{
    console.log(`Port is running on port ${PORT}`);
})
