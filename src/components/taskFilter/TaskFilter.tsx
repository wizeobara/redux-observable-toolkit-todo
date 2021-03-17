import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  paramsInfo,
  getTaskData,
  editInfo,
  completeInfo,
} from '../../state-mgmt/store/system/slice';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './TaskFilter.module.scss';

type TaskFilterProps = RouteComponentProps<{ id: string }>;

type Inputs = {
  _id: string;
  taskTitle: string;
};
const TaskFilter: React.FC<TaskFilterProps> = (props) => {
  const dispatch = useDispatch();
  const task = useSelector(getTaskData);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(paramsInfo(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const handleEdit = (data: Inputs) => {
    const sendInput = { _id: props.match.params.id, title: data.taskTitle };
    dispatch(editInfo(sendInput));
  };

  const completeTask = () => {
    const newComplete = { _id: task._id, completed: !task.completed };
    dispatch(completeInfo(newComplete));
  };

  return (
    <section className={styles.root}>
      <div className={styles.task}>
        <form onSubmit={handleSubmit(handleEdit)}>
          <TextField
            label={'EDIT TASK'}
            defaultValue={task.title}
            variant="outlined"
            inputRef={register}
            name="taskTitle"
          />
        </form>
        <Checkbox checked={task.completed} onClick={() => completeTask()} />
      </div>
      <Link to="/">Home</Link>
    </section>
  );
};

export default TaskFilter;