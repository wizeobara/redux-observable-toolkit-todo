import React from 'react';
import TaskList from '../../components/taskList/TaskList';
import TaskForm from '../../components/taskForm/TaskForm';
import { Link } from 'react-router-dom';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
      <Link to="/sub" className={styles.link}>SUB PAGE..</Link>
    </div>
  );
};

export default Main;
