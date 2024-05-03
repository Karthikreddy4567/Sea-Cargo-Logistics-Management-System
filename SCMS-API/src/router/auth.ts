import express from 'express';

import { login, register,  getAllUsers, getUserRole} from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';

export default (router: express.Router) => {
    router.post('/auth/login', login);
    router.post('/auth/register', register);
    router.get('/users',isAuthenticated,getAllUsers);
    router.get('/userrole',isAuthenticated,getUserRole);
};