import routerx from 'express-promise-router';
import categoryRouter from './category';
import articlesRouter from './articles'
import usersRouter from './users';
import personaRouter from './persona';
const router = routerx();

router.use('/category',categoryRouter);
router.use('/articles',articlesRouter);
router.use('/user',usersRouter);
router.use('/persona',personaRouter)

export default router;