import expess,{ Request, Response, NextFunction } from 'express';
import addcustomer from '../Models/addcustomer';
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

// Display (E)dit page
export function DisplayaddcustomerEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    addcustomer.findById(id, {}, {}, (err, addcustomerItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('owner/update', { title: 'Update', page: 'update', addcustomer: addcustomerItemToEdit, displayName: UserDisplayName(req) });
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
      "custamount": req.body.custamount
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
export function DisplayCustomerAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('owner/update', { title: 'Add', page: 'update', addcustomer: '', displayName: UserDisplayName(req)  });
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
      "custamount": req.body.custamount
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
  res.render('owner', { title: 'Contact Us', page: 'addcustomer', displayName: UserDisplayName(req)  });
}
