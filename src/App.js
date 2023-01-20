import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from "./Components/SignIn";
import FoursquareAPI from './Components/Rest';
import Navigation from "./Components/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Navigation/>
              <Routes>
                  <Route exact path="/"  element={<Home/>}/>
                  <Route exact path="/Connexion"  element={<Login/>}/>
                  <Route exact path="/Inscription"  element={<SignIn/>}/>
                  <Route exact path="/Places"  element={<FoursquareAPI/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
