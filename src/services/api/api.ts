import axios from 'axios';
const URL_BASE = 'http://localhost:7000/progress/';

export const getInfoReq = () => axios.get(URL_BASE);

export const addInfoReq = async (args: { title: string; completed: boolean }) =>
  axios.post(URL_BASE, args);

export const completeInfoReq = async (args: {
  _id: string;
  completed: boolean;
}) =>
  axios.post(URL_BASE + 'complete/' + args._id, {
    completed: args.completed,
  });

export const deleteInfoReq = async (args: string) =>
  axios.delete(URL_BASE + args);

export const editInfoReq = async (args: { _id: string; title: string }) =>
  axios.post(URL_BASE + 'update/' + args._id, {
    title: args.title,
  });
