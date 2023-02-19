
import './app.css'
import SubHeader from "./components/SubHeader";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Header";

function App() {

  return (
    <div className="App">
        <Navbar />
        <SubHeader />
    </div>
  )
}

export default App
