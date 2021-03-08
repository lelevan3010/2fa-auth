import React, { useState, useContext, useEffect } from "react";

import { PlantContext } from "../context/plant/PlantContext";
import { customAxios, setAuthToken } from "../services/setAuthToken";

import IdentifyForm from "../components/IdentifyForm/IdentifyForm";
import PlantInfo from "../components/PlantInfo/PlantInfo";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import AppLayout from "../layouts/AppLayout";

import { Grid, LinearProgress } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import leaf from "../assets/leaf.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formPaper: {
      [theme.breakpoints.up("md")]: {
        minWidth: 700,
      },
    },
  })
);

function Identify() {
  const classes = useStyles();
  const { Plant } = useContext(PlantContext);
  const [loading, setLoading] = useState(false);
  const [stateUsername, setStateUsername] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username === null) {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      customAxios.get("/user/profile").then((res) => {
        localStorage.setItem("username", res.data.username);
        setStateUsername(res.data.username);
      });
    }
  });

  const logicalPlant =
    Plant.suggestions === undefined && !localStorage.getItem("current_plant")
      ? null
      : Plant.suggestions !== undefined
      ? Plant
      : localStorage.getItem("current_plant")
      ? JSON.parse(localStorage.getItem("current_plant"))
      : Plant;

  // Get plant info via localStorage. If there is nothing in localStorage, then return nothing
  const mappedPlantInfo = logicalPlant ? (
    logicalPlant.suggestions.map(
      (
        { plant_name, plant_details, probability, similar_images }: any,
        index: any
      ) => {
        return (
          <Grid key={index} item xs={12} md={6}>
            <PlantInfo
              similarImg={similar_images[0].url}
              name={plant_name}
              commonNames={plant_details.common_names}
              wikiUrl={plant_details.url}
              probability={probability}
            />
          </Grid>
        );
      }
    )
  ) : (
    <p style={{ textAlign: "center", width: "100%" }}>
      Hi {username === null ? stateUsername : username}, choose an image to get
      more information about your plant!
    </p>
  );

  return (
    <AppLayout>
      <Grid className={classes.formPaper} container style={{ maxWidth: 986 }}>
        <Grid item xs={12}>
          <Paper style={{ padding: 12, marginBottom: 12 }}>
            <Grid container>
              <Grid item xs={12} md={9} lg={9}>
                <ErrorBoundary>
                  <IdentifyForm setLoading={setLoading} loading={loading} />
                </ErrorBoundary>
              </Grid>
              <Grid item xs={12} md={3} lg={3} style={{ textAlign: "end" }}>
                {logicalPlant ? (
                  <img
                    style={{
                      height: 122,
                      border: "1px solid #c4c4c4",
                      borderRadius: "4px",
                      padding: "6px",
                    }}
                    src={logicalPlant.images[0].url}
                    alt="Your flower"
                  />
                ) : (
                  <img
                    style={{
                      height: 122,
                      width: 122,
                      border: "1px solid #c4c4c4",
                      borderRadius: "4px",
                      padding: "6px",
                    }}
                    src={leaf}
                    alt="Your flower"
                  />
                )}
              </Grid>
            </Grid>
          </Paper>

          {loading && (
            <LinearProgress color="secondary" style={{ borderRadius: 6 }} />
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ maxWidth: 986 }}>
        {mappedPlantInfo}
      </Grid>
    </AppLayout>
  );
}

export default Identify;
