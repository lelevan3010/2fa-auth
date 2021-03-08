import React, { useContext } from "react";

import { HistoryContext } from "../../context/history/HistoryContext";

import { timeSince } from "../../services/timeSince";
import { customAxios, setAuthToken } from "../../services/setAuthToken";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flex: "1 0 auto",
      display: "flex",
      justifyContent: "space-between",
    },
    cover: {
      width: 151,
      height: 151,
    },
    button: {
      alignSelf: "flex-start",
      padding: 0,
    },
  })
);

function HistoryCard({ imageURL, date, historyId }: any) {
  const classes = useStyles();
  const { dispatchHistory } = useContext(HistoryContext);

  const deleteHistory = async () => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    dispatchHistory({ type: "DELETE_HISTORY", payload: { _id: historyId } });
    await customAxios.post("/history/delete-history", {
      _id: historyId,
    });
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={imageURL} title="history" />
      <CardContent className={classes.content}>
        <Typography variant="caption" component="h2">
          {timeSince(date) + " ago"}
        </Typography>
        <IconButton className={classes.button} onClick={deleteHistory}>
          <CloseIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
