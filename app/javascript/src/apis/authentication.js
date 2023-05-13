import axios from "axios";

const login = payload => axios.post("/users/sign_in", payload);

const logout = () => axios.delete("/users/sign_out");

const signup = (payload) => axios.post("/users",payload);

const authenticationApis = { signup, login, logout };

export default authenticationApis