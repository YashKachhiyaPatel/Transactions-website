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

export function UserUserName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.username.toString();
    }
    return '';
}


export function UserRole(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.isowner.toString();
    }
    return '';
}

export function UserIsOwner(req: Request): boolean
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        if(user.isowner.toString().toLowerCase() == "owner")
            return true;
    }
    return false;
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}