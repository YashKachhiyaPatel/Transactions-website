import expess,{ Request, Response, NextFunction } from 'express';
import customer from '../Models/customer';
import business from '../Models/business';
import transaction from '../Models/transaction';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName, UserRole, UserUserName } from '../Util';


export async function DisplayaddcustomerListPage(req: Request, res:Response,next:NextFunction)
{
  const businessCollection = await business.find({ bowner: UserUserName(req) })
  customer.find({bowner: UserUserName(req)}, null, {sort: {name: 1}},function(err,addcustomerCollection){
     if(err){
       return console.error(err);
     }
    
     //printing list
     res.render('owner/customers-list',{title: 'Add Contact', page: 'customers-list',addbusiness:businessCollection, addcustomer: addcustomerCollection, displayName: UserDisplayName(req) })
   }); 
}

// Display (E)dit page
export async function DisplayaddcustomerEditPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
    let id = req.params.id;
    const businessCollection = await business.find({ bowner: UserUserName(req) })

    customer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
    {
       
        if(err)
        {
          req.flash('customerMessage', 'Unable to display customer');
          return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: UserDisplayName(req)   });
   
        }
       
        
        // show the edit view
        res.render('owner/updatecustomer', { title: 'Edit', page: 'updatecustomer', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Process (E)dit page
export function ProcessCustomerEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new customer Item
    let updatedaddcustomerItem = new customer
    ({
      "_id": id,
      "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "bowner": UserUserName(req),
    });
  
    // find the customer item via db.customer.update({"_id":id}) and then update
    customer.updateOne({_id: id}, updatedaddcustomerItem, {}, (err) =>{
      if(err)
      {
        req.flash('customerMessage', 'Unable to display customer');
          return res.render('index', { title: 'customer-error', page: 'error', messages: req.flash('customerMessage'), displayName: UserDisplayName(req)   });
   
      }
  
      res.redirect('/owner/customers-list');
    });
}

// Display (C)reate page
export async function DisplayCustomerAddPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
  try {
    const businessCollection = await business.find({ bowner: UserUserName(req) })
    res.render('owner/updatecustomer', { 
    title: 'Add', 
    page: 'updatecustomer', 
    addcustomer: '', 
    addbusiness: businessCollection,
    displayName: UserDisplayName(req)  });
  } catch  {
    res.redirect('owner/customers-list');
  }
      
}


// Process (C)reate page
export function ProcessCustomerAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new customer
  let newCustomer = new customer
  ({
    "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "bowner": UserUserName(req),
  });

  // db.customer.insert({customer data is here...})
  customer.create(newCustomer, (err) => {
    if(err)
    {
      req.flash('customerAddMessage', 'Unable to display customer');
          return res.render('index', { title: 'customer-add-error', page: 'error', messages: req.flash('customerAddMessage'), displayName: UserDisplayName(req)   });
   
    }

    res.redirect('/owner/customers-list');
  });
}

// Process (D)elete page
export function ProcessCustomerDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.customer.remove({"_id: id"})
  customer.remove({_id: id}, (err) => {
    if(err)
    {
      req.flash('customerDeleteMessage', 'Unable to delete customer');
          return res.render('index', { title: 'customer-delete-error', page: 'error', messages: req.flash('customerDeleteMessage'), displayName: UserDisplayName(req)   });
   
    }

    res.redirect('/owner/customers-list');
  });
}

export function DisplayTransactionHistoryPage(req: Request, res: Response, next: NextFunction): void 
{
  customer.find({bowner: UserUserName(req)}, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
      if (err) {
        return res.redirect('/error');
      }
      res.render('owner/transactionhistory', { title: 'Transaction History', page: 'transactionhistory', addcustomer: addcustomerCollection, displayName: UserDisplayName(req) });
  });
}

//dashboard 
export async function ProcessAddCustomer(req: Request, res: Response, next: NextFunction): Promise<void>
 {
  const businessCollection = await business.find({ bowner: UserUserName(req) })
  
  res.render('owner', { title: 'DashBoard', page: 'index', displayName: UserDisplayName(req),addbusiness: businessCollection, isowner: UserRole(req)  });
}


export async function DisplaySendReminderPage(req: Request, res:Response,next:NextFunction): Promise<void>
{
  let id = req.params.id;

  customer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
  {
     
      if(err)
      {
          console.error(err);
          res.end(err);
      }
    
      // show the edit view
      res.render('owner/reminder', { title: 'Send Reminder', page: 'reminder', addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
  });
}

export async function ProcessSendReminderPage(req: Request, res:Response,next:NextFunction): Promise<void>
{

  const output = ` 
      
      <h3>Your Payment Details:</h3>
      <ul>
      <li><b>Name:</b> ${req.body.custname}</li>
      <li><b>Email:</b> ${req.body.custemail}</li>
      <li><b>Amount:$</b> ${req.body.custamount}</li>
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
      to: req.body.custemail, // list of receivers
      subject: "URGENT (Pay Your Bill)", // Subject line
      text: "Hello World",
      html: output
    };

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            console.log('error');
        } else {
            console.log('success....'+data.response);
            alert('email sent..');
        }
    })

    res.redirect('/owner/customers-list');

}



