import React, { ReactElement, Dispatch, SetStateAction } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { GetServerSideProps } from "next";
import { deletePost, getPosts } from "../api";
import { IPost, IResponse, IUser } from "../interfaces";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    minWidth: 200,
    maxWidth: "auto",
  },
  media: {
    height: 140,
  },
});

interface Props {
  postData: IResponse["message"];
  user: IUser;
}

export default function Posts({ postData, user }: Props): ReactElement {
  const classes = useStyles();
  return (
    <div>
      {postData.map((post: IPost, index: number) => {
        return (
          <Card className={classes.root} key={index}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                {post.postedBy ? post.postedBy.username : "anonymous"}
              </Button>
              {user.name === post.postedBy?.username && (
                <Button size="small" color="secondary" variant="contained" onClick={() => deletePost(post.title)}>
                  Delete
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie;
  let data = await getPosts(cookies);
  let postData: Array<IPost> = [];
  if (data.success) {
    postData = data.data!;
  }

  return {
    props: { postData },
  };
};
