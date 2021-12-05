import expess,{ Request, Response, NextFunction } from 'express';
import addcustomer from '../Models/addcustomer';
import addbusiness from '../Models/addbusiness';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
// import Util Functions
import { UserDisplayName } from '../Util';

export function DisplayaddcustomerListPage(req: Request, res:Response,next:NextFunction): void
{
  
    addcustomer.find({}, null, {sort: {name: 1}},function(err,addcustomerCollection){
        if(err){
            return console.error(err);
        }
        
        //printing list
        res.render('owner/addcustomer',{title: 'Add Contact', page: 'addcustomer', addcustomer: addcustomerCollection, displayName: UserDisplayName(req) })
    }); 
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
      <p>You have new User Request</p>
      <h3>User Details:</h3>
      <ul>
      <li><b>Name:</b> ${req.body.custname}</li>
      <li><b>Email:</b> ${req.body.custemail}</li>
      <li><b>Amount:</b> ${req.body.custamount}</li>
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
    
    res.redirect('/owner/addcustomer');

}

// Display (E)dit page
export async function DisplayaddcustomerEditPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
    let id = req.params.id;
    const businessCollection = await addbusiness.find({})

    addcustomer.findById(id, {}, {}, async (err, addcustomerItemToEdit) => 
    {
       
        if(err)
        {
            console.error(err);
            res.end(err);
        }
       
        console.log(addcustomer);
        // show the edit view
        res.render('owner/update', { title: 'Update', page: 'update', addbusiness: businessCollection, addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Process (E)dit page
export function ProcessCustomerEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Clothing Item
    let updatedaddcustomerItem = new addcustomer
    ({
      "_id": id,
      "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "businessname": req.body.businessname
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    addcustomer.updateOne({_id: id}, updatedaddcustomerItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/owner/addcustomer');
    });
}

// Display (C)reate page
export async function DisplayCustomerAddPage(req: Request, res: Response, next: NextFunction): Promise<void>
{
  try {
    const businessCollection = await addbusiness.find({})
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
  // instantiate a new Clothing
  let newCustomer = new addcustomer
  ({
    "custname": req.body.custname,
      "custnumber": req.body.custnumber,
      "custemail": req.body.custemail,
      "custamount": req.body.custamount,
      "businessname": req.body.businessname
  });

  // db.clothing.insert({clothing data is here...})
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

  // db.clothing.remove({"_id: id"})
  addcustomer.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addcustomer');
  });
}

//dashboard to customer list
export function ProcessAddCustomer(req: Request, res: Response, next: NextFunction): void
 {
  res.render('owner', { title: 'Customer', page: 'addcustomer', displayName: UserDisplayName(req)  });
}
