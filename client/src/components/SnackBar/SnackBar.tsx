import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export default function SnackBar({ open, handleClose, onUndo }: any) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message="You added new food!"
      action={
        <React.Fragment>
          <Button color="primary" size="small" onClick={onUndo}>
            UNDO
          </Button>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
