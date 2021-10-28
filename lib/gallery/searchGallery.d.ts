/// <reference types="node" />
import { ImgurClient } from '../client';
import { ImgurApiResponse, GalleryData } from '../common/types';
import { URL } from 'url';
export declare type SearchOptions = {
    q?: string;
    query?: string;
    sort?: 'time' | 'viral';
    page?: number;
};
export declare type TopSearchOptions = Omit<SearchOptions, 'sort'> & {
    sort?: 'top';
    window?: 'day' | 'week' | 'month' | 'year' | 'all';
};
export declare type AdvancedSearchQueryParameters = {
    q_all?: string;
    q_any?: string;
    q_exactly?: string;
    q_not?: string;
    q_type?: 'jpg' | 'png' | 'gif' | 'anigif' | 'album';
    q_size_px?: 'small' | 'med' | 'big' | 'lrg' | 'huge';
};
export declare type SearchGalleryOptions = (SearchOptions | TopSearchOptions) & AdvancedSearchQueryParameters;
export declare function constructSearchGalleryUrl(options: SearchGalleryOptions): URL;
export declare function searchGallery(client: ImgurClient, options: SearchGalleryOptions): Promise<ImgurApiResponse<GalleryData>>;
