import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleLogout } from '../../features/login/loginSlice';

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleLogout());
  }, [dispatch]);


  return <Redirect exact to='/login' />
}

export default Logout
