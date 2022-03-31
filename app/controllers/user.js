//here is where we put the complex logix of signing in and up for user(s)
import bcrypt from "bcryptjs";                  //bycrypt is used to hash password
import jwt from "jsonwebtoken";

import UserModal from '../models/userModal.js';

const secret = 'test';

export const signin = async(req, res) => {
    //get the email and password from frontend - how?
    //whenever there's a post request we get all the data through the request.body
    const {email, password} = req.body;

    //since we're in async block,do a try catch
    try{
       //if we're signing in we need to find if its existing user:
       const existingUser = await UserModal.findOne({ email });       //find user by email
       //if no existing user..
       if(!existingUser) return res.status(404).json({ message: "User does not exist." });
       //if user exists..
       const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
       //if password incorrect..
       if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials"});
       //if user exist & password correct then we need user's jwt --> need to send frontend
       const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret,  {expiresIn: "1h"});          
        //argu 1 - in here we want to provide all the infowe want to store in the token; i.e. email 
        //argu 2 - secret --> instead of secret we need to have secert string that only we know. usually its placed separately in an env fle where we store all our variables where no one else can see
        //argu 3 - option
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async(req, res) => {
    const { email, password, confirmPassword, firstName, lastName }= req.body;

    try{
        const existingUser = await UserModal.findOne({ email })              //find existing user

        if(existingUser) return res.status(404).json({ message: "User already exist." });
        //and if !existingUser is true, then are pwd the same?
        if(password != confirmPassword) return res.status(404).json({ message: "Passwords do not match" });
        
        //if no existingUser, and pwd matches, we go ahead to hash the pwd before creating user
        const hashedPassword = await bcrypt.hash(password, 12);          //argu 2 = salt ; i.e the level of difficulty you want to use to hash your password 

        const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });     //create user - name is in template string
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test',  {expiresIn: "1h"});   
               
        res.status(200).json({ result, token });
    } catch(error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};