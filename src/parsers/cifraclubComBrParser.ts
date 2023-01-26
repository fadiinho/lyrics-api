import { CheerioAPI, load } from "cheerio";
import { IGoogleParsedLinks } from "../types";

export default ($: CheerioAPI, link: IGoogleParsedLinks) => {
  const data = { lyrics: '' };

  const $el = load($(link.selectors.lyrics).toString());

  $el('.l_row').each((_, el) => {
    data.lyrics += $el(el).text() + '\n';
  })

  return data;
}
