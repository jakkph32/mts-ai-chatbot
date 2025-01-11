import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';
const router = Router();

const getExample = (req: Request, res: Response) => {
  logger.info('GET /example');
  try {
    res.json({ message: 'Example endpoint working!' });
    } catch (error) {
        logger.error(`Error in getExample: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};

router.get('/example', getExample);

export default router;