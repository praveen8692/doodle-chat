import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Messaging from "./screens/Messaging";
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import Login from "./screens/Login";
import {userLoggedIn} from "./store/user/actions";
import {STORAGE_KEYS} from "./constants";

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    height: '100vh'
  },
  paper: {
    backgroundColor: '#424242'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '75vh'
  },
}

const App = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.user.token)

  useEffect(() => {
    const storedToken = window.localStorage.getItem(STORAGE_KEYS.token)
    if (storedToken) {
      const storedUser = window.localStorage.getItem(STORAGE_KEYS.username)
      dispatch(userLoggedIn(storedUser, storedToken))
    }
  }, [dispatch])

  return <div style={styles.root}>
    <Container maxWidth="sm">
      <Paper style={styles.paper}>
        <Box style={styles.container}>
          {!token && <Login/>}
          {token && <Messaging/>}
        </Box>
      </Paper>
    </Container>
  </div>;
}

export default hot(module)(App);
