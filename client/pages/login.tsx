import React, { ReactElement, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import { useFormik } from "formik";
//yup
import * as yup from "yup";
//api
import { login } from "../api";
import { IAuthBody, IUser } from "../interfaces";
//material ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "300px",
    },
    button: {
      marginTop: "10px",
    },
  })
);

interface Props {
  verifyLogin(): Promise<void>;
  user: IUser;
  validatingUser: boolean;
}

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(4).max(255).required("Password is required"),
});

export default function Login({ verifyLogin, user, validatingUser }: Props): ReactElement {
  const classes = useStyles();
  const router = useRouter();
  useEffect(() => {
    if (user.status && !validatingUser) {
      router.push("/");
    }
  }, [validatingUser, user, router]);

  const [error, setError] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values: IAuthBody) => {
      const data = await login(values);
      if (data.success) {
        verifyLogin();
        router.push("/");
      } else {
        setError(true);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5">Create post</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button className={classes.button} variant="contained" color="secondary" onClick={() => router.push("/forgot")}>
          Forgot Password
        </Button>
        {error && <Typography color="error">Failed to log you in, please try again later.</Typography>}
      </form>
    </div>
  );
}
