import {
    middleware,
    webhook,
    HTTPFetchError,
} from '@line/bot-sdk';
import { Router, Request, Response } from 'express';
import { middlewareConfig, textEventHandler } from '../controllers/lineController';
import { logger } from '../utils/logger';

const router = Router();

router.get('/', (_: Request, res: Response) => {
    logger.info('Handling GET /api/line request');
    return res.status(200).json({
        status: 'success',
        message: 'Connected successfully!',
    });
});

router.post('/callback', middleware(middlewareConfig), async (req: Request, res: Response) => {
    logger.info('Handling POST /api/line/callback request');
    const { events } = req.body as webhook.CallbackRequest;
    try {
        await Promise.all(events.map(textEventHandler));
        return res.status(200).json({ status: 'success' });
    } catch (err: unknown) {
        if (err instanceof HTTPFetchError) {
            logger.error(err.message);
            logger.error(err.statusText);
            logger.error(err.body);
        } else if (err instanceof Error) {
            logger.error(err.message);
        }
        return res.status(500).json({ status: 'error' });
    }
});
export default router;