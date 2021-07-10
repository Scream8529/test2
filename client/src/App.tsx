import React from 'react';
import { Redirect, Route, NavLink } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Post from './components/Post/Post';
import Posts from './components/Posts/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializationTC } from './store/store';


function App() {
  const dispatch = useDispatch()
  const isInit = useSelector((state: any) => state.isInit)
  useEffect(() => {
    dispatch(initializationTC())
  }, [])
  

  if (!isInit) {
    return <Loader />
  }

  return (
    <div className="App">
      <nav className="blue lighten-1">
        <div className="nav-wrapper ">
          <NavLink to="/posts" className="brand-logo">GOODBIT</NavLink>
        </div>
      </nav>
      <div className='mainContent'>
        <Route path='/posts' exact render={() => (<Posts />)} />
        <Route path='/posts/:id' render={() => (<Post />)} />
        <Redirect to='/posts' />
      </div>

    </div>
  );
}

export default App;
