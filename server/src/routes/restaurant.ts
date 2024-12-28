import { Router } from "express";
import {handleFindRestaurants , handleAddRestaurants, handleUpdateRestaurant, handleDeleteRestaurants, handleGetRestaurants} from '../controllers/index'
const restaurantRouter = Router()


restaurantRouter.route('/').get(handleFindRestaurants).post(handleAddRestaurants);

restaurantRouter.route('/:id').get(handleGetRestaurants).put(handleUpdateRestaurant).delete(handleDeleteRestaurants)




export default restaurantRouter