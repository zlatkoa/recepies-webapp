import { Routes, Route } from "react-router-dom";
import './App.css';
import "@fontsource/roboto"
import Home from "./components/Home";
import Navbar from "./layouts/Navbar/Navbar";
import Footer from "./layouts/Footer/Footer"

function App() {
  return (
    <div class="appbody">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />     
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
