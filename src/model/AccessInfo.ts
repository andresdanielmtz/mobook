import type { IEPUB } from "./Epub";

export interface IAccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: IEPUB;
  pdf: IEPUB;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
