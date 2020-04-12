import routerx from 'express-promise-router';
import categoryRouter from './category';
import articlesRouter from './articles'
import usersRouter from './users';
const router = routerx();

router.use('/category',categoryRouter);
router.use('/articles',articlesRouter);
router.use('/user',usersRouter);

export default router;