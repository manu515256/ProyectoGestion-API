import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyEncargado,categoryController.add);
router.get('/query',auth.verifyEncargado,categoryController.query);
router.get('/list',auth.verifyEncargado,categoryController.list);
router.put('/update',auth.verifyEncargado,categoryController.update);
router.delete('/remove',auth.verifyEncargado,categoryController.remove);
router.put('/activate',auth.verifyEncargado,categoryController.activate);
router.put('/deactivate',auth.verifyEncargado,categoryController.deactivate);


export default router;