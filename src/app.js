import express from 'express';
import rateLimit from 'express-rate-limit';
import { globalApi } from './routes/v1/global';
import { channelApi } from './routes/v1/channel';

export const app = express();

const limiter = rateLimit({
    windowMs: 1000,
    max: 5,
    message: { error: 'Too many requests in one second.' }
});

app.use(limiter);

app.set('json spaces', 2)

app.use('/v1/global', globalApi);
app.use('/v1/channel', channelApi);

app.get('/', (request, response) => {
    response.status(200).json({ message: 'everything cool B)' });
});