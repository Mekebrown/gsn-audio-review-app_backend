import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";

export default ({ env }) => {
  const region = env("AWS_REGION");
  const bucket = env("AWS_BUCKET");
  const expiresIn = Number(env("AWS_SIGNED_URL_EXPIRES") || 900);

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
    },
  });

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          credentials: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
          },
          region,
          params: {
            ACL: "private",
            Bucket: bucket,
          },
          getSignedUrl: async (key) => {
            const command = new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            });
            return getS3SignedUrl(s3Client, command, { expiresIn });
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
