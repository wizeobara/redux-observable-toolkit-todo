import React from "react";
import TaskList from "../components/taskList/TaskList";
import TaskForm from "../components/taskForm/TaskForm";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
      <Link to ="/sub">Sub Page</Link>
    </div>
  );
};

export default Main;