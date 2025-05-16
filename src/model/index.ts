import { type Epub } from "./Epub.ts";

export interface Content {
  kind: string;
  totalItems: number;
  items: Item[];
}

export interface Item {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Epub;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface SaleInfo {
  country: string;
  saleability: Saleability;
  isEbook: boolean;
  listPrice?: SaleInfoListPrice;
  retailPrice?: SaleInfoListPrice;
  buyLink?: string;
  offers?: Offer[];
}

export interface SaleInfoListPrice {
  amount: number;
  currencyCode: string;
}

export interface Offer {
  finskyOfferType: number;
  listPrice: OfferListPrice;
  retailPrice: OfferListPrice;
  giftable: boolean;
}

export interface OfferListPrice {
  amountInMicros: number;
  currencyCode: string;
}

export type Saleability = "FOR_SALE" | "NOT_FOR_SALE";

export interface SearchInfo {
  textSnippet: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publishedDate: string;
  description?: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
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
  panelizationSummary?: PanelizationSummary;
  imageLinks?: ImageLinks;
  subtitle?: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}
