import React from "react";

import { useFormik } from "formik";
import { Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom";
import authenticationApis from "apis/authentication";
import { useButtonStyles, isEmailValid } from "utils";
import { SIGNUP_INITIAL_VALUES } from "constants";

const Signup = () => {
  const classes = useButtonStyles();
  const queryParams = new URLSearchParams(window.location.search);
  const referralCode = queryParams.get("referral_code");
  const initialValues = SIGNUP_INITIAL_VALUES;

  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "First name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!isEmailValid(values.email)) {
      errors.email = "Email should be of valid format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSignup = async (values) => {
    try {
      await authenticationApis.signup({
        user: {
          email: values.email,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
          referral_code: referralCode,
          first_name: values.firstName,
          last_name: values.lastName,
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
    onSubmit: (values) => handleSignup(values),
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg p-6 flex flex-col m-auto w-4/5 md:w-2/5 gap-4">
        <Typography variant="h4" className="self-center">
          Signup
        </Typography>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <TextField
              required
              className="w-full"
              label="First Name"
              variant="outlined"
              name="firstName"
              size="small"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && !!formik.errors.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              className="w-full"
              label="Last Name"
              variant="outlined"
              name="lastName"
              size="small"
              InputProps={{
                style: { borderRadius: "8px" },
              }}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !!formik.errors.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </div>
          <TextField
            required
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
            required
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
          <TextField
            required
            label="Password Confirmation"
            variant="outlined"
            type="password"
            name="passwordConfirmation"
            size="small"
            InputProps={{
              style: { borderRadius: "8px" },
            }}
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordConfirmation &&
              !!formik.errors.passwordConfirmation
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.customButton}
            disabled={formik.isSubmitting}
          >
            Signup
          </Button>
        </form>
        <Typography variant="subtitle2" className="self-center text-gray-600">
          Already have an account?&nbsp;
          <Link className="underline text-black" to="/login">
            Log in
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Signup;
