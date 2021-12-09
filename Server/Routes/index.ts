import express from 'express';
import { DisplayHomePage, DisplayAboutPage, DisplayProjectsPage, DisplayServicesPage, DisplayContactPage,ProcessContactPage, DisplayLoginPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage, DisplayRegisterPage, DisplayChangepasswordPage, ProcessChangepasswordPage, DisplayErrorPage} from '../Controllers';
const router = express.Router();
export default router;


/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET projects page. */
router.get('/projects', DisplayProjectsPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);
/* Post contact page. */
router.post('/contact', ProcessContactPage);


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
router.get('/changepassword', DisplayChangepasswordPage);
/* POST - process Register page when user presses Register button */
router.post('/changepassword', ProcessChangepasswordPage);

/* GET - display error page*/
router.get('/error', DisplayErrorPage);
//module.exports = router;
