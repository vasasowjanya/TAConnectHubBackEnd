import AWS from 'aws-sdk';
import environmentVariables from '../config/environmentVariables.js';

const s3 = new AWS.S3({
    accessKeyId: environmentVariables.aws.accessKey,
    secretAccessKey: environmentVariables.aws.secretKey,
});

export default s3;
