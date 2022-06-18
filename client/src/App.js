import { Routes, Route} from "react-router-dom";
import './App.css';
import "@fontsource/roboto"
import "@fontsource/roboto-slab"; 

//page imports
import Home from "./pages/Home/Home";
import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import Profile from "./pages/User/Profile/Profile";
import Category from "./pages/Category/Category";
import Error from "./pages/Error/Error";
import NewRecipe from "./pages/Recipes/New/New";
import Create from "./pages/User/Create/Create";
import Login from "./pages/User/Login/Login";

function App() {
  return ( 
    <> 
      <div className="appbody">  
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/user" element={<Profile />} />
          <Route path="/recipes/:category" element={<Category />} />  
          <Route path="/recipes/new" element={<NewRecipe />} />
          <Route path="/user/register" element={<Create />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="*" element ={<Error />} />      
        </Routes>
        <Footer /> 
      </div>     
    </>

  );
}

export default App;
