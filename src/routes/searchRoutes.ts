import { Router } from 'express';

import { searchControllers } from '../controllers';

const router = Router();

router.get('/', searchControllers.home);

router.get('/title/:title', searchControllers.title);

export default router;
