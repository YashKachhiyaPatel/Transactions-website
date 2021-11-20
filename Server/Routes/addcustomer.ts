import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type clothing controller
import { ProcessAddCustomer, DisplayCustomerAddPage, DisplayaddcustomerListPage, DisplayaddcustomerEditPage, ProcessCustomerAddPage, ProcessCustomerDeletePage, ProcessCustomerEditPage } from '../Controllers/addcustomer';
import { DisplayBusinessAddPage, DisplaybusinessListPage, ProcessBusinessAddPage } from '../Controllers/business';

// import Util Functions
import { AuthGuard, AuthOwner } from '../Util/index';

/* GET /clothing-list page. */
router.get('/', ProcessAddCustomer);

/* GET - display /clothing-list/add page. */
router.get('/addcustomer/add', AuthGuard,AuthOwner, DisplayCustomerAddPage);

/* GET - display /clothing-list/edit/:id page. */
router.get('/addcustomer/edit/:id', AuthGuard,AuthOwner, DisplayaddcustomerEditPage);

/* POST - process /clothing-list/add page */
router.post('/addcustomer/add', AuthGuard,AuthOwner, ProcessCustomerAddPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/addcustomer/edit/:id', AuthGuard,AuthOwner, ProcessCustomerEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/addcustomer/delete/:id', AuthGuard,AuthOwner, ProcessCustomerDeletePage);

//dashboard to list page
router.get('/addcustomer', AuthGuard,AuthOwner, DisplayaddcustomerListPage);



/* GET - display /clothing-list/add page. */
router.get('/addbusiness/add', AuthGuard, DisplayBusinessAddPage);

/* POST - process /clothing-list/add page */
router.post('/addbusiness/add', AuthGuard, ProcessBusinessAddPage);

router.get('/', AuthGuard, DisplaybusinessListPage);




