import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  paramsInfo,
  editInfo,
  completeInfo,
  deleteInfo,
  FileNode,
  rooting,
  paramsInfoAdd,
} from '../../state-mgmt/store/system/slice';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import styles from './TaskFilter.module.scss';

const File: React.FC<FileNode> = ({
  _id,
  child,
  title,
  completed,
  user,
}: FileNode) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(paramsInfo(id));
  }, [dispatch, id]);

  const [showChildren, setShowChildren] = useState<boolean>(false);
  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren, setShowChildren]);

  const { register, handleSubmit } = useForm();
  const handleEdit = () => {
    const sendInput = { _id: _id, title: input };
    dispatch(editInfo(sendInput));
  };

  const completeTask = () => {
    const newComplete = { _id: _id, completed: !completed };
    dispatch(completeInfo(newComplete));
  };

  const deleteTask = () => {
    const newDelete = _id;
    dispatch(deleteInfo(newDelete));
    window.location.replace('/');
  };

  const [input, setInputTodo] = useState('');
  const inputForm = useRef<HTMLInputElement | null>(null);
  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setInputTodo(event.target.value);
    },
    []
  );

  const handleChild = () => {
    const newChild = { _id: _id, title: input, user: user };
    input.length > 0 ? dispatch(paramsInfoAdd(newChild)) : null;
  };

  return (
    <div>
      <span>
        <h4
          onClick={handleClick}
          style={{ fontWeight: showChildren ? 'bold' : 'normal' }}>
          {title}
        </h4>
        <section className={styles.root}>
          <div className={styles.task}>
            <form onSubmit={handleSubmit(handleEdit)}>
              <TextField
                label={'EDIT or ADD TASK'}
                defaultValue={title}
                variant="outlined"
                inputRef={register}
                name="taskTitle"
                ref={inputForm}
                onChange={handleInput}
              />
            </form>
            <Checkbox checked={completed} onClick={() => completeTask()} />
            <button
              onClick={() => deleteTask()}
              className={styles.delete_button}>
              <DeleteForeverIcon className={styles.icon} />
            </button>
            <form
              onClick={handleSubmit(handleChild)}
              className={styles.delete_button}>
              <AddCircleIcon className={styles.add} />
            </form>
          </div>
        </section>
      </span>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          left: 25,
          borderLeft: '1px solid',
          paddingLeft: 15,
        }}>
        {showChildren &&
          (child ?? []).map((node: FileNode) => <File key={_id} {...node} />)}
      </div>
    </div>
  );
};

function TaskFilter(): JSX.Element {
  const root = useSelector(rooting);

  return (
    <div className={styles.filterbox}>
      <File {...root} />
      <Link to="/" className={styles.home}>
        Go Back...
      </Link>
    </div>
  );
}

export default TaskFilter;
