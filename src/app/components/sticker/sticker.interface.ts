export enum SectionType {
  ESPECIAIS = 'Especiais e mais',
  PAISES = 'Países',
  TEMPO = 'Linha do tempo'
}

export interface ICountry {
  name: string;
  icon: string;
  stickers: ISticker[];
}

export interface ISticker {
  code: string;
  qtde: number;
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