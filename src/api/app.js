import express from 'express';
import cors from 'cors';
import globalErrorHandler from '../middleware/globalErrorHandler.js';
import router from './v1/routes.js';
import prisma from '../config/prisma.js';

const app = express();

app.use(cors());
app.use(express.json());

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
