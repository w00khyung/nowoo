export interface OsmlibResponse {
  status: string;
  code: number;
  messages: any[];
  result: {
    exactMatchInfo: {
      itemInfo: ItemInfo[];
      mobInfo: MobInfo[];
    };
    itemInfo: any[];
    mobInfo: any[];
  };
}

export interface ItemInfo {
  mobsThatDropTheItem: MobDrop[];
  itemId: number;
  itemName: string;
  itemDescription: string;
  itemEquipGroup: string;
  itemTypeInfo: {
    overallCategory: string;
    category: string;
    subCategory: string;
    lowItemId: number;
    highItemId: number;
  };
  itemMeta: {
    only: boolean;
    equip: {
      reqSTR: number;
      reqDEX: number;
      reqINT: number;
      reqLUK: number;
      reqJob: number;
      reqLevel: number;
      tuc: number;
      incPAD: number;
      incEVA: number;
      attack: number;
      attackSpeed: number;
      islot: string;
      vslot: string;
      vslots: string[];
      islots: string[];
    };
    cash: {
      cash: boolean;
    };
    shop: {
      price: number;
    };
    chair: {
      reqLevel: number;
    };
    itemMinAmount: number;
    itemMaxAmount: number;
  };
}

interface MobDrop {
  mobId: string;
  mobName: string;
  mobDescription: string;
  mobMeta: {
    isBodyAttack: boolean;
    level: number;
    maxHP: number;
    maxMP: number;
    speed: number;
    physicalDamage: number;
    physicalDefense: number;
    magicDamage: number;
    magicDefense: number;
    accuracy: number;
    evasion: number;
    exp: number;
    isUndead: boolean;
    minimumPushDamage: number;
    elementalAttributes: string;
    summonType: number;
    accuracyRequiredToHit: number;
  };
  dropChance: string;
  drops: {
    every: string;
    in: string;
  };
}

export interface MobInfo {
  mobId: string;
  mobName: string;
  mobDescription: string;
  mobMeta: {
    isBodyAttack: boolean;
    level: number;
    maxHP: number;
    maxMP: number;
    speed: number;
    physicalDamage: number;
    physicalDefense: number;
    magicDamage: number;
    magicDefense: number;
    accuracy: number;
    evasion: number;
    exp: number;
    isUndead: boolean;
    minimumPushDamage: number;
    elementalAttributes: string;
    summonType: number;
    accuracyRequiredToHit: number;
  };
  drops: {
    money: Money[];
    items: Item[];
  };
}

interface Money {
  amount: number;
  itemId: number;
  dropChance: string;
  drops: {
    every: string;
    in: string;
  };
}

interface Item {
  itemId: number;
  itemName: string;
  itemDescription: string;
  itemTypeInfo: {
    overallCategory: string;
    category: string;
    subCategory: string;
    lowItemId: number;
    highItemId: number;
  };
  itemMeta: {
    only: boolean;
    equip?: Equip;
    cash?: {
      cash: boolean;
    };
    shop?: {
      price: number;
    };
    chair?: {
      reqLevel: number;
    };
  };
  itemMinAmount: number;
  itemMaxAmount: number;
  dropChance: string;
  drops: {
    every: string;
    in: string;
  };
}

interface Equip {
  reqSTR?: number;
  reqDEX?: number;
  reqINT?: number;
  reqLUK?: number;
  reqJob?: number;
  reqLevel?: number;
  tuc?: number;
  incPDD?: number;
  incMDD?: number;
  islot?: string;
  vslot?: string;
  vslots?: string[];
  islots?: string[];
  incDEX?: number;
  incPAD?: number;
  incEVA?: number;
  attack?: number;
  attackSpeed?: number;
}

export interface ItemDetails {
  name: string;
  description: string;
}
