import React from "react";
import "./Button.css";

const isOper = (val) => {
  return !isNaN(val) || val === "." || val === "=";
};

export default function Button(props) {
  return (
    <div
      className={`button-wrapper ${isOper(props.children) ? null : "operator"}`}
      onClick={() => props.handleClick(props.children)}
    >
      {props.children}
    </div>
  );
}
