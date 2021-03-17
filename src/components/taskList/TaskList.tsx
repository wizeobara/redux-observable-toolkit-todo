import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../../state-mgmt/store/system/slice';
import { selectTasks } from '../../state-mgmt/store/system/slice';
import TaskItem from '../taskItem/TaskItem';
import styles from './TaskList.module.scss';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
