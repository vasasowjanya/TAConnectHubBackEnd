import app from './src/api/app.js';
import env from './src/config/environmentVariables.js';

app.listen(env.server.port, () => {
    console.log(`Server is running on port ${env.server.port}`);
});
