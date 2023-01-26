import { CheerioAPI } from "cheerio";
import { IGoogleParsedLinks } from "../types";

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const songName = $("#lyricContent h1").text();
  const artist = $("#lyricContent h2").text();

  const data = {
      lyrics: $(link.selectors.lyrics).toString().replace(/<.*?>/g, "\n").trim(),
      songName,
      artist
  };

  return data;
}
