import "../../CSS/userFunction.css";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { isEmpty, isEmail, isLength,isMatch } from "../../utils/validation/Validation.js";
import PasswordChecklist from "react-password-checklist";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  IconButton
} from "@mui/material";

import {
  EditOutlined,
  DeleteOutlined
} from "@mui/icons-material";

import StyleFlex from "components/StyleFlex";
import Dropzone from "react-dropzone";
const initialState = {
  fname: "",
  lname: "",
  email: "",
  mobile: "",
  password: "",
  cf_password: "",
  avatar:"",
  err: "",
  success: "",
};


function Register() {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
  let picture="";
  const { fname,lname, email, mobile, password, cf_password, err, success } =user;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState(null);
  const [data, setData] = useState(initialState);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      await changeAvatar();  
    }
    if(picture===""){
      picture="https://res.cloudinary.com/dl99x/image/upload/v1665520140/avatar_cugq40_osziik.png"
    }
    //Validations
    if (
      isEmpty(fname) ||
      isEmpty(lname) ||
      isEmpty(email) ||
      isEmpty(mobile) ||
      isEmpty(password)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields!",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email type!", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must have at least 8 characters!",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password and confirm password not matched!", success: "" });
    try {
       await axios.post("/auth/register", {
        fname,
        lname,
        email,
        mobile,
        password,
        avatar:picture
       }, 
       ).then((res) => {
      alert("Account Created Successfully");
       navigate("/");
       setUser({ ...user, err: "", success: res.data.msg });
      });
    
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const changeAvatar = async (e) => {
    try {
      const file = image;
     
      if (!file) 
        return setData({
          ...data,
          err:"No files were uploaded.",
          success: "",
        });
       
              
      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });
        
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err:"Please upload a JPEG or PNG file.",
          success: "",  
        });

      let formData2 = new FormData();
      formData2.append("file", file);

     //upload image to cloudinary
      const res = await axios.post("/images/upload", formData2, {
        headers: {
          "content-type": "multipart/form-data"      
        },
        
      });
      picture = res.data.url;

    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };



  return (
    <div>
        <h1 className="Hfontreg">SIGNUP HERE</h1>
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
          <label className="t-form-label2">* </label>
          <label className="t-form-label">First Name </label>
            <TextField 
                type="text"
                className="inp-fields"
                id="fname"
                placeholder="Enter First Name"
                value={fname}
                name="fname"
                onChange={handleChangeInput}
                required
             />
              <br></br><br></br>
              <label className="t-form-label2">* </label>
               <label className="t-form-label">Last Name </label>
            <TextField 
                type="text"
                className="inp-fields"
                id="lname"
                placeholder="Enter Last Name"
                value={lname}
                name="lname"
                onChange={handleChangeInput}
                required
             />
              <br></br><br></br>
              <label className="t-form-label2">* </label>
               <label className="t-form-label">Email </label>
            <TextField
                type="email"
                className="inp-fields"
                id="email"
                placeholder="Enter Email"
                value={email}
                name="email"
                onChange={handleChangeInput}
                required
          />
          <br></br><br></br>
              <label className="t-form-label2">* </label>
              <label className="t-form-label">Mobile Number </label>
              <TextField
                type="text"
                className="inp-fields"
                id="mobile"
                placeholder="Enter mobile number "
                value={mobile}
                name="mobile"
                onChange={handleChangeInput}
                required
              />
            
              <br></br><br></br>
                <label className="t-form-label2">* </label>
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
          
            <div className="pwd-checklist">
              <PasswordChecklist
                rules={["minLength", "number", "capital"]}
                minLength={8}
                value={password}
                messages={{
                  minLength: "At least 8 characters.",
                  number: "Minimum One Numeric Value.",
                  capital: "Minimum One Uppercase Letter.",
                }}
              />
              <p>
                Your password must contain at least one numeric value and
                <br></br>one uppercase letter with minimum 8 characters.
                </p>
               </div>

                <label className="t-form-label2">* </label>
                <label className="t-form-label">Confirm Password </label>
              <TextField
                type="password"
                className="inp-fields"
                id="cf_password"
                placeholder="Confirm Password"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
                required
              />
               <br></br><br></br><br></br>
          <label className="t-form-label">Profile Picture </label>
           <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <StyleFlex>
                <Box
                  {...getRootProps()}
                  border={`2px dashed`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <StyleFlex>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </StyleFlex>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </StyleFlex>
            )}
          </Dropzone>
           <p></p>
            <label className="t-form-label3">
              All fields with * are required.
            </label>{" "}
          <br></br> <br></br>
          
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
              Register
            </button>
        </form>
        <br></br> <br></br>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <Link to="/" style={{
          textDecoration: `underline`, textAlign: `center`,
          fontStyle: `italic`, color: `#6b5c06`, fontSize: `20px`, fontWeight: `bold`
        }}>
         
          Already Have an Account? Login Here...
        </Link>
        </div>
      </div>
  );
}
export default Register;
