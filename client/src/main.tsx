import { createRoot } from 'react-dom/client'
import {BrowserRouter , Routes , Route} from 'react-router'
import './index.css'
import App from './pages/App.tsx'
import Restaurantdetail from './pages/RestaurantDetail.tsx'
import UpdateRestaurant from './pages/UpdateRestaurant.tsx'


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/restaurant/:id" element={< Restaurantdetail  />} />
      <Route path="/restaurant/:id/update" element={<UpdateRestaurant />} />
    </Routes>
  </BrowserRouter>
)
