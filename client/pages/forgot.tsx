import React, { ReactElement, useState, useEffect } from "react";
//next
import { useFormik } from "formik";
//yup
import * as yup from "yup";
//api
import { forgotPassword } from "../api";
//material ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "90vh",
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

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
});

export default function Forgot(): ReactElement {
  const classes = useStyles();
  const [message, setMessage] = useState<{ active: boolean; message: string }>({ active: false, message: "" });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      const data = await forgotPassword(values);
      if (data.success) {
        setMessage({ active: true, message: data.message });
      } else {
        setMessage({ active: true, message: data.message });
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5">Forgot password</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {message.active && <Typography color="error">{message.message}</Typography>}
      </form>
    </div>
  );
}
