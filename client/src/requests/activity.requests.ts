import axios from "axios";

export const createActivityLog = async (props: any) => {
  const res = await axios.post("http://localhost:8001/activityLogs", props);
  return res.data;
};

export const getAllLogs = async () => {
  const res = await axios.get("http://localhost:8001/activityLogs");
  return res.data;
};

export const getLogsByTaskId = async (taskId: number) => {
  const res = await axios.get(`http://localhost:8001/activityLogs/${taskId}`);
  console.log(res);
  return res.data;
};
