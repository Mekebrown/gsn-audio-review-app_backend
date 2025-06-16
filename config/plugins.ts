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

  console.log("🧪 Render ENV: ", {
    ACCESS_KEY_ID: env("AWS_ACCESS_KEY_ID"),
    SECRET_ACCESS_KEY: env("AWS_SECRET_ACCESS_KEY") ? "it is set" : "not set",
    BUCKET: env("AWS_BUCKET"),
    REGION: env("AWS_REGION"),
    SIGNED_URL_EXPIRES: env("AWS_SIGNED_URL_EXPIRES")
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
            console.log("Signed URL for key " + command ? "will be generated" : "not provided");
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
