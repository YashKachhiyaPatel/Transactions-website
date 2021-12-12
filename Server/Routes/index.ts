import express from 'express';
import { DisplayHomePage, DisplayAboutPage, DisplayProjectsPage, DisplayServicesPage, DisplayContactPage,ProcessContactPage, DisplayLoginPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage, DisplayRegisterPage, DisplayChangepasswordPage, ProcessChangepasswordPage, DisplayErrorPage} from '../Controllers';
const router = express.Router();
import { AuthGuard } from '../Util';
export default router;


/* GET home page. */
router.get('/',AuthGuard, DisplayHomePage);

/* GET home page. */
router.get('/home',AuthGuard, DisplayHomePage);

/* GET about page. */
router.get('/about',AuthGuard, DisplayAboutPage);

/* GET contact page. */
router.get('/contact',AuthGuard, DisplayContactPage);
/* Post contact page. */
router.post('/contact',AuthGuard, ProcessContactPage);

/* GET - display Login page - /login */
router.get('/login', DisplayLoginPage);

/* POST - process Login page when user presses Login button */
router.post('/login', ProcessLoginPage);


/* GET - process the Logout page - /logout */
router.get('/logout', ProcessLogoutPage);

/* POST - process Register page when user presses Register button */
router.post('/register', ProcessRegisterPage);

/* GET - display Register page - /register */
router.get('/register', DisplayRegisterPage);



/* GET - display changepassword page -/changepassword */
router.get('/changepassword',AuthGuard, DisplayChangepasswordPage);
/* POST - process Register page when user presses Register button */
router.post('/changepassword',AuthGuard, ProcessChangepasswordPage);

/* GET - display error page*/
router.get('/error', DisplayErrorPage);
//module.exports = router;
