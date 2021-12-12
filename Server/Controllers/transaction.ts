import expess,{ Request, Response, NextFunction } from 'express';
import customer from '../Models/customer';
import addbusiness from '../Models/business';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName, UserRole, UserUserName } from '../Util';
import transaction from '../Models/transaction';


// Display Transaction page
export  async function DisplayTransactionAddPage(req: Request, res: Response, next: NextFunction)
{
  try {
    const customerCollection = await customer.find({})
    res.render('owner/transaction', { 
    title: 'Add', 
    page: 'transaction', 
    customer: customerCollection,
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

   let id = req.params.customerid;

    // instantiate a new customer Item
    let updatedaddcustomerItem = new customer
    ({
      "_id": id,
      "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": finalAmount,
      "bowner": UserUserName(req),
    });
  
    // find the customer item via db.customer.update({"_id":id}) and then update
    customer.updateOne({_id: id}, updatedaddcustomerItem, {}, (err) =>{
      if(err)
      {
        req.flash('customerMessage', 'Unable to display customer');
          return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: UserDisplayName(req)   });
   
      }
  
    });

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
    res.redirect('/owner/customers-list');
  });
}

