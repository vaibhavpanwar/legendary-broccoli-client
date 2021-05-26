import API, { setAuthHeader } from "../../config/api";
import cogoToast from "cogo-toast";
import { authConstants } from "../constants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await API.post("users/login", { email, password }, config);
    cogoToast.success("Login success", {
      hideAfter: 10,
      position: "top-right",
      heading: `${data?.name}  Logged in`,
    });
    document.location.href = "/";
    dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });

    setAuthHeader(data?.token);
    localStorage.setItem("authToken", data.token);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: authConstants.USER_LOGIN_FAIL,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  cogoToast.error("User Logged Out", {
    hideAfter: 6,
    position: "bottom-right",
    heading: "",
  });

  dispatch({ type: authConstants.USER_LOGOUT });
  document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.USER_REGISTER_REQUEST,
    });

    const { data } = await API.post("users", { name, email, password });

    dispatch({
      type: authConstants.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });
    cogoToast.success("Register success", {
      hideAfter: 10,
      position: "top-right",
      heading: `${data?.name}  Logged in`,
    });
    document.location.href = "/";

    localStorage.setItem("authToken", data.token);
    setAuthHeader(data?.token);
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: authConstants.USER_REGISTER_FAIL,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const getUserDetails = (token) => async (dispatch) => {
  try {
    dispatch({
      type: authConstants.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await API.get(`users/profile`, config);

    dispatch({
      type: authConstants.USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: authConstants.USER_LOGIN_FAIL,
      payload: message,
    });
  }
};
