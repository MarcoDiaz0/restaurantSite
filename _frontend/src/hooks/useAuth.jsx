import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authSlice } from "../Store/user";

//////!   SignUp   !//////
export const useSignup = () => {
  const navigate = useNavigate();
  const { setAuth } = authSlice();
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
      let resp;
      if (!props.isOwner) {
        resp = await axios.post("/api/customer", props);
      } else {
        resp = await axios.post("/api/restaurant", props);
      }
      setErr({ email: "", password: "", username: "", confirmPassword: "" });
      setAuth(resp.data.data._id);
      navigate("/");
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
  const { setAuth } = authSlice();

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
      const resp = await axios.post("/api/customer/login", { email, password });
      setErr({ email: "", password: "" });
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
