import API from "../../config/api";
import cogoToast from "cogo-toast";
import { projectConstants } from "../constants";

export const fetchProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    const { data } = await API.get("projects");

    dispatch({
      type: projectConstants.PROJECTS_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const addProject = (title, images, docs) => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    const { data } = await API.post(`projects`, { title, images, docs });

    dispatch({
      type: projectConstants.PROJECTS_ADD_SUCCESS,
      payload: data,
    });
    cogoToast.success("Project Created Successfully", {
      hideAfter: 4,
      position: "top-right",
      heading: "Success!!",
    });
    document.location.href = "/";
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    await API.delete(`projects/${id}`);

    dispatch({
      type: projectConstants.PROJECTS_DELETE_SUCCESS,
      payload: id,
    });
    cogoToast.warn("Project Deleted", {
      hideAfter: 4,
      position: "top-right",
      heading: "Delete success",
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const publishProject = (id) => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    const { data } = await API.put(`projects/publish/${id}`);

    dispatch({
      type: projectConstants.PROJECTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const editProject = (id, title) => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    const { data } = await API.put(`projects/update/${id}`, { title });

    dispatch({
      type: projectConstants.PROJECTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};

export const addComment = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: projectConstants.LOADING,
    });

    const { data } = await API.post(`projects/comment/${id}`, { comment });

    dispatch({
      type: projectConstants.PROJECTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: projectConstants.ERROR,
      payload: errorMessage,
    });
    cogoToast.error(errorMessage, {
      hideAfter: 4,
      position: "top-right",
      heading: "Authentication Error",
    });
  }
};
