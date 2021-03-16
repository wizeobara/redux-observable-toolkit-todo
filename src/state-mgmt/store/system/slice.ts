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
}

const initialState: TaskState = {
  isLoading: false,
  tasks: [],
  selectedTask: { _id: '', title: '', completed: false },
  isModalOpen: false,
  _id: '',
  title: '',
  completed: false,
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
    getInfo: () => {
      console.log('Axios Request');
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
