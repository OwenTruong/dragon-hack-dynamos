import express, { Express } from "express";
import { User } from "../utils/zodtypes";

const router = express.Router();

router.post('/signup', function(req, res, next) {
    try {
        const requestData = User.parse(req.body);

        res.send(req.body);
    }
    catch (error) {
        res.status(400).send('Invalid data!');
    }
});

router.get('/login', function(req, res, next) {
    try {
        const requestData = User.parse(req.body);

        res.send(req.body);
    }
    catch (error) {
        res.status(400).send('Invalid data!');
    }
});

export default router;