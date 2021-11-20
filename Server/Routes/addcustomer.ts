import express from 'express';
const router = express.Router();
export default router;

// instantiate an object of type clothing controller
import { ProcessAddCustomer, DisplayCustomerAddPage, DisplayaddcustomerListPage, DisplayaddcustomerEditPage, ProcessCustomerAddPage, ProcessCustomerDeletePage, ProcessCustomerEditPage } from '../Controllers/addcustomer';
import { DisplayaddbusinessEditPage, DisplayaddBusinessListPage, DisplayBusinessAddPage, ProcessBusinessAddPage, ProcessBusinessDeletePage, ProcessBusinessEditPage } from '../Controllers/addbusiness';

// import Util Functions
import { AuthGuard, AuthOwner } from '../Util/index';

/* GET /clothing-list page. */
router.get('/', ProcessAddCustomer);

/* GET - display /clothing-list/add page. */
router.get('/addcustomer/add', AuthGuard, DisplayCustomerAddPage);

/* GET - display /clothing-list/edit/:id page. */
router.get('/addcustomer/edit/:id', AuthGuard, DisplayaddcustomerEditPage);

/* POST - process /clothing-list/add page */
router.post('/addcustomer/add', AuthGuard, ProcessCustomerAddPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/addcustomer/edit/:id', AuthGuard, ProcessCustomerEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/addcustomer/delete/:id', AuthGuard, ProcessCustomerDeletePage);

//dashboard to list page
router.get('/addcustomer', AuthGuard, DisplayaddcustomerListPage);



//dashboard to list page
router.get('/addbusiness', AuthGuard, DisplayaddBusinessListPage);
/* GET - display /clothing-list/add page. */
router.get('/addbusiness/add', AuthGuard, DisplayBusinessAddPage);

/* POST - process /clothing-list/add page */
router.post('/addbusiness/add', AuthGuard, ProcessBusinessAddPage);


/* GET - display /clothing-list/edit/:id page. */
router.get('/addbusiness/edit/:id', AuthGuard, DisplayaddbusinessEditPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/addbusiness/edit/:id', AuthGuard, ProcessBusinessEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/addbusiness/delete/:id', AuthGuard, ProcessBusinessDeletePage);






