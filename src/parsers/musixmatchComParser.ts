import { CheerioAPI } from "cheerio";
import { IGoogleParsedLinks } from "../types";

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  $(".mxm-track-title > h1 > small").remove();
  const songName = $(".mxm-track-title > h1").first().text();
  const artist = $(".mxm-track-title > h2").first().text();


  const data = {
     lyrics: $(link.selectors.lyrics).toString().replace('</span>', '\n').replace(/<.*?>/g, ''),
     songName,
     artist
  };

  return data;
}
