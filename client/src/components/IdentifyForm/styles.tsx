import { CSSProperties } from "react";

interface Styles {
  form: CSSProperties;
  dragBox: CSSProperties;
  chooseImage: CSSProperties;
  boxMessage: CSSProperties;
  input: CSSProperties;
  submitBtn: CSSProperties;
}

export const styles: Styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
  },
  dragBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "65px",
    width: "100%",
    maxWidth: "100%",
    border: "1px dashed #c4c4c4",
    borderRadius: "3px",
    padding: "0 20px",
    transition: "0.2s",
  },
  chooseImage: {
    display: "inline-block",
    border: "1px solid #c4c4c4",
    borderRadius: "3px",
    padding: "5px 12px",
    marginRight: "10px",
    fontSize: "10px",
    textTransform: "uppercase",
  },
  boxMessage: {
    flex: 1,
    fontSize: "11px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  input: {
    opacity: 0,
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    cursor: "pointer",
  },
  submitBtn: { backgroundColor: "#5373ff", color: "white", marginTop: 15 },
};
