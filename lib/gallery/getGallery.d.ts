/// <reference types="node" />
import { ImgurClient } from '../client';
import { ImgurApiResponse, GalleryData } from '../common/types';
import { URL } from 'url';
export declare type CommonSectionProps = {
    sort?: 'viral' | 'top' | 'time';
    page?: number;
};
export declare type HotSection = CommonSectionProps & {
    section: 'hot';
};
export declare type TopSection = CommonSectionProps & {
    section: 'top';
    window?: 'day' | 'week' | 'month' | 'year' | 'all';
};
export declare type UserSection = Omit<CommonSectionProps, 'sort'> & {
    section: 'user';
    sort?: 'viral' | 'top' | 'time' | 'rising';
};
export declare type SectionOptions = HotSection | TopSection | UserSection;
export declare type PresentationOptions = {
    showViral?: boolean;
    mature?: boolean;
    album_previews?: boolean;
};
export declare type GalleryOptions = SectionOptions & PresentationOptions;
export declare function constructGalleryUrl(options: GalleryOptions): URL;
export declare function getGallery(client: ImgurClient, options?: GalleryOptions): Promise<ImgurApiResponse<GalleryData>>;
