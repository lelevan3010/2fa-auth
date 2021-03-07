/* tslint:disable */
import React, { useState, useContext } from "react";

import { customAxios, setAuthToken } from "../../services/setAuthToken";
import jwt from "jsonwebtoken";
import { sendIdentification } from "../../services/sendIdentification";
import { PlantContext } from "../../context/plant/PlantContext";

import { styles } from "./styles";

import Button from "@material-ui/core/Button";

function IdentifyForm({ setLoading, loading }: any) {
  const [file, setFile] = useState(undefined);
  const { dispatchPlant } = useContext(PlantContext);

  const handleChange = (selectorFiles: any) => {
    setFile(selectorFiles);
  };

  const setHistory = (data: any) => {
    const imageURL = data.images[0].url;
    const token = localStorage.getItem("token");
    const { user }: any = jwt.decode(token);
    setAuthToken(token);
    customAxios
      .post(
        "/history/post-history",
        {
          _id: user._id,
          imageURL: imageURL,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .catch((err) => {
        return err;
      });
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (file) {
      sendIdentification(file, dispatchPlant, setLoading, setHistory);
      setLoading(true);
      setFile(undefined);
    } else {
      alert("Please add your file!");
    }
  };

  return (
    <form action="" style={styles.form} onSubmit={onSubmit}>
      <div style={styles.dragBox}>
        <span style={styles.chooseImage}>Choose image</span>
        <span style={styles.boxMessage}>
          {file ? file.name : "or drop here"}
        </span>
        <input
          style={styles.input}
          type="file"
          required
          onChange={(e) => {
            handleChange(e.target.files[0]);
          }}
        />
      </div>
      <Button style={styles.submitBtn} type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
  );
}

export default IdentifyForm;
