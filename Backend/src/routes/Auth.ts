import { Router } from 'express'
import { registerController } from '../controllers/register';
import { loginController } from '../controllers/login';
import { refreshController } from '../controllers/refreshController';
import { loginWithGoogleController } from '../controllers/loginWithGoogle';
import { accountSetupControler } from '../controllers/accountSetup';
import { authenticate } from '../middleware/authenticationMiddleware';

const authRouter: Router = Router();

authRouter.post('/login', loginController);
authRouter.post("/loginWithGoogle", loginWithGoogleController);
authRouter.post('/register', registerController);
authRouter.get('/refresh', refreshController);
authRouter.post('/accountSetup', authenticate, accountSetupControler);

export default authRouter;