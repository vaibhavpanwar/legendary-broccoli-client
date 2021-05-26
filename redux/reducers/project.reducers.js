import { projectConstants } from "../constants";

export const projectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case projectConstants.LOADING:
      return { ...state, loading: true };

    case projectConstants.PROJECTS_FETCH_SUCCESS:
      return { ...state, loading: false, projects: action.payload };

    case projectConstants.PROJECTS_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: [action.payload, ...state.projects],
      };

    case projectConstants.PROJECTS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.map((i) =>
          i._id === action.payload._id ? action.payload : i
        ),
      };
    case projectConstants.PROJECTS_DELETE_SUCCESS:
      console.log(state.projects, "dekho");
      return {
        ...state,
        loading: false,
        error: null,
        projects: state.projects.filter((i) => i._id !== action.payload),
      };
    case projectConstants.ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
