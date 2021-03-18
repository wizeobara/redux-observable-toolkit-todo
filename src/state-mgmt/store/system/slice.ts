import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/index';

interface TaskState {
  isLoading: boolean;
  tasks: { _id: string; title: string; completed: boolean }[];
  selectedTask: { _id: string; title: string; completed: boolean };
  isModalOpen: boolean;
  _id: string;
  title: string;
  completed: boolean;
  user: string;
}

const initialState: TaskState = {
  isLoading: false,
  tasks: [],
  selectedTask: { _id: '', title: '', completed: false },
  isModalOpen: false,
  _id: '',
  title: '',
  completed: false,
  user:''
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
    getInfo: (state,action) => {
      state.user = action.payload;
    },
    getInfoSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    addInfo: (state, action) => {
      state.title = action.payload;
    },
    addInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    editInfo: (state, action) => {
      state._id = action.payload._id;
      state.title = action.payload.title;
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
      state.selectedTask = action.payload.data;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
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
} = systemSlice.actions;

export const selectTasks = (state: RootState): TaskState['tasks'] =>
  state.system.tasks;
export const getTaskData = (state: RootState): TaskState['selectedTask'] =>
  state.system.selectedTask;
export const selectIsModalOpen = (state: RootState): TaskState['isModalOpen'] =>
  state.system.isModalOpen;

export default systemSlice.reducer;
