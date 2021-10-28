/// <reference types="node" />
import { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { ImgurApiResponse, Payload } from './types';
import { Readable } from 'stream';
export declare function isBase64(payload: string | Payload): boolean;
export declare function isImageUrl(payload: string | Payload): boolean;
export declare function isStream(payload: string | Payload): boolean;
export declare function getSource(payload: string | Payload): string | Readable;
export declare function createForm(payload: string | Payload): FormData;
export declare function getImgurApiResponseFromResponse(response: AxiosResponse): ImgurApiResponse;
