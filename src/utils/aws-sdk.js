import AWS from 'aws-sdk';
import environmentVariables from '../config/environmentVariables';

AWS.config.update({
    accessKeyId: environmentVariables.aws.accessKey,
    secretAccessKey: environmentVariables.aws.secretKey,
});

export default AWS;
