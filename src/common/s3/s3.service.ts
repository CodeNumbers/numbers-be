import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly s3Bucket: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    this.s3Bucket = this.configService.get<string>('AWS_S3_BUCKET')!;

    if (!region || !accessKeyId || !secretAccessKey || !this.s3Bucket)
      throw new Error('AWS Environment variable needed.');

    this.s3Client = new S3Client({
      region, // AWS Region
      credentials: {
        accessKeyId, // Access Key
        secretAccessKey, // Secret Key
      },
    });
  }

  async uploadPosterFile(
    fileBuffer: Buffer,
    key: string,
    mimetype: string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.s3Bucket, // S3 bucket name
      Key: key, // Upload file name
      Body: fileBuffer, // Upload file
      ContentType: mimetype, // File type
      // ACL: 'public-read', // File access permission
    });

    await this.s3Client.send(command);
  }

  parseImageKeyToImageUrl(imageKey: string): string {
    const cloundFrontDomain = this.configService.get<string>(
      'AWS_CLOUD_FRONT_DOMAIN',
    );

    if (!cloundFrontDomain)
      throw new Error('Environment variable AWS_CLOUD_FRONT_DOMAIN required.');

    const splitedImageKey = imageKey.split('-');
    const encodedImageKey =
      splitedImageKey[0] +
      '-' +
      splitedImageKey[1].normalize('NFC') +
      '-' +
      splitedImageKey[2];

    return `${cloundFrontDomain}/${encodeURIComponent(encodedImageKey)}`;
  }
}
