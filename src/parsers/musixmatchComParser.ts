import { CheerioAPI } from "cheerio";
import { IGoogleParsedLinks } from "../types";

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const data = {
     lyrics: $(link.selectors.lyrics).toString().replace('</span>', '\n').replace(/<.*?>/g, '')
  };

  return data;
}
