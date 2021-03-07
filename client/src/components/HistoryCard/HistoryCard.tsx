import React from "react";

import { timeSince } from "../../services/timeSince";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function HistoryCard({ imageURL, date }: any) {
  return (
    <Card style={{ margin: 24 }}>
      <CardMedia
        component="img"
        height={150}
        src={imageURL}
        title="your search"
      />
      <CardContent>
        <Typography variant="caption" component="h2">
          {timeSince(date) + " ago"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HistoryCard;
