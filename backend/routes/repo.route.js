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
    DeleteRepoById,
    GetStarredReposForCurrentUser,
     GetRepo
} from '../controllers/repo/repo.controller.js';

import Middleware from '../middleware/authentication.middleware.js';

// PUBLIC ROUTES
router.get('/getallrepos', GetAllRepos);
router.get('/getrepobyid/:id', GetRepoById);
router.get('/getrepobyname/:name', GetRepoByName);

// PROTECTED ROUTES
router.use(Middleware);

router.post('/createrepo', CreateRepo);
router.get('/getreposforcurrentuser', GetReposForCurrentUser);
router.get('/getstarredrepos', GetStarredReposForCurrentUser);

router.patch('/togglerepostarbyid/:id', ToggleRepoStarById);
router.put('/updaterepobyid/:id', UpdateRepoById);
router.delete('/deleterepobyid/:id', DeleteRepoById);
router.get('/:reponame/files', GetRepo);

export default router;
