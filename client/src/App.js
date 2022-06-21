import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import "@fontsource/roboto"
import "@fontsource/roboto-slab"; 
import { useSelector, useDispatch } from 'react-redux'


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
import Recipelist from "./pages/Recipes/UserRecipes/Recipelist"


function App() {
  
  const {user} = useSelector((state)=>state.auth)

  return ( 
    <>
      <Router>
        <div className="appbody">  
          <Navbar />
          <Routes>
            //open routes no auth
            <Route path="/" element={<Home />} /> 
            <Route path="/user/register" element={<Create />} />
            <Route path="/user/created" element={<AccountCreated />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/recipes/:category" element={<Category />} />  
            <Route path="*" element ={<Error />} />      

            //prottected routes login needed
            <Route path="/user" element={user ? <Profile /> : <Navigate to='/user/login'/>} />
            <Route path="/user/profile" element={user ? <Profile /> : <Navigate to='/user/login'/>} />
            <Route path="/recipes/new" element={user ? <NewRecipe /> : <Navigate to='/user/login'/>} />
            <Route path="/recipes/user" element={user ? <Recipelist /> : <Navigate to='/user/login'/>} />  
          </Routes>
          <Footer /> 
        </div>
      </Router>
      <ToastContainer />     
    </>
  );
}

export default App;
