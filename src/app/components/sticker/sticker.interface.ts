export interface ICountry {
  name: string;
  icon: string;
  stickers: ISticker[];
}

export interface ISticker {
  code: string;
  active: boolean;
}

export interface IGroup {
  name: string;
  country?: ICountry[];
}

export interface ISection {
  name: string;
  icon?: string;
  group?: IGroup[];
  stickers?: ISticker[];
}