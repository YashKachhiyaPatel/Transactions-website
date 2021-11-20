import expess,{ Request, Response, NextFunction } from 'express';
import business from '../Models/business';
// import Util Functions
import { UserDisplayName } from '../Util';

export function DisplaybusinessListPage(req: Request, res:Response,next:NextFunction): void
{
    business.find({}, null, {sort: {name: 1}},function(err,businessCollection){
        if(err){
            return console.error(err);
        }
        //printing list
        res.render('owner',{title: 'Add Contact', page: 'index', business: businessCollection, displayName: UserDisplayName(req) })
    }); 
}

// Display (C)reate page
export function DisplayBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('owner/addbusiness', { title: 'Add', page: 'addbusiness', business: '', displayName: UserDisplayName(req)  });
}


// Process (C)reate page
export function ProcessBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Clothing
  let newCustomer = new business
  ({
    "bname": req.body.bname,
      "baddress": req.body.baddress,
      "bdescription": req.body.bdescription
  });

  // db.clothing.insert({clothing data is here...})
  business.create(newCustomer, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner');
  });
}

//dashboard to customer list
export function Processbusiness(req: Request, res: Response, next: NextFunction): void
 {
  res.render('business', { title: 'Contact Us', page: 'addbusiness', displayName: UserDisplayName(req)  });
}
