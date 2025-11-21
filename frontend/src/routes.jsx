import { Routes, Route, Navigate } from 'react-router';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import Home from './component/dashboard/Dashboard';
import CreateRepo from './component/repo/CreateRepo';
import FetchRepo from './component/repo/AllRepos';
import RepoDetails from './component/repo/DetailsRepo';
import Profile from './component/user/Hello';
import SettingsPage from './Setting';
import StarredRepos from './component/repo/AllStar';
import { useAuth } from './context/useContext';

const Router = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes (redirect if logged in) */}
      <Route
        path="/login"
        element={ user ? <Navigate to="/" /> : <Login /> }
      />
      <Route
        path="/signup"
        element={ user ? <Navigate to="/" /> : <Signup /> }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={ user ? <Home /> : <Navigate to="/login" /> }
      />

      <Route
        path="/profile"
        element={ user ? <Profile /> : <Navigate to="/login" /> }
      />

      <Route
        path="/settings"
        element={ user ? <SettingsPage /> : <Navigate to="/login" /> }
      />

      <Route
        path="/createrepo"
        element={ user ? <CreateRepo /> : <Navigate to="/login" /> }
      />

      <Route
        path="/getallrepos"
        element={ user ? <FetchRepo /> : <Navigate to="/login" /> }
      />

      <Route
        path="/getrepo/:id"
        element={ user ? <RepoDetails /> : <Navigate to="/login" /> }
      />

      {/* All similar protected routes */}
      <Route
        path="/updaterepobyid/:id"
        element={ user ? <Home /> : <Navigate to="/login" /> }
      />
      <Route
        path="/toggleuserstarbyid/:id"
        element={ user ? <Home /> : <Navigate to="/login" /> }
      />
      <Route
        path="/deleterepobyid/:id"
        element={ user ? <Home /> : <Navigate to="/login" /> }
      />

      <Route
        path="/getstarredrepos"
        element={ user ? <StarredRepos /> : <Navigate to="/login" /> }
      />

    </Routes>
  );
};

export default Router;
