import React from "react";
import "./ListTable.css";
import Moment from "react-moment";

const tableHead = [
  "No:",
  "Launched (UTC)",
  "Location",
  "Mission",
  "Orbit",
  "Launch Status",
  "Rocket",
];

function ListTable({ data, initialState, finalState }) {
  const dateFormat = (date) => {
    const newDate = new Intl.DateTimeFormat("utc", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

    return newDate;
  };
  return (
    <div className="listTable">
      <div className="listTable__header">
        {tableHead.map((value, i) => (
          <p className="listTable__name" key={i}>
            {value}
          </p>
        ))}
      </div>

      <div className="listTable__listValues">
        {data?.map((value, i) => (
          <div className="listTable__value" key={i}>
            <p>{value.flight_number}</p>
            <p>
              <Moment local>{value.launch_date_local}</Moment>
            </p>
            <p>{value.launch_site.site_name}</p>
            <p>{value.mission_name}</p>
            <p>{value.rocket.second_stage.payloads[0].orbit}</p>
            <p
            //   style={{
            //     background: "red",
            //     borderRadius: 20,
            //     padding: 4,
            //     paddingLeft: 6,
            //     paddingRight: 6,
            //     fontSize: 12,
            //     color: "#fff",
            //   }}
            >
              {"Failed"}
            </p>
            <p>{value.rocket.rocket_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListTable;

//<p>No results fond for the specified filter</p>
