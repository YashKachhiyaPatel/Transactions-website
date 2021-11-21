import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
// create an instance of the User Model
import User from '../Models/user';

import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName } from '../Util';

// Display Functions

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'About Us', page: 'about', displayName: UserDisplayName(req)  });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req)  });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Our Services', page: 'services' , displayName: UserDisplayName(req) });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req)  });
}

export async function ProcessContactPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
    const output = ` 
      <p>You have new User Request</p>
      <h3>User Details:</h3>
      <ul>
      <li><b>Name:</b> ${req.body.fullName}</li>
      <li><b>Email:</b> ${req.body.email}</li>
      <li><b>Phone Number:</b> ${req.body.phone}</li>
      <li><b>Message:</b> ${req.body.message}</li>
       </ul>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: 'transactionappg3s4@gmail.com', // generated ethereal user
          pass: 'transaction@123', // generated ethereal password
        }
      });
    
      // send mail with defined transport object
      let mailOptions = {
        from: 'transactionappg3s4@gmail.com', // sender address
        to: 'transactionappg3s4@gmail.com', // list of receivers
        subject: "Node Testing...", // Subject line
        text: "Hello World",
        html: output
      };

      transporter.sendMail(mailOptions, function(err, data){
          if(err){
              console.log('error');
          } else {
              console.log('success....'+data.response);
          }
      })

      res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

//Authentication

// Authentication functions
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }
    
    return res.redirect('/owner');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
   passport.authenticate('local', (err, user, info) => 
   {
    // are there any server errors?
    if(err)
    {
        console.error(err);
        return next(err);
    }

    // are there any login errors?
    if(!user)
    {
        req.flash('loginMessage', 'UnAuthenticated Information');
        return res.redirect('/login');
    }

    req.login(user, (err) => 
    {
        // are there db errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        return res.redirect('/owner');
    });
   })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req)   });
    }

    return res.redirect('/owner');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
   // instantiate a new User Object
   let newUser = new User
   ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName,
        isowner: req.body.isowner
   });

   User.register(newUser, req.body.password, (err) =>
   {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        // after successful registration - login the user
        return passport.authenticate('local')(req, res, () => 
        {
            return res.redirect('/owner');
        });
   });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
   req.logout();

   res.redirect('/login');
}

