import AWS from 'aws-sdk';
import Config from '../../../config';
import fs from 'fs';
import path from 'path';
import { getType } from 'mime';
import { ApiError } from './errorHandler';


// Aws Config
AWS.config.update({
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    region: Config.AWS_REGION
});

const s3 = new AWS.S3();

export const uploadSingleImage = async (image, folder = '') => {
    const fileName = 'public/' + Config.SERVICE_NAME+'/'+  (folder ? folder+'/': '') + Date.now().toString()+path.extname(image.path);

    const rawData = fs.readFileSync(image.path);
    const params = {
        StorageClass: 'REDUCED_REDUNDANCY',
        ContentEncoding: 'base64',
        ContentDisposition: 'inline',
        ContentType: getType(image.path)?.toString(),
        Bucket: Config.AWS_BUCKET,
        Key: fileName,
        Body: rawData,
        ACL: 'public-read'
    };

    const uploadImage = await s3.upload(params).promise();

    return uploadImage.Location;
}


export const uploadSingleVideo = async (video, folder = '') => {
    console.log(video.name);
    const fileName = 'public/' +Config.SERVICE_NAME+'/'+  (folder ? folder+'/': '') + Date.now().toString()+path.extname(video.path);

    const validateType = ['.mp4', '.mpeg'];

    if(!validateType.includes(path.extname(video.path))) {
        throw new ApiError('INVALID_TYPE', 400, 'Invalid Cover Datatype');
    }

    const rawData = fs.readFileSync(video.path);

    const params = {
        StorageClass: 'REDUCED_REDUNDANCY',
        ContentEncoding: 'base64',
        ContentDisposition: 'inline',
        ContentType: 'video/mp4',
        Bucket: Config.AWS_BUCKET,
        Key: fileName,
        Body: rawData,
        ACL: 'public-read'
    };

    const uploadImage = await s3.upload(params).promise();
    console.log(uploadImage);
    

    return uploadImage.Location;
}