import { CheerioAPI } from "cheerio";
import { IGoogleParsedLinks, ParserResult } from "../types";

import letrasMusBrParser from './letrasMusBrParser';
import letrasComBrParser from './letrasComBrParser';
import musixmatchComParser from "./musixmatchComParser";
import vagalumeComBrParser from "./vagalumeComBrParser";
import cifraclubComBrParser from "./cifraclubComBrParser";

export const parse = ($: CheerioAPI, link: IGoogleParsedLinks) => {
  let lyrics: ParserResult;

  // Main inspiration:
  // https://github.com/gabrideiros/music-lyrics
  if (link.baseUrl?.includes('https://www.letras.mus.br') || link.baseUrl?.includes('https://www.letras.com')) {
    lyrics = letrasMusBrParser($, link);
  } else if (link.baseUrl?.includes('https://www.letras.com.br')) {
    lyrics = letrasComBrParser($, link);
  } else if (link.baseUrl?.includes('https://www.musixmatch.com')) {
    lyrics = musixmatchComParser($, link);
  } else if (link.baseUrl?.includes('https://www.vagalume.com.br')) {
    lyrics = vagalumeComBrParser($, link);
  } else if (link.baseUrl?.includes('https://www.cifraclub.com.br')) {
    lyrics = cifraclubComBrParser($, link);
  } else {
    throw new Error(`Parser not found for ${link.baseUrl}`);
  }

  if (!lyrics.lyrics) return;

  return { ...lyrics, ...link, selectors: undefined };
}

