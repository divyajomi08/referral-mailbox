import React from "react";
import { useFormik } from "formik";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import authenticationApis from "../../apis/authentication";

const useStyles = makeStyles((theme) => ({
  customButton: {
    borderRadius: "8px",
  },
}));

const Login = () => {
  const classes = useStyles();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = async (values) => {
    try {
      await authenticationApis.login({
        user: {
          email: values.email,
          password: values.password,
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => handleLogin(values),
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg p-6 flex flex-col m-auto w-4/5 md:w-2/5 gap-4">
        <Typography variant="h4" className="self-center">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            size="small"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            size="small"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.customButton}
          >
            Login
          </Button>
        </form>
        <Typography variant="subtitle2" className="self-center text-gray-600">
          Don't have an account?&nbsp;
          <Link className="underline text-black" to="/signup">
            Create account
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
