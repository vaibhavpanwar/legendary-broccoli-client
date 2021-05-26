import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./auth.reducer";
import { projectsReducer } from "./project.reducers";

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  projectsList: projectsReducer,
});
