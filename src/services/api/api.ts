import axios from 'axios';
const URL_BASE = 'http://localhost:7000/progress/';

//Changed Get => Put since sending body
export const getInfoReq = async (args: string) =>
  axios.put(URL_BASE, { user: args });

export const addInfoReq = async (args: {
  title: string;
  completed: boolean;
  user: string;
}) => axios.post(URL_BASE, args);

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

export const paramsInfoReq = async (args: string) => axios.get(URL_BASE + args);

export const paramsInfoAddReq = async (args: {
  user: string;
  _id: string;
  title: string;
}) =>
  axios.post(URL_BASE + args._id, {
    child: {
      user: args.user,
      title: args.title,
      completed: false,
    },
  });

export const changeDueDateReq = async (args: {
  _id: string;
  date: string;
}) =>
  axios.post(URL_BASE + 'date/' + args._id, {
    date: args.date,
  });
