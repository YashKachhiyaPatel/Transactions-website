import expess,{ Request, Response, NextFunction } from 'express';
import addcustomer from '../Models/addcustomer';
import addbusiness from '../Models/addbusiness';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName, UserRole, UserUserName } from '../Util';
import transaction from '../Models/transaction';


// Display Transaction page
export  async function DisplayTransactionAddPage(req: Request, res: Response, next: NextFunction)
{
  try {
    const customerCollection = await addcustomer.find({})
    res.render('owner/transaction', { 
    title: 'Add', 
    page: 'transaction', 
    addcustomer: customerCollection,
    displayName: UserDisplayName(req)  });
  } catch  {
    res.redirect('owner/transaction');
  }
      
}


// Process Transaction page
export function ProcessTransactionAddPage(req: Request, res: Response, next: NextFunction): void
{
   var finalAmount = req.body.amount;
   if(req.body.type == "debit"){
     finalAmount = finalAmount * -1;
   }

  // instantiate a new customer
  let newTransaction = new transaction
  ({
    "customerid": req.body.customerid,
      "type": req.body.type,
      "amount": finalAmount
  });

  // db.customer.insert({customer data is here...})
  transaction.create(newTransaction, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    res.redirect('/owner/addcustomer');
  });
}

