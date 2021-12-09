import expess,{ Request, Response, NextFunction } from 'express';
import businessCollection from '../Models/addbusiness';
import Customer from '../Models/addcustomer';
// import Util Functions
import { UserDisplayName, UserUserName } from '../Util';

// DISPLAY customer dashboard
export function DisplayCustomerDashBoardPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('customer', {title: 'Customer Dashboard', page: 'index', displayName: UserDisplayName(req) });
}

// DISPLAY list of all existing businesses
export async function DisplayBusinessListPage(req: Request, res:Response,next:NextFunction)
{

    try{
    
        var customersBusiness=await Customer.find({"custemail":UserUserName(req)},null,{sort:{bowner:1}}).exec();
        var result = customersBusiness.map(it =>  it.get("bowner"));
        var amountList = customersBusiness.map(it =>  it.get("custamount"));
        console.log(amountList);
        var businessList= await  businessCollection.find({ bowner: { $in: result } } , null, {sort:{bowner:1}}).exec();
        console.log(businessList);
        res.render('customer/businesslist',{title: 'List of Businesses', page: 'businesslist',
        amountList:amountList,
         businessCollection: businessList, displayName: UserDisplayName(req) })
    }catch(err){
        return console.error(err);
    }
}

// DISPLAY rate business page
export function DisplayRateBusinessPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    businessCollection.findById(id, {}, {}, (err, businessToRate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the rating page
        res.render('customer/ratebusiness', {title: 'Rate The Business', page: 'ratebusiness', businessCollection: businessToRate, displayName: UserDisplayName(req) });
    });

}

// PROCESS rate business
export function ProcessRateBusiness(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;
    let rating = req.body.rating;    
    
    businessCollection.updateOne(
        {_id: id}, 
        { $inc: { btotalrating: +rating, bnumberofratings: +1 } }, // typescript is giving a false alarm at $inc here because the Model is of type Any, but this code still works 
        {},
        (err) =>
        {
            if (err)
            {
                console.error(err);
                res.end(err);
            }
            res.redirect('/customer/businesslist');
        });
    
}