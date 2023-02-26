import "../../CSS/userFunction.css";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { isEmpty } from "../../utils/validation/Validation.js";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import {
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";


const initialState = {
  emailOrusername: "",
  password: "",
  err: "",
  success: "",
};
 
function Login() {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { emailOrusername,password, err, success } = user;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    //Validations
    if (
      isEmpty(emailOrusername) ||
      isEmpty(password)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields!",
        success: "",
      });

    try {
       await axios.post("auth/login", {
        emailOrusername,
        password
        
      }).then((res) => {
        navigate("/profile");
        const loggedIn = res.data; 
          
    dispatch(
        setLogin({
         user: loggedIn.user, 
         token: loggedIn.token,
        })
    );
    setUser({ ...user, err: "", success: res.data.msg });
    });       
    } catch (err) {
      err.response.data.msg &&
      setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
   

  return (
    <div>
        <h1 className="Hfontreg">LOGIN HERE</h1>
        <div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <br></br>

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
           ></Box>
               <label className="t-form-label">Email </label>
            <TextField
                type="text"
                className="inp-fields"
                id="email"
                placeholder="Enter Email"
                value={emailOrusername}
                name="emailOrusername"
                onChange={handleChangeInput}
                required
          />         
              <br></br><br></br>
                <label className="t-form-label">Password </label>
              <TextField
                type="password"
                className="inp-fields"
                id="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={handleChangeInput}
                required
              />
          <br></br><br></br><br></br>
          <br></br>
            <button
              type="submit"
              className="btn-register"
              style={{
                width: "140px",
                fontWeight: "bold",
                borderRadius: "12px",
              }}
            >
              Login
        </button>
           <br></br> <br></br><br></br>
            &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <Link to="/register" style={{
          textDecoration: `underline`, textAlign: `center`,
          fontStyle: `italic`, color: `#6b5c06`, fontSize: `20px`, fontWeight: `bold`
        }}>
          Don't Have an Account? Signup Here...
        </Link>
                  
          </form>
        </div>
      </div>
  );
}
export default Login;
