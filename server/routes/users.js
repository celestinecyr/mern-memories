import express from 'express';

import { signin, signup } from '../controllers/user.js';         //must add .js (in react its ok but in node must add)

const router = express.Router();

router.post('/signin', signin);                      
router.post('/signup', signup);

export default router;


/*Line 7-8:
why is this a post route? because we are sending data from login form to the backend
and then backend does sth based on the info --> in this case to sign in the user
*/