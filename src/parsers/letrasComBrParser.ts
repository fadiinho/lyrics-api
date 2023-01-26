import { CheerioAPI } from "cheerio";
import { IGoogleParsedLinks } from "../types";

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const songName = $(".title").text();
  const artist = $(".subtitle").text();

  const data = {
     lyrics: $(link.selectors.lyrics).toString().replace(/<.*?>/g, "\n").trim(),
     songName,
     artist
  }

  return data;
}
