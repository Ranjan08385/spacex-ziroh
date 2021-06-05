import React from "react";
import "./ListTable.css";
import moment from "moment";

const tableHead = [
  "No",
  "Launched (UTC)",
  "Location",
  "Mission",
  "Orbit",
  "Launch Status",
  "Rocket",
];

let styleArray = [];

function ListTable({ data }) {
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

  const rowStyle = (i) => {
    styleArray.push(i);
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
            <p>{moment(value.launch_date_local).format("lll")}</p>
            <p>{value.launch_site.site_name}</p>
            <p>{value.mission_name}</p>
            <p>{value.rocket.second_stage.payloads[0].orbit}</p>
            <p
              style={{
                color: Number(value.flight_number) % 2 === 0 ? "red" : "green",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              {Number(value.flight_number) % 2 === 0 ? "Failed" : "Success"}
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
