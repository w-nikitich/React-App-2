import axios from "axios";

export const createList = async (props: any) => {
  const res = await axios.post("http://localhost:8001/lists", props);
  return res.data;
};

export const getAllListsByDeskId = async (deskId: number) => {
  const res = await axios.get(`http://localhost:8001/lists/byDeskId/${deskId}`);
  return res.data;
};
