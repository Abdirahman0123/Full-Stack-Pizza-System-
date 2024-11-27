import React, { Component, useState, useEffect, useCallback } from "react";
import { withRouter } from "../../common/with-router";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
const Register = () => {
  const [error, setError] = useState("");
  const navigate =  useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //resolver: yupResolver(LoginSchema)
  });

  const onSubmit = useCallback(
    (FormData) => {
      /*const result =  AuthService.register(FormData)
      console.log(result);
      console.log("Done");
      navigate("/Login")
      reset();*/
      //AuthService.register(FormData)
      AuthService.register(FormData)
      .then(re => {

      })
      .catch(error => {
        console.log(error.errors)
        setError(error.errors);
      })
    },
    [reset]
  );

  return (
    <>
    {error}
      <h3 className="text-center">Sign Up</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
           
        <div className="form-group">
          <label htmlFor="" className="input-label">
            First Name
          </label>
          <input className="form-control" type="text" {...register("firstName")} />
          <label style={{color:"red"}}
          className="input-error">{errors?.firstName?.message}</label>
        </div>

        <div className="form-group">
          <label htmlFor="" className="input-label">
            Last Name
          </label>
          <input className="form-control" type="text" {...register("lastName")} />
          <label style={{color:"red"}}
          className="input-error">{errors?.lastName?.message}</label>
        </div>

        <div className="form-group">
          <label htmlFor="" className="input-label">
            Email
          </label>
          <input className="form-control" type="text" {...register("email")} />
          <label style={{color:"red"}}
          className="input-error">{errors?.email?.message}</label>
        </div>

        <div className="form-group">
          <label htmlFor="" className="input-label">
            Password
          </label>
          <input className="form-control" type="password" {...register("password")} />
          <label style={{color:"red"}}
          className="input-error">{errors?.password?.message}</label>
        </div>

        <button className="btn btn-primary mr-2 w-100">
              Register
            </button>
        </form>
      </div>
    </>
  );
};

export default withRouter(Register);
