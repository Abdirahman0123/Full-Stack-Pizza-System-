import React, { Component, useState, useEffect, useCallback } from "react";
import { withRouter } from "../../common/with-router";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import AuthService from "../../services/AuthService";

const Login = () => {
  // const [result, setResult] = useState("");
  // const [message, setMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [allErrors, setAllErrors] = useState([]);
  const navigate = useNavigate();
  const resMessage = "";
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
      AuthService.login(FormData)
        .then(
          (response) =>
            localStorage.setItem("user", JSON.stringify(response.data)),
          Swal.fire({
            title: "Welcome ",
            icon: "success"
          }),
          reset(),
          navigate("/AllMenus")
        )

        //.catch((e) => console.log(e.response.data));
        .catch((e) => console.error(e.response.data));
    },
    [reset]
  );

  useEffect(() => {
    //onSubmit()
  },[])
  return (
    <>
      <h3 className="text-center">Sign in</h3>
      <div className="container min-vh-10  d-flex align-items-center justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="" className="input-label">
              Email
            </label>
            <input
              className="form-control"
              type="text"
              {...register("email")}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.email?.message}
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="" className="input-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              {...register("password")}
            />
            <label style={{ color: "red" }} className="input-error">
              {errors?.password?.message}
            </label>
          </div>

          <button className="btn btn-primary mr-2 w-100">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
