import express from 'express';


import { getUserByEmail, createUser, getUsers, getUserrole } from '../db/auth';
import { randomSeed, authentication } from '../helpers/index';


export const register = async (req: express.Request, res: express.Response) => {
    try {
        
        const { email, password, username, userrole } = req.body;

        if (!email || !password || !username || !userrole) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400);
        }

        const salt = randomSeed();

        const user = await createUser({
            username,
            email,
            userrole,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, userrole } = req.body;

        if (!email || !password || !userrole) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
            

        if(!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403);
        }

        const salt = randomSeed();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('USER-AUTH-TOKEN', user.authentication.sessionToken, {
            domain: 'localhost', path: '/'
        });

        return res.status(200).json(user).end();

        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUserRole = async (req:express.Request, res: express.Response) => {
    try {
        const { id } = req.body;
        const userrole = getUserrole(id);
        return res.status(200).json(userrole);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}