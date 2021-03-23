import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/index';

export interface FileNode {
  _id: string;
  completed: boolean;
  title: string;
  user: string;
  updatedAt: string;
  createdAt: string;
  date: string;
  child?: FileNode[];
  __v?: number;
}

interface selectedTask {
  _id: string;
  title: string;
  completed: boolean;
  user: string;
  date: string;
  child: selectedTask[];
}
interface TaskState {
  date: string;
  isLoading: boolean;
  FileNode: {
    _id: string;
    completed: boolean;
    title: string;
    user: string;
    updatedAt: string;
    createdAt: string;
    date: string;
    child?: FileNode[];
    __v?: number;
  };
  tasks: {
    _id: string;
    title: string;
    completed: boolean;
    date: '';
    child: selectedTask[];
  }[];
  selectedTask: {
    _id: string;
    title: string;
    completed: boolean;
    user: string;
    date: '';
    child: selectedTask[];
  };
  isModalOpen: boolean;
  _id: string;
  title: string;
  completed: boolean;
  user: string;
}

const initialState: TaskState = {
  date: '',
  isLoading: false,
  FileNode: {
    _id: '',
    completed: false,
    title: '',
    user: '',
    updatedAt: '',
    createdAt: '',
    date: '',
    child: [],
    __v: 0,
  },
  tasks: [],
  selectedTask: {
    _id: '',
    title: '',
    completed: false,
    user: '',
    date: '',
    child: [],
  },
  isModalOpen: false,
  _id: '',
  title: '',
  completed: false,
  user: '',
};

function startLoading(state: TaskState) {
  state.isLoading = true;
}

function loadingFailed(state: TaskState) {
  state.isLoading = false;
}

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState as TaskState,
  reducers: {
    start: startLoading,
    fail: loadingFailed,
    switchModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    getInfo: (state, action) => {
      state.user = action.payload;
    },
    getInfoSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    addInfo: (state, action) => {
      // state.title = action.payload;
      return Object.assign({}, state, { title: action.payload });
    },
    addInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    editInfo: (state, action) => {
      return Object.assign({}, state, {
        _id: action.payload._id,
        title: action.payload.title,
      });
    },
    editInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    deleteInfo: (state, action) => {
      state._id = action.payload;
    },
    deleteInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    completeInfo: (state, action) => {
      state._id = action.payload._id;
      state.completed = action.payload.completed;
    },
    completeInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    paramsInfo: (state, action) => {
      state._id = action.payload;
    },
    paramsInfoSuccess: (state, action) => {
      state.FileNode = action.payload.data;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    paramsInfoAdd: (state, action) => {
      state._id = action.payload._id;
      state.title = action.payload.title;
    },
    paramsInfoAddSuccess: (state, action) => {
      console.log(action.payload);
    },
    changeDueDate: (state, action) => {
      state._id = action.payload._id;
      state.date = action.payload.date;
    },
    changeDueDateSuccess: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {
  start,
  fail,
  switchModal,
  getInfo,
  getInfoSuccess,
  addInfo,
  addInfoSuccess,
  editInfo,
  editInfoSuccess,
  deleteInfo,
  deleteInfoSuccess,
  completeInfo,
  completeInfoSuccess,
  paramsInfo,
  paramsInfoSuccess,
  selectTask,
  handleModalOpen,
  paramsInfoAdd,
  paramsInfoAddSuccess,
  changeDueDate,
  changeDueDateSuccess,
} = systemSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] =>
  state.system.tasks;
export const getTaskData = (state: RootState): TaskState['selectedTask'] =>
  state.system.selectedTask;
export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
  state.system.isModalOpen;
export const rooting = (state: RootState): TaskState['FileNode'] =>
  state.system.FileNode;
export default systemSlice.reducer;
