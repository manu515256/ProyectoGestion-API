import routerx from 'express-promise-router';
import entryController from '../controllers/EntryController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyUser,entryController.add);
router.get('/query',auth.verifyEncargado,entryController.query);
router.get('/list',auth.verifyEncargado,entryController.list);
router.put('/activate',auth.verifyEncargado,entryController.activate);
router.put('/deactivate',auth.verifyEncargado,entryController.deactivate);
router.get('/graph',auth.verifyUser,entryController.graph12m)
router.get('/queryDate',auth.verifyUser,entryController.queryDate);

export default router;