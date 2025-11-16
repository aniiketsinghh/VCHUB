import express from 'express';
const router=express.Router();

import {Signup,Login,GetAllUsers,GetUserProfile,UpdateUserProfile,DeleteUserProfile} from '../controllers/user/user.controller.js';

router.post('/signup',Signup);
router.post('/login',Login);
router.get('/getallusers',GetAllUsers);
router.get('/profile',GetUserProfile);
router.put('/updateprofile',UpdateUserProfile);
router.delete('/deleteprofile',DeleteUserProfile);

export default router;
