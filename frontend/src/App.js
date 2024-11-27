import logo from "./logo.svg";
import "./App.css";

import { Routes, Route, Link, BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//import Menus from './components/menus/Menus';

import AllMenus from "./components/menus/AllMenus";
import AddMenu from "./components/menus/AddMenu";
import EditMenu from "./components/menus/EditMenu";

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import AuthService from "./services/AuthService";

import Orders from "./components/orders/Orders";
import AddOrder from "./components/orders/AddOrder";
import EditOrder from "./components/orders/EditOrder";

function App() {
  const currentUser = localStorage.getItem("user");
  return (
    <>
      <div>
      
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/AllMenus"} className="nav-link">
            Menus
          </Link>

          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/AllMenus"} className="nav-link">
                Menus
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/AddMenu"} className="nav-link">
                AddMenus
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>
            <div className="d-flex me-2">
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">{currentUser.Email}</li>

                  <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
                      onClick={AuthService.logout}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/Login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/Register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </div>
        </nav>
        

        <div className="container mt-3">
       
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/" element={<AllMenus />} />
            <Route path="/AllMenus" element={<AllMenus />} />
            <Route path="/AddMenu" element={<AddMenu />} />
            <Route path="/AllMenus/:id" element={<EditMenu />} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/AddOrder/:id" element={<AddOrder/>}/>
            <Route path="/orders/:orderId/:menuId" element={<EditOrder />} />
          </Routes>
          
        </div>
      </div>
    </>
  );
}

export default App;
