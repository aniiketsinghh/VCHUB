import express from 'express';
const router=express.Router();

import {CreateRepo,GetAllRepos,GetRepoById,GetRepoByName,GetReposForCurrentUser,ToggleRepoStarById,UpdateRepoById,DeleteRepoById} from '../controllers/repo/repo.controller.js';

router.post('/createrepo',CreateRepo);
router.get('/getallrepos',GetAllRepos);
router.get('/getrepobyid/:id',GetRepoById);
router.get('/getrepobyname/:name',GetRepoByName);
router.get('/getreposforcurrentuser/:userID',GetReposForCurrentUser);
router.patch('/togglerepostarbyid/:id',ToggleRepoStarById);
router.put('/updaterepobyid/:id',UpdateRepoById);
router.delete('/deleterepobyid/:id',DeleteRepoById);

export default router;