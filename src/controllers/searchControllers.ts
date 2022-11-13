import { Request, Response } from "express";
import axios from 'axios';
import { load } from 'cheerio';
import { parse } from "../parsers";
import { IGoogleParsedLinks, ISelectors, ParserResult } from "../types";

const isAccetableLink = (link: string) => {
  const ACCETABLE_LINKS = [
    'https://www.letras.mus.br',
    'https://www.letras.com',
    'https://www.letras.com.br',
    'https://www.cifraclub.com.br',
    'https://www.youtube.com',
    'https://www.vagalume.com.br'
  ]

  for (const _link of ACCETABLE_LINKS) {
    if (link.includes(_link)) return { key: _link, link };    
  }

  return undefined;
}

const getLinksFromGoogle = async (title: string) => {
  const result = await axios.get(`https://google.com/search?q=${title}+letra`);
  const content = result.data;

  const $ = load(content);

  const anchorTags = $('a');
  let linksArray: { key: string, link: string}[] = [];

  anchorTags.each((_, tag) => {
    const _link = $(tag).attr('href');
    
    if (_link && _link.includes('/url?q=')) {
      const link = _link.replace('/url?q=', '').split('&')[0];

      const isAccetable = isAccetableLink(link);
      if (isAccetable) {
        linksArray.push({ key: isAccetable.key, link: isAccetable.link})
      }
    }
  });

  const selectors: { [key: string]: ISelectors } = {
    'https://www.letras.mus.br': { lyrics: '.cnt-letra' },
    'https://www.letras.com': { lyrics: '.cnt-letra' },
    'https://www.letras.com.br': { lyrics: '.lyrics-section' },
    'https://www.cifraclub.com.br': { lyrics: '.letra-l' },
    'https://www.vagalume.com.br': { lyrics: '#lyrics' }
  };

  const parsed: IGoogleParsedLinks[] = [];

  linksArray.forEach((item) => {
    parsed.push({ baseUrl: item.key, selectors: selectors[item.key], url: item.link})
  });

  return parsed;
}

const getLyrics = async (title: string) => {
  const links = await getLinksFromGoogle(title);

  const lyrics: ParserResult[] = [];

  for (const link of links) {
    if (!link.selectors) continue;

    const response = await axios.get(link.url).catch(() => undefined);

    if (!response) continue;

    const $ = load(response.data);

    try {
      const lyric = parse($, link);
      if (!lyric) continue;

      lyrics.push(lyric);
    } catch(err) {
      console.debug(err instanceof Error ? err.message : 'Something went wrong! Try debugging :(');
    }
  } 

  return lyrics;
}

const home = (_req: Request, res: Response) => {
  res.json({ ok: false, message: 'Search endpoint!' });
}

const title = async (req: Request, res: Response) => {
  const title = req.params.title;

  if (!title) {
    res.status(400).json({ ok: false, message: 'Title is a required param' });
    return;
  }
  
  const data = await getLyrics(title);

  res.json({ ok: true, data});
}

export { home, title };
