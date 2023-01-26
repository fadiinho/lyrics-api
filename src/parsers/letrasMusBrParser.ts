import { CheerioAPI, load } from "cheerio"
import { IGoogleParsedLinks } from "../types"

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const $head =  load($(".cnt-head_title").html()!);

  const songName = $head("h1").text();
  const artist = $head("h2").text();

  const data = {
     lyrics: $(link.selectors.lyrics).toString().replace(/<.*?>/g, "\n").trim(),
     songName,
     artist
  }

  return data;
}
