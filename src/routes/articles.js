import routerx from 'express-promise-router';
import articlesController from '../controllers/articlesController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyEncargado,articlesController.add);
router.get('/query',auth.verifyEncargado,articlesController.query);
router.get('/queryBarcode',auth.verifyUser,articlesController.queryBarcode);
router.get('/list',auth.verifyEncargado,articlesController.list);
router.put('/update',auth.verifyEncargado,articlesController.update);
router.delete('/remove',auth.verifyEncargado,articlesController.remove);
router.put('/activate',auth.verifyEncargado,articlesController.activate);
router.put('/deactivate',auth.verifyEncargado,articlesController.deactivate);


export default router;