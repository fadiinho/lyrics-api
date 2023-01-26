export interface ISelectors {
  lyrics: string;
}

export interface IGoogleParsedLinks { 
  baseUrl: string | undefined; 
  selectors: ISelectors; 
  url: string 
}

export type ParserResult = Partial<IGoogleParsedLinks> & {
  lyrics: string | undefined;
  songName?: string;
  artist?: string;
}
