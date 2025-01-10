import {
    middleware,
    webhook,
    HTTPFetchError,
} from '@line/bot-sdk';
import { Router, Request, Response } from 'express';
import { middlewareConfig, textEventHandler } from '../controllers/lineController';
import { logger } from '../utils/logger';

const router = Router();

// Route handler to receive webhook events.
// This route is used to receive connection tests.
router.get(
    '/',
    async (_: Request, res: Response): Promise<Response> => {
        logger.info('Handling GET /api/line request');
        return res.status(200).json({
            status: 'success',
            message: 'Connected successfully!',
        });
    }
);

// This route is used for the Webhook.
router.post(
    '/callback',
    middleware(middlewareConfig),
    async (req: Request, res: Response): Promise<Response> => {
        logger.info('Handling POST /api/line/callback request');
        const callbackRequest: webhook.CallbackRequest = req.body;
        const events: webhook.Event[] = callbackRequest.events!;

        // Process all the received events asynchronously.
        const results = await Promise.all(
            events.map(async (event: webhook.Event) => {
                try {
                    await textEventHandler(event);
                } catch (err: unknown) {
                    if (err instanceof HTTPFetchError) {
                        console.error(err.status);
                        console.error(err.headers.get('x-line-request-id'));
                        console.error(err.body);
                    } else if (err instanceof Error) {
                        console.error(err);
                    }

                    // Return an error message.
                    return res.status(500).json({
                        status: 'error',
                    });
                }
            })
        );

        // Return a successful message.
        return res.status(200).json({
            status: 'success',
            results,
        });
    }
);

export default router;