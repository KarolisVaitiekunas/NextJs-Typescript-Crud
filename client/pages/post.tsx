import React, { ReactElement, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import { useFormik } from "formik";
//yup
import * as yup from "yup";
//api
import { createPost } from "../api";
import { IPost, IUser } from "../interfaces";
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
}

const validationSchema = yup.object({
  title: yup.string().min(4).max(26).required("title is required"),
  body: yup.string().min(15).max(700).required("body is required"),
});

export default function Post({ user }: Props): ReactElement {
  const classes = useStyles();
  const router = useRouter();
  const [message, setMessage] = useState<{ active: boolean; message: string }>({ active: false, message: "" });
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    onSubmit: async (values: IPost) => {
      if (user.status === false) return setMessage({ active: true, message: "You need to login to create a post" });
      const data = await createPost(values);
      if (data.success) {
        router.push("/");
      } else {
        setMessage({ active: true, message: data.message });
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5">Create post</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="body"
          name="body"
          label="Body"
          value={formik.values.body}
          onChange={formik.handleChange}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Submit
        </Button>
        {message.active && <Typography color="error">{message.message}</Typography>}
      </form>
    </div>
  );
}
