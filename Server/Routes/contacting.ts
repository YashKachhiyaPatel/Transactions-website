import express from 'express';
import { DisplayContactingListPage, DisplayContactingEditPage, DisplayContactAddPage, ProcessContactAddPage, ProcessContactEditPage, ProcessContactDeletePage } from '../Controllers/contacting';
const router = express.Router();
export default router;


router.get('/', DisplayContactingListPage);

router.get('/cedit/:id', DisplayContactingEditPage);

/* GET - display /clothing-list/add page. */
router.get('/cadd', DisplayContactAddPage);


/* POST - process /clothing-list/add page */
router.post('/cadd', ProcessContactAddPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/cedit/:id', ProcessContactEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/cdelete/:id', ProcessContactDeletePage);