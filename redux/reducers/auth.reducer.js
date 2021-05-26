import { authConstants } from "../constants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      return { loading: true };
    case authConstants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case authConstants.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case authConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case authConstants.USER_REGISTER_REQUEST:
      return { loading: true };
    case authConstants.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case authConstants.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case authConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
