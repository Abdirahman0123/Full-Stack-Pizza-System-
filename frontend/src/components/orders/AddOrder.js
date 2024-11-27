import React, { useState, useCallback, useEffect } from "react";
import MenuService from "../../services/MenuService";
import OrderService from "../../services/OrderService";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const AddOrder = () => {
  const [allErrors, setAllErrors] = useState(true);

  // get currentt menu
  const [menu, setMenu] = useState({});

  /* used together to display total price of the order
  as soon as the user enters quantity
  */
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState(0);

  // uses to toggle between Collection and Delivery 
  const [showHide, setShowHide] = useState("");

  /* set address1, address2, street, postcode to empty string
  if deliveryOption is "Collection"
  */
  const [address1, setAddress1] = useState(" ");
  const [address2, setAddress2] = useState(" ");
  const [street, setStreet] = useState(" ");
  const [postCode, setPostCode] = useState(" ");

  const navigate = useNavigate();

  // retrieve the id pass through the URL
  const { id } = useParams();

  // get the menu from database
  const getMenu = (id) => {
    MenuService.getMenuById(id).then((res) => {
      console.log(res.data);
      setMenu(res.data);
      //console.log("menu" + menu)
    });
  };

  useEffect(() => {
    getMenu(id);
  }, []);
  
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    //resolver: yupResolver(LoginSchema)
  });

  const onSubmit = useCallback(
    (FormData) => {
      console.log(FormData);
      OrderService.createOrder(FormData)
        .then((re) => {
          reset();
          Swal.fire({
            title: "Adding a new menu",
            text: "Done",
            icon: "success",
          });
          navigate("/orders");
        }) 
        .catch((e) => console.log(e.response.data));
        
    },
    [reset],
    console.log(allErrors)
  );

  // handle toggle between Delivery and Collection options
  const handleShowHide = (e) => {
    const getOptions = e.target.value;
    //console.log("getOptions: " + getOptions)
    setShowHide(getOptions);
    if (getOptions === "Collection") {
        setAddress1(" ");
        setAddress2(" ");
        setStreet(" ");
        setPostCode(" ");
    }
  };
  return (
    <>
    
      <h3 className="text-center">Buy</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-control"
              type="number"
              value={id}
              {...register("menuId")}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.firstName?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Delivery Option
            </label>
            <select
              id="cars"
              name="cars"
              {...register("deliveryOption")}
              className="form-control"
              onChange={(e) => handleShowHide(e)}
            >
              <option value="">--Select Delivery Option</option>
              <option value="Delivery">Delivery</option>
              <option value="Collection">Collection</option>
            </select>
            <label style={{ color: "red" }} className="input-error">
              {errors?.lastName?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Quantity
            </label>
            <input
              className="form-control"
              type="text"
              value={orderQuantity}
              {...register("quantity")}
              onInput={(e) => setOrderTotal(menu.price * e.target.value)}
              onChange={(e) => setOrderQuantity(e.target.value)}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.email?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Phone Number
            </label>
            <input
              className="form-control"
              type="text"
              {...register("phoneNumber")}
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
                  {...register("address1")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Address 2
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("address2")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Street
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("street")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="" className="input-label">
                  Post Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register("postcode")}
                  
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
              value={orderTotal}
              readonly
            />
          </div>

          <button className="btn btn-primary mr-2 w-100">Buy</button>
        </form>
      </div>
    </>
  );
};

export default AddOrder;
