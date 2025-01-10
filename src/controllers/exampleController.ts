import { Request, Response } from 'express';

const getExample = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Example endpoint working!' });
};

export default { getExample };