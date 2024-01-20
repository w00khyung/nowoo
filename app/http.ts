import * as cheerio from 'cheerio';

import type { ItemDetails, ItemInfo, MobInfo, OsmlibResponse } from './types';
import { DocItem } from './mock';

export async function getOsmlibDataByQuery(query: string): Promise<OsmlibResponse> {
  const response = await fetch(
    `https://fdhgxk22gh.execute-api.us-east-1.amazonaws.com/production/api/v1/search?q=${query}`,
    {
      method: 'GET',
    }
  );

  const data = (await response.json()) as OsmlibResponse;

  return data;
}

export async function scrapeMapleItemDetails(code: string, type: 'monster' | 'item'): Promise<ItemDetails> {
  const searchType = {
    monster: 'monster',
    item: 'item',
  } as const;

  if (!searchType[type]) {
    throw new Error(`Invalid search type: ${type}`);
  }

  const url = `https://maple.inven.co.kr/dataninfo/${searchType[type]}/detail.php?code=${code}`;

  try {
    // Make a GET request to the URL using fetch
    const response = await fetch(url);

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    // Read the response text
    const html = await response.text();

    // Load the HTML content into cheerio
    const $ = cheerio.load(html);

    // Extract information from the HTML using selectors
    const itemName = $('h1[class="w326H"]').text().trim();
    const itemDescription = $('span[class="episode"]')
      .html()
      ?.replace(/.*<br\s*\/?>/i, '');

    return {
      name: itemName,
      description: itemDescription || '설명이 없습니다.',
    };
  } catch (error: Error) {
    throw new Error(`Failed to scrape ${url}. Error: ${error.message}`);
  }
}

export function transformItems(docItems: DocItem[], type: 'monster'): Promise<MobInfo[]>;
export function transformItems(docItems: DocItem[], type: 'item'): Promise<ItemInfo[]>;
export async function transformItems(docItems: DocItem[], type: 'monster' | 'item') {
  const itemDetails = [];

  for (const docItem of docItems) {
    const OsmlibItemDetail = await getOsmlibDataByQuery(docItem.name);
    const invenItemDetail = await scrapeMapleItemDetails(docItem.id, type);

    if (type === 'monster') {
      itemDetails.push({
        ...OsmlibItemDetail.result.exactMatchInfo.mobInfo[0],
        mobName: invenItemDetail.name,
        mobDescription: invenItemDetail.description,
      });
    }

    if (type === 'item') {
      itemDetails.push({
        ...OsmlibItemDetail.result.exactMatchInfo.itemInfo[0],
        itemName: invenItemDetail.name,
        itemDescription: invenItemDetail.description,
      });
    }
  }

  return itemDetails;
}
