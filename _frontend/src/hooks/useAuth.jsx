import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authSlice } from "../Store/user";
import { useAlert } from "../Store/Alert";

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
      const resp = await axios.post("/api/auth", { ...props, isOwner });
      setAuth({ _id: resp.data._id, isOwner: resp.data.isOwner });
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
  const { Alert } = useAlert();

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
      const resp = await axios.post("/api/auth/login", {
        email,
        password,
        isOwner,
      });
      setAuth({ _id: resp.data.data, isOwner: resp.data.isOwner });

      navigate(resp.data.isOwner ? "/restaurantHome" : "/");
      Alert("You Have Successfully Logged In", true);
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
  const {
    auth: { _id },
    isOwner,
  } = authSlice();
  const checkOTP = async (otp) => {
    const props = { _id, otp, isOwner };    
    const resp = await axios.post("/api/auth/OTP", props);
    if (resp.data.success) {
      navigate(isOwner ? "/restaurantHome" : "/"); 
    }
  };

  return { checkOTP };
};
//! password recover
export const usePassRecover = () => {
  const { isOwner } = authSlice();
  const GetPass = async (email) => {
    //TODO: make alert
    const resp = await axios.post("/api/auth/passRecover", {
      email,
      isOwner,
    });
    console.log(resp);
  };

  return { GetPass };
};
