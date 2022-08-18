import { CheerioAPI } from "cheerio"
import { IGoogleParsedLinks } from "../types"

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const data = {
     lyrics: $(link.selectors.lyrics).toString().replace(/<.*?>/g, "\n").trim()
  }

  return data;
}
