import routerx from 'express-promise-router';
import personaController from '../controllers/personaController';
import auth from '../middlewares/auth'
const router = routerx();

router.post('/add',auth.verifyUser,personaController.add);
router.get('/query',auth.verifyUser,personaController.query);
router.get('/list',auth.verifyUser,personaController.list);
router.get('/listClient',auth.verifyUser,personaController.listClient);
router.get('/listProvider',auth.verifyUser,personaController.listProvider);
router.put('/update',auth.verifyUser,personaController.update);
router.delete('/remove',auth.verifyUser,personaController.remove);
router.put('/activate',auth.verifyUser,personaController.activate);
router.put('/deactivate',auth.verifyUser,personaController.deactivate);

export default router;