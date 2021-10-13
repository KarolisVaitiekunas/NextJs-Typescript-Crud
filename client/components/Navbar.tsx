import React, { ReactElement } from "react";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IUser } from "../interfaces";
import { logout } from "../api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.2rem",
      },
    },
    button: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.6rem",
      },
    },
    toolbarMargin: {
      ...theme.mixins.toolbar,
    },
  })
);

interface Props {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export default function Navbar({ user, setUser }: Props): ReactElement {
  const router = useRouter();
  const classes = useStyles();
  const logoutUser = async () => {
    const data = await logout();
    if (data.success) {
      router.push("/");
      setUser({ status: false, name: "" });
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => router.push("/")}>
            Post App
          </Typography>
          <Button className={classes.button} color="inherit" onClick={() => router.push("/post")}>
            Create post
          </Button>
          <Button className={classes.button} color="inherit" onClick={() => router.push("/posts")}>
            Posts
          </Button>
          {user.status ? (
            <div>
              <Button className={classes.button} color="inherit" onClick={() => logoutUser()}>
                Logout
              </Button>
              <Button className={classes.button} color="inherit">
                {user.name}
              </Button>
            </div>
          ) : (
            <div>
              <Button className={classes.button} color="inherit" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button className={classes.button} color="inherit" onClick={() => router.push("/register")}>
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </div>
  );
}
