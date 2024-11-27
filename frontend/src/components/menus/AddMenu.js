import React, { Component, useState, useEffect, useCallback } from "react";
import { withRouter } from "../../common/with-router";
import { useForm, Radio, Text, Controller , Control  } from "react-hook-form";
import MenuService from "../../services/MenuService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

const AddMenu = () => {
  const [val, setVal] = useState(true);
  const [allErrors, setAllErrors] = useState(true);
  const navigate = useNavigate();
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
      MenuService.createMenue(FormData)
      .then(re => {
        reset()
        Swal.fire({
          title: "Adding a new menu",
          text: "Done",
          icon: "success"
        })
        navigate("/AllMenus")
      })
        .catch((error) => 
          console.error(error.errors));
    },
    [reset],
    
  );
  return (
    <>
    
      <h3 className="text-center">Add new Menu</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="" className="input-label">
              Name
            </label>
            <input className="form-control" type="text" {...register("name")} />
            <label style={{ color: "red" }} className="input-error">
              {errors?.firstName?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Toppings
            </label>
            <input
              className="form-control"
              type="text"
              {...register("toppings")}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.lastName?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Crust
            </label>
            <input
              className="form-control"
              type="text"
              {...register("crust")}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.email?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Size
            </label>
            <input className="form-control" type="text" {...register("size")} />
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Vegan
            </label>

          <input
            
            type="checkbox"
            {...register("vegan")} 
            onChange={e => {
              setVal( e.target.checked ? true: false);
              
            }}
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
              {...register("price")}
            />
          </div>

          <button className="btn btn-primary mr-2 w-100">Add NEW Menu</button>
        </form>
      </div>
    </>
  );
};

export default AddMenu;
