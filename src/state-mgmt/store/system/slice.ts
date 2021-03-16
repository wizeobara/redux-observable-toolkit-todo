import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/index";


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
  selectedTask: { _id: "", title: "", completed: false },
  isModalOpen: false,
  _id: "",
  title: "",
  completed: false,
};

function startLoading(state: TaskState) {
  state.isLoading = true;
}

function loadingFailed(state: TaskState) {
  state.isLoading = false;
}

const systemSlice = createSlice({
  name: "system",
  initialState: initialState as TaskState,
  reducers: {
    switchModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    getInfo: () => {
      console.log("Axios Request")
    },
    getInfoStart: startLoading,
    getInfoSuccess: (state, action) => {
      state.tasks = action.payload;
    },
    getInfoFailed: loadingFailed,
    addInfo: (state, action) => {
      state.title = action.payload;
    },
    addInfoStart: startLoading,
    addInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    addInfoFailed: loadingFailed,
    editInfo: (state, action) => {
      state._id = action.payload._id;
      state.title = action.payload.title;
    },
    editInfoStart: startLoading,
    editInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    editInfoFailed: loadingFailed,
    deleteInfo: (state, action) => {
      state._id = action.payload;
    },
    deleteInfoStart: startLoading,
    deleteInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    deleteInfoFailed: loadingFailed,
    completeInfo: (state, action) => {
      state._id = action.payload._id;
      state.completed = action.payload.completed;
    },
    completeInfoStart: startLoading,
    completeInfoSuccess: (state, action) => {
      console.log(action.payload);
    },
    completeInfoFailed: loadingFailed,
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    handleModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  switchModal,
  getInfo,
  getInfoStart,
  getInfoSuccess,
  getInfoFailed,
  addInfo,
  addInfoStart,
  addInfoSuccess,
  addInfoFailed,
  editInfo,
  editInfoStart,
  editInfoSuccess,
  editInfoFailed,
  deleteInfo,
  deleteInfoStart,
  deleteInfoSuccess,
  deleteInfoFailed,
  completeInfo,
  completeInfoStart,
  completeInfoSuccess,
  completeInfoFailed,
  selectTask,
  handleModalOpen,
} = systemSlice.actions;

export const selectTasks = (state: RootState): TaskState["tasks"] =>
  state.system.tasks;
export const getTaskData = (state: RootState): TaskState["selectedTask"] =>
  state.system.selectedTask;
export const selectIsModalOpen = (state: RootState): TaskState["isModalOpen"] =>
  state.system.isModalOpen;

export default systemSlice.reducer;
