import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/style.vars";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth.actions";
import cogoToast from "cogo-toast";
const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userRegister);

  const [inputFields, setInputFields] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const { fullName, email, password, confirmPassword } = inputFields;

  const handleInputChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (confirmPassword !== password) {
      cogoToast.error("Passwords do not match", {
        hideAfter: 6,
        position: "bottom-right",
        heading: "Error",
      });
      return;
    } else {
      dispatch(register(fullName, email, password));
    }
  };

  return (
    <StyledFormWrapper>
      <StyledFormHeading>User Register</StyledFormHeading>

      <StyledFormContainer>
        <StyledLabel>Full Name</StyledLabel>
        <StyledFormInput
          type="text"
          value={fullName}
          onChange={handleInputChange}
          name="fullName"
          required
        ></StyledFormInput>
        <StyledLabel>Email</StyledLabel>
        <StyledFormInput
          value={email}
          onChange={handleInputChange}
          name="email"
          required
          type="email"
        ></StyledFormInput>
        <StyledLabel>Password</StyledLabel>
        <StyledFormInput
          type="password"
          value={password}
          onChange={handleInputChange}
          name="password"
          required
        ></StyledFormInput>

        <StyledLabel>Confirm Password</StyledLabel>
        <StyledFormInput
          type="password"
          value={confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          required
        ></StyledFormInput>

        <StyledFormButton onClick={handleRegister}>
          {loading ? "Loading.." : "REGISTER"}
        </StyledFormButton>
      </StyledFormContainer>
    </StyledFormWrapper>
  );
};

export default Register;

//styles

const StyledFormWrapper = styled.div`
  background: ${colors.secondary};
  margin: 5rem auto;
  max-width: 105rem;
  padding: 40px;
`;

const StyledFormContainer = styled.div`
  margin: 5rem auto;
  box-sizing: border-box;
  max-width: 30rem;
`;

const StyledFormHeading = styled.h3`
  text-align: center;
  color: #000;
  margin: 0;
  padding: 0;
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
`;
const StyledFormInput = styled.input`
  display: block;
  outline: none;
  width: 100%;
  font-size: 15px;
  margin: 5px auto;
  font-weight: bold;
  color: #a38484;
  border: none;

  border-radius: 12px;
  padding: 10px;
`;

const StyledLabel = styled.label`
  display: block;
  padding: 10px;
  font-size: 14px;
  color: black;
  margin: 10px 0px;
  font-weight: bold;
`;

const StyledFormButton = styled.button`
  padding: 15px 30px;
  min-width: 10rem;
  outline: none;
  margin: 10px;
  border: none;
  transition: 0.3s;
  cursor: pointer;
  background: #272727;
  color: #fff;
  text-transform: uppercase;
  ${(props) =>
    props.isDisable &&
    `
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    
    `}
  &:hover {
    opacity: 0.8;
  }
`;
