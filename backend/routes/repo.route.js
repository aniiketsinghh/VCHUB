import express from 'express';
const router = express.Router();

import {
    CreateRepo,
    GetAllRepos,
    GetRepoById,
    GetRepoByName,
    GetReposForCurrentUser,
    ToggleRepoStarById,
    UpdateRepoById,
    DeleteRepoById
} from '../controllers/repo/repo.controller.js';

import Middleware from '../middleware/authentication.middleware.js';

router.use(Middleware);

router.post('/createrepo', CreateRepo);
router.get('/getallrepos', GetAllRepos);
router.get('/getrepobyid/:id', GetRepoById);
router.get('/getrepobyname/:name', GetRepoByName);

// FIXED — removed :id
router.get('/getreposforcurrentuser', GetReposForCurrentUser);

router.patch('/togglerepostarbyid/:id', ToggleRepoStarById);
router.put('/updaterepobyid/:id', UpdateRepoById);
router.delete('/deleterepobyid/:id', DeleteRepoById);

export default router;
