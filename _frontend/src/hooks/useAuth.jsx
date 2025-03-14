import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authSlice } from "../Store/user";

//////!   SignUp   !//////
export const useSignup = () => {
  const { setAuth, isOwner } = authSlice();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const signup = async (props) => {
    if (handleSignup({ ...props, setErr })) return;
    setLoading(true);
    try {
      setErr({ email: "", password: "", username: "", confirmPassword: "" });
      let resp;
      if (!isOwner) {
        resp = await axios.post("/api/customer", props);
      } else {
        resp = await axios.post("/api/restaurant", props);
      }
      setAuth(resp.data.data._id);
      return resp;
    } catch (error) {
      if (error.response.status === 402)
        setErr({ ...err, email: "Email Already Exist" });

      if (error.response.status === 403)
        setErr({ ...err, username: "Username Already Exist" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup, err };
};

const handleSignup = ({
  email,
  password,
  confirmPassword,
  username,
  setErr,
}) => {
  if (
    !email ||
    !password ||
    !username ||
    !confirmPassword ||
    !/.{3,}/.test(username) ||
    !/^(?=.*\d).{6,}$/.test(password) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password !== confirmPassword
  ) {
    setErr(() => ({
      password: !password
        ? "Please fill the input with new password"
        : /^(?=.*\d).{6,}$/.test(password)
        ? ""
        : "Please Enter Valid Password",
      email: !email
        ? "Please fill the input with your email"
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? ""
        : "Please Enter Valid Email",
      username: !username
        ? "Please fill the input with a username"
        : /.{3,}/.test(username)
        ? ""
        : "Please Enter Valid Username",
      confirmPassword: !confirmPassword
        ? "Please fill the input with same password"
        : confirmPassword !== password
        ? "Please Enter The Same Password"
        : "",
    }));
    return true;
  }
  return false;
};

//////!   LOGIN   !//////

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState({ email: "", password: "" });
  const { setAuth, isOwner } = authSlice();

  const login = async ({ email, password }) => {
    if (
      !email ||
      !password ||
      !/^(?=.*\d).{6,}$/.test(password) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setErr({
        password: !password
          ? "Please fill the input with your password"
          : /^(?=.*\d).{6,}$/.test(password)
          ? ""
          : "Please Enter Valid Password",
        email: !email
          ? "Please fill the input with your email"
          : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? ""
          : "Please Enter Valid Email",
      });
      return;
    }
    setloading(true);
    try {
      setErr({ email: "", password: "" });
      let resp; 
      if (!isOwner) {
        resp = await axios.post("/api/customer/login", { email, password });
      } else {
        resp = await axios.post("/api/restaurant/login", { email, password });
      }
      setAuth(resp.data.data._id);
      navigate("/");
    } catch (error) {
      if (error.response.status === 402 || error.response.status === 403)
        setErr({
          password: error.response.status === 402 ? "Incorrect Password" : "",
          email: error.response.status === 403 ? "Email Not Found" : "",
        });
    } finally {
      setloading(false);
    }
  };

  return { login, loading, err };
};

//! OTP Confirmation
export const useOTPCheck = () => {
  const navigate = useNavigate();
  const { auth, isOwner } = authSlice();
  const checkOTP = async (otp) => {
    const props = { auth, otp };
    let resp;
    if (isOwner) {
      resp = await axios.post("/api/restaurant/OTP", props);
    } else {
      resp = await axios.post("/api/customer/OTP", props);
    }
    if (resp.data.success) {
      navigate("/");
    }
  };

  return { checkOTP };
};
//! password recover
export const usePassRecover = () => {
  const { isOwner } = authSlice();
  const GetPass = async (email) => {
    let resp;
    if (isOwner) {
      resp = await axios.post("/api/restaurant/passRecover", {
        email,
        isOwner,
      });
    } else {
      resp = await axios.post("/api/customer/passRecover", { email, isOwner });
    }
    console.log(resp);
  };

  return { GetPass };
};