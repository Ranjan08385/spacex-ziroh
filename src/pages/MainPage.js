import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Dropdown from "../components/Dropdown";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListTable from "./ListTable";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/spaceXdataSlice";
import { DataGrid } from "@material-ui/data-grid";

const launches = [
  "All Launches",
  "Upcomming Launches",
  "Successfull Launches",
  "Failed Launches",
];

const dataDropdown = [
  "Past week",
  "Past month",
  "Past 3 months",
  "Past 6 months",
  "Past year",
  "Past 2 year",
];

function MainPage({ spaceData }) {
  const [initialState, setInitialState] = useState(1);
  const [finalState, setFinalState] = useState(10);
  const [data, setdata] = useState([]);
  const items = useSelector(selectItems);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log("SLice data", items[0]);
    setTableData(items[0]);
  }, [items]);

  const onClickNext = () => {
    if (finalState <= spaceData.length) {
      setInitialState(finalState + 1);
      setFinalState(finalState + 10);
    }
  };

  const onClickPrev = () => {
    if (initialState !== 1) {
      setInitialState(initialState - 10);
      setFinalState(initialState - 1);
    }
  };

  const dataByDate = (prevDate) => {
    const todayDate = Date().toLocaleString();
    const ed = new Date(todayDate).getTime();
    const sd = new Date(prevDate).getTime();
    const result = spaceData.filter((d) => {
      var time = new Date(d.launch_date_local).getTime();
      return sd < time && time < ed;
    });
    console.log("Date sort", result);
    setdata(result);
  };

  const columns = [
    { field: "id", headerName: "Flight No", width: 70 },
    { field: "launchDate", headerName: "Launch Date", width: 180 },
    { field: "launchSiteName", headerName: "Location", width: 180 },
    { field: "missionName", headerName: "Mission", width: 180 },
    { field: "orbit", headerName: "Orbit", width: 180 },
    { field: "rocketName", headerName: "Rocket Name", width: 180 },
  ];

  return (
    <div className="mainPage">
      <div className="mainPage__dropdown">
        <div className="mainPage__dropdownFirst">
          <CalendarTodayIcon style={{ marginRight: 10 }} />
          <Dropdown
            data={dataDropdown}
            // selectedDate={(val) => selectedDate(val)}
          />
        </div>

        <div className="mainPage__dropdownLast">
          <FilterListIcon style={{ marginRight: 10 }} />
          <Dropdown data={launches} />
        </div>
      </div>

      <div className="mainPage__table">
        {tableData ? (
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        ) : null}
      </div>
    </div>
  );
}

export default MainPage;
