import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";

export default ({ env }) => {
  const region = env("AWS_REGION");
  const bucket = env("AWS_BUCKET");
  const signedUrlExpires = parseInt(env("AWS_SIGNED_URL_EXPIRES")) || 900;
  const baseUrl = `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com`;
  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_SECRET_ACCESS_KEY");

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
              signedUrlExpires
            },
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
