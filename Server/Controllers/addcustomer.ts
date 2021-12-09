import expess,{ Request, Response, NextFunction } from 'express';
import addcustomer from '../Models/addcustomer';
import addbusiness from '../Models/addbusiness';
import transaction from '../Models/transaction';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName, UserRole, UserUserName } from '../Util';

export async function DisplayaddcustomerListPage(req: Request, res:Response,next:NextFunction)
{
  const businessCollection = await addbusiness.find({ bowner: UserUserName(req) })
   addcustomer.find({bowner: UserUserName(req)}, null, {sort: {name: 1}},function(err,addcustomerCollection){
     if(err){
       return console.error(err);
     }
    
     //printing list
     res.render('owner/addcustomer',{title: 'Add Contact', page: 'addcustomer',addbusiness:businessCollection, addcustomer: addcustomerCollection, displayName: UserDisplayName(req) })
   }); 
  // transaction.aggregate([ { $group: { _id: "$customerid", TotalSum: { $sum: "$amount" } } },{
  //   $project: {
  //       _id: 0
  //   }
  //   } ]);


  // addcustomer.aggregate([     
  //     { '$sort': { 'custname': 1} }, 
  //     { '$lookup':         
  //       {           
  //         'from': 'addbusiness',
  //         'localField': 'businessname',
  //         'foreignField': '_id',
  //         'as': 'business'
  //       }
  //     }     
  //   ]).exec(function(err, result){
  //     if(err){
  //       return res.redirect('/error');
  //     }
  
    //   res.render('owner/addcustomer', {title: 'Add Contact', page: 'addcustomer', addcustomer: result, displayName: UserDisplayName(req), isowner: UserRole(req) });
    // });
}

// Display (E)dit page
export async function DisplayaddcustomerEditPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
    let id = req.params.id;
    const businessCollection = await addbusiness.find({ bowner: UserUserName(req) })

    addcustomer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
    {
       
        if(err)
        {
            console.error(err);
            return res.redirect('/error');
        }
       
        console.log(addcustomer);
        // show the edit view
        res.render('owner/update', { title: 'Edit', page: 'update', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Process (E)dit page
export function ProcessCustomerEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new customer Item
    let updatedaddcustomerItem = new addcustomer
    ({
      "_id": id,
      "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "bowner": UserUserName(req),
    });
  
    // find the customer item via db.customer.update({"_id":id}) and then update
    addcustomer.updateOne({_id: id}, updatedaddcustomerItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        return res.redirect('/error');
      }
  
      res.redirect('/owner/addcustomer');
    });
}

// Display (C)reate page
export async function DisplayCustomerAddPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
  try {
    const businessCollection = await addbusiness.find({ bowner: UserUserName(req) })
    res.render('owner/update', { 
    title: 'Add', 
    page: 'update', 
    addcustomer: '', 
    addbusiness: businessCollection,
    displayName: UserDisplayName(req)  });
  } catch  {
    res.redirect('owner/addcustomer');
  }
      
}


// Process (C)reate page
export function ProcessCustomerAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new customer
  let newCustomer = new addcustomer
  ({
    "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "bowner": UserUserName(req),
  });

  // db.customer.insert({customer data is here...})
  addcustomer.create(newCustomer, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addcustomer');
  });
}

// Process (D)elete page
export function ProcessCustomerDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.customer.remove({"_id: id"})
  addcustomer.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      return res.redirect('/error');
    }

    res.redirect('/owner/addcustomer');
  });
}

export function DisplayTransactionHistoryPage(req: Request, res: Response, next: NextFunction): void 
{
  addcustomer.find({bowner: UserUserName(req)}, null, { sort: { name: 1 } }, function (err, addcustomerCollection) {
      if (err) {
        return res.redirect('/error');
      }
      res.render('owner/transactionhistory', { title: 'Transaction History', page: 'transactionhistory', addcustomer: addcustomerCollection, displayName: UserDisplayName(req) });
  });
}

//dashboard 
export async function ProcessAddCustomer(req: Request, res: Response, next: NextFunction): Promise<void>
 {
  const businessCollection = await addbusiness.find({ bowner: UserUserName(req) })
  
  res.render('owner', { title: 'DashBoard', page: 'index', displayName: UserDisplayName(req),addbusiness: businessCollection, isowner: UserRole(req)  });
}


export async function DisplaySendReminderPage(req: Request, res:Response,next:NextFunction): Promise<void>
{
  let id = req.params.id;

  addcustomer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
  {
     
      if(err)
      {
          console.error(err);
          res.end(err);
      }
     
      console.log(addcustomer);
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

    res.redirect('/owner/addcustomer');

}



