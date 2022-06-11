import {BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "@fontsource/roboto"
import "@fontsource/roboto-slab"; 

//page imports
import Home from "./pages/Home/Home";
import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer";
import Profile from "./pages/User/Profile/Profile";
import Recipes from "./pages/Recipes/Recipes";
import Error from "./pages/Error/Error"

function App() {
  return (
    <div class="appbody">    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/user" element={<Profile />} />
        <Route path="/recipes/:category" element={<Recipes />} />  
        <Route path="*" element ={<Error />} />      
      </Routes>
      <Footer />         
    </div>
  );
}

export default App;
