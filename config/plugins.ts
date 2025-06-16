module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: process.env.AWS_REGION,
            params: {
              ACL: "private",
              signedUrlExpires: process.env.AWS_SIGNED_URL_EXPIRES,
              Bucket: process.env.AWS_BUCKET,
            },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  });
