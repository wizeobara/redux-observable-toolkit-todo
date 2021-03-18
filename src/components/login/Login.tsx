import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login} from '../../state-mgmt/store/login/slice';
import styles from './Login.module.scss';

type Inputs = {
  username: string;
};
const Login: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleLogin = (data: Inputs) => {
    const newUser = data.username;
    dispatch(login(newUser));
    window.location.reload();
  };

  return (
    <div className={styles.root}>
      <h2>Login To Continue...</h2>
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        <TextField
          label={'USERNAME'}
          defaultValue={''}
          variant="outlined"
          inputRef={register}
          name="username"
          className={styles.text_field}
        />
        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
