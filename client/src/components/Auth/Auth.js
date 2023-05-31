import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../api-helpers/api-helpers";
import AuthForm from "./AuthForm";
import { userActions } from "../../store";

const Auth = () => {

  const dispath = useDispatch()
  const navigate = useNavigate()


  const onResReceived = (data) => {
    console.log("Auth", data)
    dispath(userActions.login())
    localStorage.setItem("userId", data.id)
    navigate("/")
  }

  const getData = (data) => {
    console.log(data)
    userLogin(data.inputs, data.signup)
      .then(onResReceived)
      .catch(err => console.log(err))
  }


  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;