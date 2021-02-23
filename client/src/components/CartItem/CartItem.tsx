import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CardItem({ item }: any) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <li>{item}</li>
    </React.Fragment>
  );
}
