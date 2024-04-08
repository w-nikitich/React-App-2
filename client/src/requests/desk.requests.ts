import axios from "axios";

export const createdDesk = async (props: any) => {
  const res = await axios.post("http://localhost:8001/desks", props);
  return res.data;
};

export const getAllDesks = async () => {
  const res = await axios.get("http://localhost:8001/desks");
  return res.data;
};

export const getOneDesk = async (id: number) => {
  const res = await axios.get(`http://localhost:8001/desks/${id}`);
  return res.data;
};
