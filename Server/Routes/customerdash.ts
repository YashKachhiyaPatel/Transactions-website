import express from 'express';
import { DisplayBusinessListPage, DisplayCustomerDashBoardPage, DisplayRateBusinessPage, ProcessRateBusiness } from '../Controllers/customerdash';
import { AuthGuard } from '../Util';
const router = express.Router();
export default router;

// GET customer's dashboard 
router.get('/', AuthGuard, DisplayCustomerDashBoardPage);

// GET list of all existing business page
router.get('/businesslist', AuthGuard, DisplayBusinessListPage);

// GET the rate business page
router.get('/ratebusiness/:id', AuthGuard, DisplayRateBusinessPage);

// POST the rate business page
router.post('/ratebusiness/:id', AuthGuard, ProcessRateBusiness);
