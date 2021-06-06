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
  const [selectedValue, setSelectValues] = useState("");
  const [selectedValueTwo, setSelectValuesTwo] = useState("");

  useEffect(() => {
    setTableData(items[0]);
  }, [items]);

  const dataByDate = (prevDate) => {
    const todayDate = Date().toLocaleString();
    const ed = new Date(todayDate).getTime();
    const sd = new Date(prevDate).getTime();
    const result = items[0]?.filter((d) => {
      var time = new Date(d.launchDate).getTime();
      return sd < time && time < ed;
    });
    setTableData(result);
  };

  function addDays(days) {
    var result = new Date(new Date());
    result.setDate(result.getDate() + days);
    return result;
  }

  const columns = [
    { field: "id", headerName: "No", width: 100 },
    { field: "launchDate", headerName: "Launch Date", width: 180 },
    { field: "launchSiteName", headerName: "Location", width: 180 },
    { field: "missionName", headerName: "Mission", width: 180 },
    { field: "orbit", headerName: "Orbit", width: 180 },
    { field: "rocketName", headerName: "Rocket Name", width: 180 },
  ];

  const handleChange = (event) => {
    setSelectValues(event.target.value);
    let date;
    if (event.target.value === "Past week") {
      date = addDays(-7);
      dataByDate(date);
    } else if (event.target.value === "Past month") {
      date = addDays(-30);
      dataByDate(date);
    } else if (event.target.value === "Past 3 months") {
      date = addDays(-90);
      dataByDate(date);
    } else if (event.target.value === "Past 6 months") {
      date = addDays(-180);
      dataByDate(date);
    } else if (event.target.value === "Past 1 year") {
      date = addDays(-360);
      dataByDate(date);
    } else if (event.target.value === "Past 2 year") {
      date = addDays(-720);
      dataByDate(date);
    }
  };

  const handleChangeTwo = (event) => {
    setSelectValuesTwo(event.target.value);

    if (event.target.value === "All Launches") {
      setTableData(items[0]);
    }
  };

  return (
    <div className="mainPage">
      <div className="mainPage__dropdown">
        <div className="mainPage__dropdownFirst">
          <CalendarTodayIcon style={{ marginRight: 10 }} />
          <Dropdown
            data={dataDropdown}
            handleChange={handleChange}
            value={selectedValue}
            // selectedDate={(val) => selectedDate(val)}
          />
        </div>

        <div className="mainPage__dropdownLast">
          <FilterListIcon style={{ marginRight: 10 }} />
          <Dropdown
            data={launches}
            handleChange={handleChangeTwo}
            value={selectedValueTwo}
          />
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
