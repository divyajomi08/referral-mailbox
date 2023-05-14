import axios from "axios";
import Toastr from "../components/Common/Toastr";
import { formatRailsErrors } from "utils";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

axios.defaults.baseURL = "/";

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  axios.defaults.withCredentials = true;

  setLoading(false);
};

const handleSuccessResponse = (response) => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }
  return response;
};

const handleErrorResponse = (axiosErrorObject) => {
  if (typeof axiosErrorObject.response?.data?.error === "string") {
    Toastr.error(
      axiosErrorObject.response?.data?.error || DEFAULT_ERROR_NOTIFICATION
    );
  } else {
    Toastr.error(
      formatRailsErrors(axiosErrorObject.response?.data?.errors) ||
        DEFAULT_ERROR_NOTIFICATION
    );
  }
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }
  return Promise.reject(axiosErrorObject);
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, (error) =>
    handleErrorResponse(error)
  );
};
