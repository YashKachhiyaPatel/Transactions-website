import expess,{ Request, Response, NextFunction } from 'express';
import addbusiness from '../Models/addbusiness';
// import Util Functions
import { UserDisplayName } from '../Util';

export function DisplayaddBusinessListPage(req: Request, res:Response,next:NextFunction): void
{
  addbusiness.find({}, null, {sort: {name: 1}},function(err,businessCollection){
        if(err){
            return console.error(err);
        }
        //printing list
        res.render('owner/addbusiness',{title: 'Add Business', page: 'addbusiness', addbusiness: businessCollection, displayName: UserDisplayName(req) })
    }); 
}

// Display (C)reate page
export function DisplayBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('owner/updatebusiness', { title: 'Add', page: 'updatebusiness', business: '', displayName: UserDisplayName(req)  });
}


// Process (C)reate page
export function ProcessBusinessAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Clothing
  let newCustomer = new addbusiness
  ({
    "bname": req.body.bname,
      "baddress": req.body.baddress,
      "bdescription": req.body.bdescription
  });

  // db.clothing.insert({clothing data is here...})
  addbusiness.create(newCustomer, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addbusiness');
  });
}

// Display (E)dit page
export function DisplayaddbusinessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    addbusiness.findById(id, {}, {}, (err, addbusinessItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('owner/updatebusiness', { title: 'Update', page: 'updatebusiness', addbusiness: addbusinessItemToEdit, displayName: UserDisplayName(req) });
    });
}

// Process (E)dit page
export function ProcessBusinessEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Clothing Item
    let updatedaddbusinessItem = new addbusiness
    ({
      "_id": id,
      "bname": req.body.bname,
      "baddress": req.body.baddress,
      "bdescription": req.body.bdescription
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    addbusiness.updateOne({_id: id}, updatedaddbusinessItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/owner/addbusiness');
    });
}


// Process (D)elete page
export function ProcessBusinessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  addbusiness.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/owner/addbusiness');
  });
}


