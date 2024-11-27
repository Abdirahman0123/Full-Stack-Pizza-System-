import React, { useState, useEffect } from "react";
import MenuService from "../../services/MenuService";

import { Link } from "react-router-dom";
import Swal from "sweetalert2"
const AllMenus = () => {
  const [menus, setMenus] = useState([]);
  

  const getMenus = () => {
    MenuService.getAllMenus()
      .then((res) => {
        //console.log(res.data);
        setMenus(res.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
      
  };

  useEffect(() => {
    getMenus();
  }, []);

  /*const getExpneses = async () => {
    try {
        const response = await MenuService.getAllMenus();
        //setMenus(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error);
        
    }
  }

  useEffect(() => {
    getExpneses();
  }, []);*/

  

  const deleteMenu = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        MenuService.deleteMenu(id)
      .then((res) => {
        console.log("Done");
        window.location.reload();
      })
      .catch((e) => console.error(e.response));
      })
      
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <table className="table mt-5 text-center w-auto  ">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Toppings</th>
              <th scope="col">Crust</th>
              <th scope="col">Size</th>
              <th scope="col">Vegan</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">Buy</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>{menu.toppings}</td>
                <td>{menu.crust}</td>
                <td>{menu.size}</td>
                <td>{menu.vegan ? "Yes" : "No"}</td>
                <td>{"£" + menu.price}</td>
                <td>
                  <Link to={"/AllMenus/" + menu.id} className="btn btn-warning">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMenu(menu.id)}>
                    Delete
                  </button>
                </td>

                <td>
                <Link to={"/AddOrder/" + menu.id} className="btn btn-primary">
                    Buy
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllMenus;
