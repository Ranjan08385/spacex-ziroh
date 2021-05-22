import axios from "axios";

const SpacexAPI = axios.create({
  baseURL: "https://api.spacexdata.com/v3",
});

export default SpacexAPI;
