import routerx from 'express-promise-router';
import sellController from '../controllers/SellController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyVendedor,sellController.add);
router.get('/query',auth.verifyVendedor,sellController.query);
router.get('/list',auth.verifyVendedor,sellController.list);
router.put('/activate',auth.verifyVendedor,sellController.activate);
router.put('/deactivate',auth.verifyVendedor,sellController.deactivate);


export default router;