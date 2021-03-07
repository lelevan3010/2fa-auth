import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function PlantInfo({
  similarImg,
  name,
  commonNames,
  wikiUrl,
  probability,
}: any) {
  return (
    <Card style={{ margin: 24 }}>
      <CardMedia
        style={{ height: 200 }}
        image={similarImg}
        title="Similar plant image"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography
          gutterBottom
          variant="overline"
          color="secondary"
          component="h3"
        >
          {(probability * 100).toFixed(2) + "%"}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {commonNames &&
            commonNames.map((el: any, index: any) => {
              if (commonNames.length === index + 1) {
                return el + ".";
              } else {
                return el + ", ";
              }
            })}
        </Typography>
      </CardContent>
      <CardActions>
        <a
          href={`https://www.google.com/search?q=${name
            .split(" ")
            .join("%20")}`}
          style={{ textDecoration: "none" }}
        >
          <Button size="small" color="secondary">
            Google
          </Button>
        </a>
        <a href={wikiUrl} style={{ textDecoration: "none" }}>
          <Button size="small" color="secondary">
            Wiki
          </Button>
        </a>
      </CardActions>
    </Card>
    // <div>
    //   <p>55%</p>
    //   <img
    //     style={{ width: 100, height: 100, marginRight: 10 }}
    //     src="https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Dianthus caryophyllus/6c8721df7026f4d64c9fd355b84fa947.jpg"
    //     alt="pic"
    //   />
    //   <img
    //     style={{ width: 100, height: 100, marginRight: 10 }}
    //     src="https://storage.googleapis.com/plant_id_images/similar_images/2019_05/images/Dianthus caryophyllus/6c8721df7026f4d64c9fd355b84fa947.small.jpg"
    //     alt="pic"
    //   />
    //   <h3>Dianthus caryophyllus</h3>
    //   <h4>Carnation, Clove pink</h4>
    //   <a href="google.com">Google</a>
    // </div>
  );
}

export default PlantInfo;
