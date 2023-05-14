import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { setAuthHeaders } from "apis/axios";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import Dashboard from "./components/Dashboard/index";
import PrivateRoute from "./components/PrivateRoute";
import authenticationApis from "./apis/authentication";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const authenticateUser = async () => {
    try {
      setLoading(true);
      const response = await authenticationApis.isLoggedIn();
      setIsLoggedIn(response.data.logged_in);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAuthHeaders(setLoading);
    authenticateUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center">
        <CircularProgress className="self-center" size="3rem" />
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
