import { Router } from "express";
import { handleAddReviews, handleAvgReviews, handleGetReviews} from '../controllers/index'
const reviewRouter = Router()



reviewRouter.route('/:id').get(handleGetReviews).post(handleAddReviews)

reviewRouter.get('/avgreview/:id',handleAvgReviews)




export default reviewRouter