require("dotenv").config();
import express from 'express';
import morgan from 'morgan';
import { Client } from 'pg'; 
import cors from "cors";
import { CorsOptions } from 'cors';
import { ConnectToDB } from './models';
import restaurantRouter from './routes/restaurant'
import reviewRouter from './routes/reviews';

const app = express();
const PORT = process.env.PORT || 3000; 

const allowedOrigins = [ // React app
    `${process.env.CORS}`, // Another frontend;
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
ConnectToDB().then(()=>{
    console.log("Connected to the DB")
}).catch((err)=>{
    console.log("An error occured while connecting to the DB"  , err)
})

app.use('/api/v1/restaurants/' , restaurantRouter)   
app.use('/api/v1/reviews/' , reviewRouter)



app.listen(PORT , ()=>{
    console.log(`Port is running on port ${PORT}`);
})
