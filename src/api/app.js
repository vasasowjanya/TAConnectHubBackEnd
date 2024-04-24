import express from 'express';
import cors from 'cors';
import globalErrorHandler from '../middleware/globalErrorHandler.js';
import router from './v1/routes.js';
import prisma from '../config/prisma.js';

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: 'https://dazzling-alpaca-173db3.netlify.app', // Replace with your frontend origin
        methods: 'GET,POST,PUT,DELETE', // Allowed methods (adjust as needed)
        credentials: true, // Allow cookies (if applicable)
    }),
);

app.use('/api/v1', router);
app.use(globalErrorHandler);

// prisma.departmentStaff
//     .deleteMany({ where: {} })
//     .then((res) => console.log(res));

// default route
app.get('/', async (_, res) => {
    res.send('Uni Backend.');
});

export default app;
