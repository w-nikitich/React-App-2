import axios from "axios";

export const createList = async (props: any) => {
  const res = await axios.post("http://localhost:8001/lists", props);
  return res.data;
};

export const getAllListsByDeskId = async (deskId: number) => {
  const res = await axios.get(`http://localhost:8001/lists/byDeskId/${deskId}`);
  return res.data;
};

export const getOneList = async (listId: number) => {
  const res = await axios.get(`http://localhost:8001/lists/byId/${listId}`);
  return res.data;
};

export const deleteList = async (listId: number) => {
  const res = await axios.delete(`http://localhost:8001/lists/${listId}`);
  return res.data;
};

export const updateList = async (listId: number, updateData: object) => {
  const res = await axios.patch(
    `http://localhost:8001/lists/${listId}`,
    updateData
  );
  return res.data;
};
