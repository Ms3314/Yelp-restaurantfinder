import AddRestaurant from "../components/AddRestaurant"
import Header from "../components/Header"
import RestaurantList from "../components/RestaurantList"
import { createContext, useState } from 'react';
//@ts-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

function App() {
  const [dataAdd , setDataAdd] = useState(null);

  return (
    <div>
      <DataContext.Provider  value={[dataAdd, setDataAdd]}>
      <Header/>
      <AddRestaurant/>
      <RestaurantList/>
      </DataContext.Provider>
    </div>
  )
}

export default App
