import React from "react"
import Main from "./pages/Main";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <Main />
        </div>
      </div>
  );
};
export default App;
