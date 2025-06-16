export default ({ env }) => {
  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
            credentials: {
              accessKeyId: env("AWS_ACCESS_KEY_ID"),
              secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
            },
            region: env("AWS_REGION"),
            params: {
              ACL: "private",
              signedUrlExpires: env.int("AWS_SIGNED_URL_EXPIRES", 900),
              Bucket: env("AWS_BUCKET"),
            },
            baseUrl: `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`,
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
