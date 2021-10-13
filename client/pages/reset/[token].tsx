import React, { ReactElement, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import { useFormik } from "formik";
//yup
import * as yup from "yup";
//api
import { resetPassword } from "../../api";

//material ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "90vh",
      display: "flex",
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
  password: yup.string().min(4).max(255).required("Password is required"),
});

export default function Reset(): ReactElement {
  const classes = useStyles();
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState<{ active: boolean; message: string }>({ active: false, message: "" });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      const data = await resetPassword({ password: values.password, resetToken: token! });
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
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          type="password"
          id="password"
          name="password"
          label="Enter new password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {message.active && message.message}
      </form>
    </div>
  );
}
