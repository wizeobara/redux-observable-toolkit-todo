import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EditIcon from '@material-ui/icons/Edit';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import TaskForm from '../taskForm/TaskForm';
import {
  selectIsModalOpen,
  deleteInfo,
  completeInfo,
  switchModal,
  selectTask,
  changeDueDate,
} from '../../state-mgmt/store/system/slice';
import styles from './TaskItem.module.scss';

interface PropTypes {
  task: { _id: string; title: string; completed: boolean; date: string };
}


const TaskItem: React.FC<PropTypes> = ({ task }) => {
  const isModalOpen = useSelector(selectIsModalOpen);
  const dispatch = useDispatch();

  const today = new Date()
  const todayDate = moment(today).format('YYYY-MM-DD')
  

  const handleOpen = () => {
    dispatch(selectTask(task));
    dispatch(switchModal(true));
  };

  const handleClose = () => {
    dispatch(switchModal(false));
  };

  const completeTask = () => {
    const newComplete = { _id: task._id, completed: !task.completed };
    dispatch(completeInfo(newComplete));
  };

  const deleteTask = () => {
    const newDelete = task._id;
    dispatch(deleteInfo(newDelete));
  };

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <EventNoteIcon />
        <Link to={task._id} className={styles.title_text}>
          <button
            className={styles.title_button}
            onClick={() => dispatch(selectTask(task._id))}>
            {task.title}
          </button>
        </Link>
      </div>
      <div className={styles.right_item}>   
        <div className={todayDate.replace(/-/g, '') > task.date.replace(/-/g,'') ? styles.yabai: todayDate.replace(/-/g, '') === task.date.replace(/-/g,'')? styles.yaba : styles.mada}>
          <p className={styles.date_label}>Due:</p>
          <DatePicker
            selected={new Date(task.date)}
            onChange={(date: Date) =>
              dispatch(
                changeDueDate({
                  date: moment(date).format('YYYY-MM-DD'),
                  _id: task._id,
                })
              )
            }
          />
        </div>
        <Checkbox
          checked={task.completed}
          onClick={() => completeTask()}
          className={styles.checkbox}
        />
        <button onClick={handleOpen} className={styles.edit_button}>
          <EditIcon className={styles.icon} />
        </button>
        <button onClick={() => deleteTask()} className={styles.delete_button}>
          <DeleteForeverIcon className={styles.icon} />
        </button>
      </div>
      <Modal
        className={styles.modal}
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={styles.modal_content}>
          <h3 className={styles.modal_title}>EDIT TASK</h3>
          <TaskForm edit />
        </div>
      </Modal>
    </div>
  );
};

export default TaskItem;
