import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import AccountCreated from "./pages/User/Create/Created"


function App() {
  return ( 
    <>
      <Router>
        <div className="appbody">  
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/user" element={<Profile />} />
            <Route path="/recipes/new" element={<NewRecipe />} />
            <Route path="/user/register" element={<Create />} />
            <Route path="/user/created" element={<AccountCreated />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/recipes/:category" element={<Category />} />  
            <Route path="*" element ={<Error />} />      
          </Routes>
          <Footer /> 
        </div>
      </Router>
      <ToastContainer />     
    </>
  );
}

export default App;
