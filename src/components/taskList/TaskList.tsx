import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInfo } from '../../state-mgmt/store/system/slice';
import { selectTasks } from '../../state-mgmt/store/system/slice';
import TaskItem from '../taskItem/TaskItem';
import styles from './TaskList.module.scss';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const username = sessionStorage.getItem('usertoken');

  useEffect(() => {
    dispatch(getInfo(username));
  }, [dispatch, username]);

  const [showState, setShowState] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <button onClick={() => setShowState(0)} className={styles.title}>
          ALL
        </button>
        <button onClick={() => setShowState(2)} className={styles.title}>
          COMPLETE
        </button>
        <button onClick={() => setShowState(1)} className={styles.title}>
          INCOMPLETE
        </button>
      </div>
      {showState === 0
        ? tasks.map((task) => <TaskItem key={task._id} task={task} />)
        : showState === 2
        ? tasks
            .filter((tasks) => tasks.completed === true)
            .map((task) => <TaskItem key={task._id} task={task} />)
        : tasks
            .filter((tasks) => tasks.completed === false)
            .map(
              (task) =>
                !task.completed && <TaskItem key={task._id} task={task} />
            )}
    </div>
  );
};

export default TaskList;
