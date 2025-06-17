export default ({ env }) => {
  const region = env("AWS_REGION");
  const bucket = env("AWS_BUCKET");
  const signedUrlExpires = parseInt(env("AWS_SIGNED_URL_EXPIRES")) || 900;
  const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;
  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_SECRET_ACCESS_KEY");

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl,
          s3Options: {
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
            params: {
              ACL: "private",
              Bucket: bucket,
            },
          },
          signedUrlExpires,
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
          generateSignedUrl: {
            expiresIn: signedUrlExpires,
          },
        },
      },
    },
  };
};
