import { toast, Slide } from "react-toastify";

export const TOASTR_OPTIONS = {
  position: toast.POSITION.BOTTOM_CENTER,
  transition: Slide,
  theme: "colored",
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const BOX_STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_INITIAL_VALUES = {
  email: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: "",
};