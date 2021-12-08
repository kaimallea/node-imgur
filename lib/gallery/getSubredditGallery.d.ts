/// <reference types="node" />
import { ImgurClient } from '../client';
import { ImgurApiResponse, GalleryData } from '../common/types';
import { URL } from 'url';
export declare type TimeOptions = {
    subreddit: string;
    sort?: 'time';
    page?: number;
};
export declare type TopOptions = Omit<TimeOptions, 'sort'> & {
    sort?: 'top';
    window?: 'day' | 'week' | 'month' | 'year' | 'all';
};
export declare type SubredditGalleryOptions = TimeOptions | TopOptions;
export declare function constructSubredditGalleryUrl(options: SubredditGalleryOptions): URL;
export declare function getSubredditGallery(client: ImgurClient, options: SubredditGalleryOptions): Promise<ImgurApiResponse<GalleryData>>;
