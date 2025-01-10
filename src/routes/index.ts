import { Router, Request, Response } from 'express';
import { logger } from '../utils/logger';
const router = Router();

const getExample = (req: Request, res: Response) => {
    logger.info('Handling GET /example request');
    try {
        // ... some code ...
        res.status(200).json({ message: 'Example endpoint working!' });
    } catch (error) {
        logger.error(`Error in getExample: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};
router.get('/example', getExample);

export default router;