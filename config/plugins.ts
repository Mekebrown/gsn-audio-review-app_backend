export default ({ env }) => {
  const acl = "private";
  const region = env("AWS_REGION");
  const bucket = env("AWS_BUCKET");
  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_SECRET_ACCESS_KEY");
  const signedUrlExpires = parseInt(env("AWS_SIGNED_URL_EXPIRES") || "900");
  const baseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;
  // const baseUrl = `https://s3.${region}.amazonaws.com/${bucket}`;

  return {
    upload: {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          region,
          // baseUrl,
          params: {
            ACL: acl,
            signedUrlExpires,
            Bucket: bucket,
          },
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
