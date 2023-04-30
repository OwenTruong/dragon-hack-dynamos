import express, { Express } from "express";
import { User } from "../utils/zodtypes";

const router = express.Router();

router.post('/signup', function(req, res, next) {
    //TODO: No need to use a database for this, just return dummy info
    try {
        User.parse(req.body);
        res.render('signup');
    }
    catch (error) {
        res.status(400).send('Invalid data!')
    }
});

router.get('/login', function(req, res, next) {
    try {
        User.parse(req.body);
        res.render('login');
    }
    catch (error) {
        res.status(400).send('Invalid data!')
    }
});

export default router;