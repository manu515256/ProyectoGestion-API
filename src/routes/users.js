import routerx from 'express-promise-router';
import usersController from '../controllers/usersController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyAdmin,usersController.add);
router.get('/query',auth.verifyAdmin,usersController.query);
router.get('/list',auth.verifyAdmin,usersController.list);
router.put('/update',auth.verifyAdmin,usersController.update);
router.delete('/remove',auth.verifyAdmin,usersController.remove);
router.put('/activate',auth.verifyAdmin,usersController.activate);
router.put('/deactivate',auth.verifyAdmin,usersController.deactivate);
router.post('/login',usersController.login);

export default router;