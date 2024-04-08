import axios from "axios";

export const createTask = async (props: any) => {
  const res = await axios.post("http://localhost:8001/tasks", props);
  return res.data;
};

export const getAllTasksByListId = async (listId: number) => {
  const res = await axios.get(`http://localhost:8001/tasks/byListId/${listId}`);
  return res.data;
};

export const getAllTasks = async () => {
  const res = await axios.get(`http://localhost:8001/tasks`);
  return res.data;
};
