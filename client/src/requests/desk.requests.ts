import axios from "axios";

export const createdDesk = (props: any) => {
  return axios.post("http://localhost:8001/desks", props).then((res) => {
    return res.data;
  });
};

export const getAllDesks = () => {
  return axios.get("http://localhost:8001/desks").then((res) => {
    return res.data;
  });
};
