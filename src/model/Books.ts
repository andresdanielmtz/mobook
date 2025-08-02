import type { IAccessInfo } from "./AccessInfo";
import type { SaleInfo } from "./SaleInfo";

// Main book interface: Used for pretty much everything within the project.
export interface IBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: IVolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: IAccessInfo;
  searchInfo?: ISearchInfo;
}

export interface ISearchInfo {
  textSnippet: string;
}

export interface IVolumeInfo {
  title: string;
  authors: string[];
  publishedDate: string;
  description?: string;
  industryIdentifiers: IIndustryIdentifier[];
  readingModes: IReadingModes;
  pageCount?: number;
  printType: string;
  categories?: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  publisher?: string;
  averageRating?: number;
  ratingsCount?: number;
  panelizationSummary?: IPanelizationSummary;
  imageLinks?: IImageLinks;
  subtitle?: string;
}

export interface IImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IIndustryIdentifier {
  type: string;
  identifier: string;
}

export interface IPanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface IReadingModes {
  text: boolean;
  image: boolean;
}
