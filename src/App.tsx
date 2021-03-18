import React from 'react';
import Main from './pages/Main';
import styles from './App.module.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Header from './components/header/Header';
import Login from './components/login/Login';
import TaskFilter from './components/taskFilter/TaskFilter';

const App: React.FC = () => {
  const token = sessionStorage.getItem('usertoken');

  if (!token) {
    return <Login />;
  }
  
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/sub" component={Home} />
            <Route path="/:id" component={TaskFilter} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};
export default App;
