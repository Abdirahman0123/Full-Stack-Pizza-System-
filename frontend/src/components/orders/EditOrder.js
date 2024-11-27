import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import Swal from "sweetalert2";
import { withRouter } from "../../common/with-router";
import MenuService from "../../services/MenuService";
import authHeader from "../../services/AuthHeader";
import axios from "axios";
const EditOrder = () => {
  const [order, setOrder] = useState({});
  const [menu, setMenu] = useState({});

  /* used together to display total price of the order
  as soon as the user enters quantity
  Total of the order is actually calculated in the backend
  but I doing here in front so the user can see it
  */
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);

  // uses to toggle between Collection and Delivery
  const [showHide, setShowHide] = useState("");
  const { orderId, menuId } = useParams();
  const navigate = useNavigate();

 

  // get Order from backend
  /*const getOrder = (orderId, menuId) => {
    OrderService.getOrderById(orderId, menuId).then((res) => {
      
      setOrder(res.data);
      setOrderTotal(order.total);
      console.log(res.data);
 
    });
  };

  useEffect(() => {
    getOrder(orderId, menuId);
  }, []);*/


  useEffect(() => {
    axios.
      get(`https://localhost:7192/v1/api/orders/${orderId}/${menuId}`,
        { headers: authHeader() })
      .then((response) => {
        setOrder(response.data);
        setShowHide(response.data.deliverOption);
        setOrderTotal(response.data.total)
        //console.log("showhide:" + JSON.stringify(showHide));
      })
      .catch((error) => {
        console.error("There was an error fetching the order!", error);
      });
      
  }, []);

  // get the menu from database
  const getMenu = (menuId) => {
    MenuService.getMenuById(menuId).then((res) => {
      //console.log(res.data);
      setMenu(res.data);
      //console.log("menu" + menu)
    });
  };

  useEffect(() => {
    getMenu(menuId);
  }, [ ]);

  // go Bacl to Menus page
  const GoBackToMenus = (e) => {
    navigate("/AllMenus");
  };

  // go Back to Orders page
  const GoBackToOrders = (e) => {
    navigate("/orders");
  };

  // update the order
  /*const updateOrder = () => {
    OrderService.updateOrder(orderId, menuId, order)
      .then((res) => {
        console.log("updated ordre:" + order.deliverOption);
        console.log("updated ordre:" + order.address1);
        Swal.fire({
          title: "Upating order details",
          text: "Done",
          icon: "success",
        });
      })
      .catch((e) => console.error(e));

    navigate("/AllMenus");
  };*/

  const handleShowHide = (e) => {
    const getOptions = e.target.value;
    setShowHide(getOptions);
    console.log("getOptions:" + showHide);
    if (getOptions === "Collection") {
      setOrder({
        ...order,
        deliverOption: getOptions,
        address1: "",
        address2: "",
        street: "",
        postCode: "",
      });
    } else {
      setOrder({
        ...order,
        deliverOption: getOptions,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const updateOrder = () => {
    // console.log("option:" + order.deliverOption);
    // console.log("option:" + order.address1);
    // console.log("option:" + order.address2);
    // console.log("option:" + order.street);
    // console.log("option:" + order.postCode);
    axios.put(`https://localhost:7192/v1/api/orders/${orderId}/${menuId}`, order , 
      { headers: authHeader() })
      .then((response) => {
        alert("Order updated successfully!");
        console.log("response update:" + response.data)
      })
      .catch((error) => {
        console.error("There was an error updating the order!", error, "option:" + order.deliverOption);
      });
    //   console.log("option:" + order.deliverOption);
    //  console.log("option:" + order.address1);
    //  console.log("option:" + order.address2);
    //  console.log("option:" + order.street);
    //  console.log("option:" + order.postCode);
    navigate("/orders")
  };
  /*const handleShowHide = (e) => {
    const getOptions = e.target.value;
    setShowHide(getOptions);

    if (getOptions === "Collection") {
      setOrder({
        ...order,
        deliverOption: getOptions,
        address1: "",
        address2: "",
        street: "",
        postCode: "",
      });
    } else {
      setOrder({
        ...order,
        deliverOption: getOptions,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };*/

  /*// handle toggle between Delivery and Collection options
  const handleShowHide = (e) => {
    const getOptions = e.target.value;
    //console.log("getOptions: " + getOptions)
    setShowHide(getOptions);
    if (getOptions === "Collection") {
      setAddress1(" ");
      setAddress2(" ");
      setStreet(" ");
      setPostCode(" ");
      setOrder({ ...order, address1: setAddress1("")})
      setOrder({ ...order, address2:setAddress1("")})
      setOrder({ ...order, street: setAddress1("")})
      setOrder({ ...order, postCode: setAddress1("")})
      //console.log("order address1: " + order.address1)
    }
  };*/

  return (
    <>
    
      <h3 className="text-center">Edit Your Order</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form >
          <div className="form-group">
            <label className="form-controler">Order Id</label>
            <input
              className="form-control"
              type="number"
              value={orderId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-controler">Menu Id</label>
            <input
              className="form-control"
              type="number"
              value={menuId}
              readOnly
            />
          </div>

          <div>
          <label>Delivery Option</label>
          <select value={order.deliverOption} onChange={handleShowHide}>
            <option value="Delivery">Delivery</option>
            <option value="Collection">Collection</option>
          </select>
        </div>

        {showHide === "Delivery" && (
          <>
            <div>
              <label>Address 1</label>
              <input
                type="text"
                name="address1"
                value={order.address1}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address 2</label>
              <input
                type="text"
                name="address2"
                value={order.address2}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Street</label>
              <input
                type="text"
                name="street"
                value={order.street}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type="text"
                name="postCode"
                value={order.postCode}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={order.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onInput={(e) => setOrderTotal(menu.price * e.target.value)}
            onChange={handleChange}
          />
        </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Total
            </label>
            <input
              className="form-control"
              type="number"
              id="AllOrderTotal"
              value={orderTotal}
              readonly
            />
          </div>

          <div>
          <button type="button" onClick={updateOrder}>Update Order</button>
        </div>
          <button
            className="btn btn-primary mb-3  w-100 "
            onClick={GoBackToOrders}
          >
            Go Back To Orders
          </button>
          <button
            className="btn btn-primary mb-3 w-100 "
            onClick={GoBackToMenus}
          >
            Go Back To Menus
          </button>

          
        </form>
      </div>
    </>
  );
};

export default withRouter(EditOrder);

/*
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import Swal from "sweetalert2";
import { withRouter } from "../../common/with-router";
import MenuService from "../../services/MenuService";
import authHeader from "../../services/AuthHeader";
import axios from "axios";
const EditOrder = () => {
  const [order, setOrder] = useState({});
  const [menu, setMenu] = useState({});

 
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);

  // uses to toggle between Collection and Delivery
  const [showHide, setShowHide] = useState("");
  const { orderId, menuId } = useParams();
  const navigate = useNavigate();

 // get Order from backend
  /*const getOrder = (orderId, menuId) => {
    OrderService.getOrderById(orderId, menuId).then((res) => {
      
      setOrder(res.data);
      setOrderTotal(order.total);
      console.log(res.data);
 
    });
  };

  useEffect(() => {
    getOrder(orderId, menuId);
  }, []);

   // get the menu from database
  const getMenu = (menuId) => {
    MenuService.getMenuById(menuId).then((res) => {
      //console.log(res.data);
      setMenu(res.data);
      //console.log("menu" + menu)
    });
  };

  useEffect(() => {
    getMenu(menuId);
  }, [ ]);


return (
    <>
    
      <h3 className="text-center">Edit Your Order</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form >
          <div className="form-group">
            <label className="form-controler">Order Id</label>
            <input
              className="form-control"
              type="number"
              value={orderId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label className="form-controler">Menu Id</label>
            <input
              className="form-control"
              type="number"
              value={menuId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Delivery Option
            </label>
            <select
              defaultValue={order.deliverOption}
              
              className="form-control"
              onClick={(e) => handleShowHide(e)}
              onChange={(e) => setOrder({ ...order, deliverOption: e.target.value })}
            >
              <input
                className="form-control"
                
              />
              <option value="Delivery">Delivery</option>
              <option value="Collection">Collection</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="" className="input-label">
              Quantity
            </label>
            <input
              className="form-control"
              type="text"
              value={order.quantity}
              onInput={(e) => setOrderTotal(menu.price * e.target.value)}
              onChange={(e) => setOrder({ ...order, quantity: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Phone Number
            </label>
            <input
              className="form-control"
              type="text"
              value={order.phoneNumber}
              onChange={(e) =>
                setOrder({ ...order, phoneNumber: e.target.value })
              }
            />
          </div>

          {showHide === "Delivery" && (
            <>
              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Address1
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={order.address1}
                  onChange={(e) =>
                    setOrder({ ...order, address1: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Address 2
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={order.address2}
                  onChange={(e) =>
                    setOrder({ ...order, address2: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Street
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={order.street}
                  onChange={(e) =>
                    setOrder({ ...order, street: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Post Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={order.postCode}
                  
                    onChange={(e) =>
                      setOrder({ ...order, 
                        postCode: e.target.value })
                  }
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Total
            </label>
            <input
              className="form-control"
              type="number"
              id="AllOrderTotal"
              value={orderTotal}
              readonly
            />
          </div>

          <button
            className="btn btn-primary mb-3 w-100 "
            onClick={(e) => updateOrder(orderId, menu.id, order)}
          >
            Update Order
          </button>

          <button
            className="btn btn-primary mb-3  w-100 "
            onClick={(e) => GoBackToOrders()}
          >
            Go Back To Orders
          </button>
          <button
            className="btn btn-primary mb-3 w-100 "
            onClick={(e) => GoBackToMenus()}
          >
            Go Back To Menus
          </button>

          
        </form>
      </div>
    </>
  );
};

export default withRouter(EditOrder);
*/