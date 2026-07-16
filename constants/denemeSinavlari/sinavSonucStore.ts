import { DenemeSorusu } from './deneme1';

export interface SinavSonucu {
  denemeId: number;
  denemeBaslik: string;
  sorular: DenemeSorusu[];
  cevaplar: (number | null)[];
}

let sonSonuc: SinavSonucu | null = null;

export function sinavSonucuKaydet(sonuc: SinavSonucu) {
  sonSonuc = sonuc;
}

export function sinavSonucuGetir(): SinavSonucu | null {
  return sonSonuc;
}
