import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import { withRouter } from "../../common/with-router";
import Swal from "sweetalert2"
const EditMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [menu, setMenu] = useState({});
  const [val, setVal] = useState(true);

  // retrieve order by id from the backend
  const getMenu = (id) => {
    MenuService.getMenuById(id)
      .then((res) => {
      console.log(res.data);
      setMenu(res.data);
      //console.log("menu" + menu)
    });
  };

  useEffect(() => {
    getMenu(id);
  }, []);

  // handle form sumbmit
  function handleSubmit(e) {
    e.preventDefault();
  
    MenuService.updateMenu(id, menu)
  }
   const GoBack= (e) => {
    navigate("/AllMenus")
   }
   

   /*async function  updateMenu(e)  { 
    //const navigate = useNavigate(); 
    try {
        const s = await MenuService.updateMenu(id, menu)
        
    } catch (error) {
        console.error(error.errors);
    }
    navigate("/AllMenus");
  }*/

  // update the menue
  const updateMenu = (e) => {
    MenuService.updateMenu(id, menu)
    .then (res => {
      //console.log(menu)
      Swal.fire({
        title: "Adding a new menu",
        text: "Done",
        icon: "success"
      })
      
    })
    .catch(e => {
        console.error(e)
    })
    console.log(menu)
    
    navigate("/AllMenus")
  }

  return (
    <>
      <h3 className="text-center">Update Menu</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="" className="input-label">
              Name
            </label>
            <input className="form-control" 
            type="text" 
            value={menu.name}
            onChange={(e) => setMenu({ ...menu, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" 
            className="input-label">
              Toppings
            </label>
            <input
              className="form-control"
              type="text"
              value={menu.toppings}
              onChange={(e) => setMenu({ ... menu, toppings: e.target.value})}
            />
            
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Crust
            </label>
            <input className="form-control" 
            type="text" 
            value={menu.crust}
            onChange={(e => setMenu({ ... menu, crust: e.target.value}))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Size
            </label>
            <input className="form-control" type="text" 
            value={menu.size}
            onChange={(e => setMenu({ ... menu, size: e.target.value}))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Vegan
            </label>

            <input
              type="checkbox"
              value={menu.vegan}
              
              onChange={(e => setMenu({ ... menu, vegan: e.target.checked ? true : false}))}
              checked={val}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Price
            </label>

            <input 
            className="form-control" 
            type="text" 
            value={menu.price}
            onChange={(e => setMenu({ ... menu, price: e.target.value}))} />
          </div>

          <button className="btn btn-primary mb-3 w-100 " 
          onClick={(e) => updateMenu(menu.id, menu)}>
            Update Menu
            </button>

            <button className="btn btn-primary w-100 " 
          onClick={(e) => GoBack()}>
            Go Back To Menus
            </button>

        </form>
      </div>
    </>
  );
};

export default withRouter(EditMenu);
