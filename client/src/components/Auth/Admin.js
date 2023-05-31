import React from "react";
import { adminLogin } from "../../api-helpers/api-helpers";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";

const Admin = () => {

  const dispath = useDispatch()
  const navigate = useNavigate()


  const onResReceived = (data) => {
    console.log("Admin",data)
    dispath(adminActions.login())
    localStorage.setItem("adminId", data.id)
    localStorage.setItem("token", data.token);
    navigate("/")
  }

  const getData = (data) => {
    console.log(data)
    adminLogin((data.inputs))
      .then(onResReceived)
      .catch(err => console.log(err))
  }

  
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Admin;
