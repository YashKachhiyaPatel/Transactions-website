import expess,{ Request, Response, NextFunction } from 'express';
import Contacting from '../Models/contacting';
// import Util Functions
import { UserDisplayName } from '../Util';

export function DisplayContactingListPage(req: Request, res:Response,next:NextFunction): void
{
  if(!req.user){
    res.redirect('/login');
  }
  else{
    Contacting.find({}, null, {sort: {name: 1}},function(err,contactingCollection){
        if(err){
            return console.error(err);
        }

        //printing list
        res.render('index',{title: 'Business Contacts', page: 'contacting-list', contacting: contactingCollection, displayName: UserDisplayName(req) })
    });
  }
}

// Display (E)dit page
export function DisplayContactingEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // pass the id to the db

    // db.clothing.find({"_id": id})

    Contacting.findById(id, {}, {}, (err, contactingItemToEdit) => 
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        // show the edit view
        res.render('index', { title: 'Update', page: 'contactingupdate', contacting: contactingItemToEdit, displayName: UserDisplayName(req) });
    });
}


// Display (C)reate page
export function DisplayContactAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the edit view
    res.render('index', { title: 'Add', page: 'contactingupdate', contacting: '', displayName: UserDisplayName(req) });
}

// Process Functions

// Process (E)dit page
export function ProcessContactEditPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Clothing Item
    let updatedContactingItem = new Contacting
    ({
      "_id": id,
      "name": req.body.name,
      "number": req.body.number,
      "emailAddress": req.body.emailAddress
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    Contacting.updateOne({_id: id}, updatedContactingItem, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contacting-list');
    });
}

// Process (C)reate page
export function ProcessContactAddPage(req: Request, res: Response, next: NextFunction): void
{
  // instantiate a new Clothing
  let newContact = new Contacting
  ({
    "name": req.body.name,
      "number": req.body.number,
      "emailAddress": req.body.emailAddress
  });

  // db.clothing.insert({clothing data is here...})
  Contacting.create(newContact, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contacting-list');
  });
}

// Process (D)elete page
export function ProcessContactDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  Contacting.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contacting-list');
  });
}
