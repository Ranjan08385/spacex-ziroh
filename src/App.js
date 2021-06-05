import React, { useEffect, useState } from "react";
import SpacexAPI from "./api/SpacexApi";
import "./App.css";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import { useDispatch } from "react-redux";
import { allSpacexData } from "./slices/spaceXdataSlice";
import moment from "moment";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    SpacexAPI.get("/launches")
      .then((res) => {
        let newArray = [];
        res?.data?.map((data) => {
          const newData = {
            id: data.flight_number,
            launchDate: moment(data.launch_date_local).format("lll"), //moment(value.launch_date_local).format("lll")
            launchSiteName: data.launch_site.site_name,
            missionName: data.mission_name,
            orbit: data.rocket.second_stage.payloads[0].orbit,
            rocketName: data.rocket.rocket_name,
          };
          newArray.push(newData);
        });
        console.log("Space data", newArray);
        dispatch(allSpacexData(newArray));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="app">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;
