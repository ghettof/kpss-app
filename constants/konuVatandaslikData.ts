export interface KonuNotu {
  id: string;
  kategori: string;
  on_yuz: string;
  arka_yuz: string;
  zorluk: string;
  aktif: boolean;
}

export const konuVatandaslikData: KonuNotu[] = [];
