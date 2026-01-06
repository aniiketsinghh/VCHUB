import express from 'express';
const router = express.Router();

import {
  createIssue,
  updateIssue,
  deleteIssue,
  getAllIssues,
  getIssueById,
} from '../controllers/issue/issue.controller.js';

router.post('/createissue', createIssue);
router.put('/updateissue/:id', updateIssue);
router.delete('/deleteissue/:id', deleteIssue);
router.get('/getallissues', getAllIssues);
router.get('/getissuebyid/:id', getIssueById);

export default router;
