import express, { Request, Response, NextFunction } from 'express';

import * as DBConfig from '../Config/db';

export function UserDisplayName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

export function AuthOwner(req: Request, res: Response, next: NextFunction): void
{
    let newuser = req.user as UserDocument; 

    if((newuser.isowner).toString() === "customer")
    {
        return res.redirect('/home');
    }
    else{
        return res.redirect('/owner');
    }
    next();
}

