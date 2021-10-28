import { ImgurClient } from '../client';
import { Payload, ImgurApiResponse, ImageData } from '../common/types';
export declare function upload(client: ImgurClient, payload: string | string[] | Payload | Payload[]): Promise<ImgurApiResponse<ImageData> | ImgurApiResponse<ImageData>[]>;
