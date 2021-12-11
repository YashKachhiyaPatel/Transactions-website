import express from 'express';
import { DisplayaddBusinessListPage, DisplayBusinessAddPage, ProcessBusinessAddPage, DisplayaddbusinessEditPage, ProcessBusinessEditPage, ProcessBusinessDeletePage } from '../Controllers/business';
const router = express.Router();
export default router;

// instantiate an object of type customer controller
import { ProcessAddCustomer, DisplayCustomerAddPage, DisplayaddcustomerListPage, DisplayaddcustomerEditPage, ProcessCustomerAddPage, ProcessCustomerDeletePage, ProcessCustomerEditPage, DisplayTransactionHistoryPage, DisplaySendReminderPage, ProcessSendReminderPage } from '../Controllers/customer';
import { DisplayTransactionAddPage, ProcessTransactionAddPage } from '../Controllers/transaction';

// import Util Functions
import { AuthGuard } from '../Util/index';

/* GET /customer-list page. */
router.get('/', ProcessAddCustomer);

/* GET - display /customer/add page. */
router.get('/customers-list/add', AuthGuard, DisplayCustomerAddPage);

/* GET - display /customer/edit/:id page. */
router.get('/customers-list/edit/:id', AuthGuard, DisplayaddcustomerEditPage);

/* POST - process /customer/add page */
router.post('/customers-list/add', AuthGuard, ProcessCustomerAddPage);

/* POST - process /customer/edit/:id page */
router.post('/customers-list/edit/:id', AuthGuard, ProcessCustomerEditPage);

/* GET - process /customer/delete/:id */
router.get('/customers-list/delete/:id', AuthGuard, ProcessCustomerDeletePage);

// GET - the owner's transaction history page
router.get('/transactionhistory', AuthGuard, DisplayTransactionHistoryPage);

//dashboard to customer-list page
router.get('/customers-list', AuthGuard, DisplayaddcustomerListPage);




//business routes
//dashboard to list page
router.get('/business-list', AuthGuard, DisplayaddBusinessListPage);
/* GET - display add page. */
router.get('/business-list/add', AuthGuard, DisplayBusinessAddPage);

/* POST - process add page */
router.post('/business-list/add', AuthGuard, ProcessBusinessAddPage);


/* GET - display edit page. */
router.get('/business-list/edit/:id', AuthGuard, DisplayaddbusinessEditPage);

/* POST - process edit page */
router.post('/business-list/edit/:id', AuthGuard, ProcessBusinessEditPage);

/* GET - process delete */
router.get('/business-list/delete/:id', AuthGuard, ProcessBusinessDeletePage);



/* GET - display /reminder/edit/:id page. */
router.get('/reminder/edit/:id', AuthGuard, DisplaySendReminderPage);

/* POST - process /reminder/edit/:id page */
router.post('/reminder/edit/:id', AuthGuard, ProcessSendReminderPage);


//get transaction page
router.get('/transaction/add', AuthGuard, DisplayTransactionAddPage);
/* POST - process add transaction page. */
router.post('/transaction/add', AuthGuard, ProcessTransactionAddPage);

