import "../../main.scss";
import itemBox from "./inventory.png";
import hiddenCasset from "../../assets/SceneFour/cassette-tape.png";
import key from "./key.png";
import candyBucket from "./veryFullBucket.png";
import React, { useState, useEffect } from "react";

//create a function that sets the classes to thier respective inv classes.

const Inventory = () => {
  let noMoreCasset = false;
  let noMoreCandyBucket = false;
  let noMoreKey = false;
  window.addEventListener("storage", () => {
    const casset = JSON.parse(window.localStorage.getItem("hasCasset"));
    const candy = JSON.parse(window.localStorage.getItem("hasCandyBucket"));
    const keyBool = JSON.parse(window.localStorage.getItem("hasKey"));

    if (casset && !noMoreCasset) {
      document.getElementsByClassName("hiddenCasset")[0].className =
        "invCasset";
      noMoreCasset = true;
    }
    if (candy && !noMoreCandyBucket) {
      document.getElementsByClassName("hiddenCandyBucket")[0].className =
        "invCandyBucket";
      noMoreCandyBucket = true;
    }
    if (keyBool && !noMoreKey) {
      document.getElementsByClassName("hiddenKey")[0].className = "invKey";
      noMoreKey = true;
    }
  });
  return (
    <div className="inventory">
      <img
        className="itemBox"
        src={itemBox}
        alt="Three boxes that are for your inventory"
      ></img>
      <img
        className={"hiddenCasset"}
        src={hiddenCasset}
        alt="something siom,ethin"
      ></img>
      <img
        className={"hiddenCandyBucket"}
        src={candyBucket}
        alt="a candyBickey"
      ></img>
      <img className={"hiddenKey"} src={key} alt="an old key"></img>
    </div>
  );
};

export default Inventory;
