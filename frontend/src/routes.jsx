import {Routes,Route} from 'react-router';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import Home from './component/dashboard/Dashboard';
import Profile from './component/user/Profile';
import CreateRepo from './component/repo/CreateRepo';
import FetchRepo from './component/repo/AllRepos';
import RepoDetails from './component/repo/DetailsRepo';

import { useAuth } from './context/useContext';


const Router = () => {
    const {user}=useAuth();
    

    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/' element={user? <Home/> : <Login/>}/>
            <Route path='/profile' element={<Profile/> }/>
             <Route path='/createrepo' element={user? <CreateRepo/> : <Login/>}/>
             <Route path='/getallrepos' element={user? <FetchRepo/> : <Login/>}/>
             <Route path='/getrepo/:id' element={user? <RepoDetails/> : <Login/>}/>
             <Route path='/getrepoforcurrentuser/:id' element={user? <Home/> : <Login/>}/>
            <Route peth="/updaterepobyid/:id" element={user? <Home/> : <Login/>}/>
            <Route path="/deleterepobyid/:id" element={user? <Home/> : <Login/>}/>
            <Route path="/togglerepostarbyid/:id" element={user? <Home/> : <Login/>}/>
        </Routes>
    );
}

export default Router;
