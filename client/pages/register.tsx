import React, { ReactElement, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import { useFormik } from "formik";
//yup
import * as yup from "yup";
//api
import { register } from "../api";
import { IAuthBody, IUser } from "../interfaces";
//material ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "910px",
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
  user: IUser;
  validatingUser: boolean;
}

const validationSchema = yup.object({
  username: yup.string().min(4).max(32).required("username is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(4).max(255).required("Password is required"),
});

export default function Register({ user, validatingUser }: Props): ReactElement {
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
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values: IAuthBody) => {
      const data = await register(values);
      if (data.success) {
        router.push("/");
      } else {
        setError(true);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5">Register</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
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
        {error && <Typography color="error">Failed to create a user, please try again later.</Typography>}
      </form>
    </div>
  );
}
