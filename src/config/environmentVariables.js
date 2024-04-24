import dotenv from 'dotenv';
dotenv.config();

export default {
    server: { port: process.env.PORT || 5000 },
    bcrypt: { saltRounds: process.env.BCRYPT_SALT_ROUNDS || 10 },
    jwt: { secret: process.env.JWT_SECRET || 'shhhh' },
    aws: {
        accessKey: process.env.AWS_ACCESS_KEY,
        secretKey: process.env.AWS_SECRET_KEY,
        s3BucketName: process.env.AWS_S3_BUCKET_NAME,
    },
};
