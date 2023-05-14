import axios from "axios";

const login = payload => axios.post("/users/sign_in", payload);

const logout = () => axios.delete("/users/sign_out");

const signup = (payload) => axios.post("/users",payload);

const isLoggedIn = ()=>axios.get("/logged_in");

const authenticationApis = { signup, login, logout, isLoggedIn };

export default authenticationApis