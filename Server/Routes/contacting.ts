import express from 'express';
import { DisplayContactingListPage, DisplayContactingEditPage, DisplayContactAddPage, ProcessContactAddPage, ProcessContactEditPage, ProcessContactDeletePage } from '../Controllers/contacting';
const router = express.Router();
export default router;


router.get('/', DisplayContactingListPage);

router.get('/edit/:id', DisplayContactingEditPage);

/* GET - display /clothing-list/add page. */
router.get('/add', DisplayContactAddPage);


/* POST - process /clothing-list/add page */
router.post('/add', ProcessContactAddPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/edit/:id', ProcessContactEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/delete/:id', ProcessContactDeletePage);