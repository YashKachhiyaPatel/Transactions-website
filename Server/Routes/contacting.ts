import express from 'express';
import { DisplayContactingListPage, DisplayContactingEditPage, ProcessContactEditPage, ProcessContactDeletePage } from '../Controllers/contacting';
const router = express.Router();
export default router;

import { AuthGuard } from '../Util/index';

router.get('/', DisplayContactingListPage);

router.get('/update/:id',AuthGuard, DisplayContactingEditPage);

/* POST - process /clothing-list/edit/:id page */
router.post('/update/:id',AuthGuard, ProcessContactEditPage);

/* GET - process /clothing-list/delete/:id */
router.get('/delete/:id',AuthGuard, ProcessContactDeletePage);