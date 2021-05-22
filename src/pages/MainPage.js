import React, { useState, useEffect } from "react";
import "./MainPage.css";
import Dropdown from "../components/Dropdown";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FilterListIcon from "@material-ui/icons/FilterList";
import ListTable from "./ListTable";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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

  useEffect(() => {
    const newData = spaceData.slice(initialState - 1, finalState);
    setdata(newData);
  }, [spaceData, initialState, finalState, data]);

  const onClickNext = () => {
    setInitialState(finalState + 1);
    setFinalState(finalState + 10);
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

  const selectedDate = (val) => {
    console.log(val);

    // if (val === "Past week") {
    //   const sd = "2021-05-22T00:00:00.000Z";
    //   dataByDate(sd);
    // } else if (val === "Past month") {
    //   const sd = "2021-04-1300:00:00.000Z";
    //   dataByDate(sd);
    // } else if (val === "Past 3 months") {
    //   const sd = "2021-02-1300:00:00.000Z";
    //   dataByDate(sd);
    // } else if (val === "Past 6 months") {
    //   const sd = "2020-11-1300:00:00.000Z";
    //   dataByDate(sd);
    // } else if (val === "Past year") {
    //   const sd = "2020-01-1300:00:00.000Z";
    //   dataByDate(sd);
    // } else if (val === "Past 2 year") {
    //   const sd = "2019-01-1300:00:00.000Z";
    //   dataByDate(sd);
    // }
  };
  return (
    <div className="mainPage">
      <div className="mainPage__dropdown">
        <div className="mainPage__dropdownFirst">
          <CalendarTodayIcon style={{ marginRight: 10 }} />
          <Dropdown
            data={dataDropdown}
            selectedDate={(val) => selectedDate(val)}
          />
        </div>

        <div className="mainPage__dropdownLast">
          <FilterListIcon style={{ marginRight: 10 }} />
          <Dropdown data={launches} />
        </div>
      </div>

      <div className="mainPage__table">
        <ListTable
          data={data}
          initialState={initialState}
          finalState={finalState}
        />
      </div>

      <div className="mainPage__pagination">
        <div className="mainPage__numbers">
          <ChevronLeftIcon onClick={onClickPrev} />
          <p>
            {initialState} - {finalState}
          </p>
          <ChevronRightIcon onClick={onClickNext} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
