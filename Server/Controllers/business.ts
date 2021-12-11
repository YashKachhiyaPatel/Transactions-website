import expess,{ Request, Response, NextFunction } from 'express';
import business from '../Models/business';
// import Util Functions
import { UserDisplayName, UserUserName } from '../Util';

export function DisplayaddBusinessListPage(req: Request, res:Response,next:NextFunction): void
{
  business.find({bowner: UserUserName(req)  }, null, {sort: {name: 1}},function(err,businessCollection){
        if(err){
            return console.error(err);
        }
        //printing list
        res.render('owner/business-list',{title: 'Add Business', page: 'business-list', addbusiness: businessCollection, displayName: UserDisplayName(req) })
    }); 
}

// Display (C)reate page
export function DisplayBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('owner/updatebusiness', { title: 'Add', page: 'updatebusiness', addbusiness: '', displayName: UserDisplayName(req)  });
}


// Process (C)reate page
export function ProcessBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new business
  let newCustomer = new business
  ({
    "bname": req.body.bname,
      "baddress": req.body.baddress,
      "bdescription": req.body.bdescription,
      "bowner": UserUserName(req),
      "btotalrating": 0,
      "bnumberofratings": 0
  });

 
  business.create(newCustomer, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/business-list');
  });
}

// Display (E)dit page
export function DisplayaddbusinessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    business.findById(id, {}, {}, (err, addbusinessItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('owner/updatebusiness', { title: 'Edit', page: 'updatebusiness', addbusiness: addbusinessItemToEdit, displayName: UserDisplayName(req) });
    });
}


// Process (E)dit page
export function ProcessBusinessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new business Item
    let updatedaddbusinessItem = new business
    ({
      "_id": id,
      "bname": req.body.bname,
      "baddress": req.body.baddress,
      "bdescription": req.body.bdescription
    });
  
    // find the business item 
    business.updateOne({_id: id}, updatedaddbusinessItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/owner/business-list');
    });
}


// Process (D)elete page
export function ProcessBusinessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.business.remove({"_id: id"})
  business.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/business-list');
  });
}


