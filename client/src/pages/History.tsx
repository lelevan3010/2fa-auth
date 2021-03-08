import React, { useEffect, useContext } from "react";

import { customAxios } from "../services/setAuthToken";
import jwt from "jsonwebtoken";
import { setAuthToken } from "../services/setAuthToken";

import HistoryCard from "../components/HistoryCard/HistoryCard";
import AppLayout from "../layouts/AppLayout";
import { HistoryContext } from "../context/history/HistoryContext";

import { Grid } from "@material-ui/core";

const History = () => {
  const { History, dispatchHistory } = useContext(HistoryContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const { user }: any = jwt.decode(token);

    setAuthToken(token);

    customAxios
      .get(`/history/get-history/${user._id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        dispatchHistory({ type: "GET_HISTORY", payload: res.data });
      });
  }, [dispatchHistory]);

  const mappedHistory = History.map((el, index) => {
    return (
      <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
        <HistoryCard imageURL={el.imageURL} date={el.date} historyId={el._id} />
      </Grid>
    );
  });

  return (
    <AppLayout>
      <h2 style={{ textAlign: "center" }}>Your search history</h2>
      <Grid container spacing={2} style={{ maxWidth: 1500 }}>
        {History.length === 0 ? <h3>No History</h3> : mappedHistory}
      </Grid>
    </AppLayout>
  );
};

export default History;
