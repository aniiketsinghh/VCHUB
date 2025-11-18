import {Routes,Route} from 'react-router';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import Home from './component/dashboard/Dashboard';
import Profile from './component/user/Profile';

import { useAuth } from './context/useContext';


const Router = () => {
    const {user}=useAuth();
    

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/' element={user? <Home/> : <Login/>}/>
            <Route path='/profile' element={user? <Profile/> : <Login/>}/>
        </Routes>
    );
}

export default Router;
