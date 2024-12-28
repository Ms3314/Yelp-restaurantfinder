import db from "../models"
import { Request, Response } from "express";

export async function handleFindRestaurants(req:Request , res:Response) {
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
}

export async function handleAddRestaurants(req:Request , res:Response) {
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
}

export async function handleUpdateRestaurant(req:Request , res:Response) {
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
}

export async function handleDeleteRestaurants(req:Request , res:Response) {
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
}

export async function handleGetRestaurants(req:Request , res:Response) {
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
            
}

export async function handleAddReviews(req:Request , res:Response) {
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
}

export async function handleGetReviews(req:Request , res:Response) {
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
}

export async function handleAvgReviews(req:Request , res:Response) {
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

}