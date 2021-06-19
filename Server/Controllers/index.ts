import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';
// create an instance of the User Model
import User from '../Models/user';
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

//Authentication

// Authentication functions
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }
    
    return res.redirect('/contacting-list');
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
        req.flash('loginMessage', 'Authentication Error');
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

        return res.redirect('/contacting-list');
    });
   })(req, res, next);
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
   req.logout();

   res.redirect('/login');
}

