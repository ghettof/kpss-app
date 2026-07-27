import { konuCografyaTarimData } from './konuCografyaTarimData';

export interface KonuNotu {
  id: string;
  kategori: string;
  on_yuz: string;
  arka_yuz: string;
  zorluk: string;
  aktif: boolean;
}

const konuCografyaDataBase: KonuNotu[] = [
  { id: 'cografya-1-1', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: 'Yüz ölçümü', arka_yuz: '783.562 km² (Dünya\'da 37. büyük)', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-2', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: '81 il (son eklenen: Düzce)', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-3', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: '7 coğrafi bölge', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-4', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: 'En batı ili', arka_yuz: 'Edirne', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-5', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: 'En doğu ili', arka_yuz: 'Iğdır', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-6', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: 'En işlek sınır kapısı', arka_yuz: 'Kapıkule (Bulgaristan)', zorluk: 'orta', aktif: true },
  { id: 'cografya-1-7', kategori: 'Türkiye\'nin Genel Coğrafyası', on_yuz: 'En kalabalık şehir', arka_yuz: 'İstanbul (15 milyon+)', zorluk: 'orta', aktif: true },
  { id: 'cografya-2-1', kategori: 'Dağlar ve Ovalar', on_yuz: 'Türkiye\'nin en yüksek dağı', arka_yuz: 'Ağrı Dağı (5.137 m)', zorluk: 'orta', aktif: true },
  { id: 'cografya-2-2', kategori: 'Dağlar ve Ovalar', on_yuz: 'En genç volkanik arazi', arka_yuz: 'Manisa-Kula Tepeleri', zorluk: 'orta', aktif: true },
  { id: 'cografya-2-3', kategori: 'Dağlar ve Ovalar', on_yuz: 'En büyük delta ovası', arka_yuz: 'Çukurova (Seyhan ve Ceyhan)', zorluk: 'orta', aktif: true },
  { id: 'cografya-2-4', kategori: 'Dağlar ve Ovalar', on_yuz: 'Karstik aşınmanın en fazla görüldüğü plato', arka_yuz: 'Teke ve Taşeli', zorluk: 'orta', aktif: true },
  { id: 'cografya-2-5', kategori: 'Dağlar ve Ovalar', on_yuz: 'Buzullara rastlanmayan dağ', arka_yuz: 'Yıldız Dağları', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-1', kategori: 'Nehirler ve Göller', on_yuz: 'En uzun nehir', arka_yuz: 'Kızılırmak (1.355 km)', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-2', kategori: 'Nehirler ve Göller', on_yuz: 'Fırat ve Dicle', arka_yuz: 'Basra Körfezi\'ne dökülür', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-3', kategori: 'Nehirler ve Göller', on_yuz: 'En büyük göl', arka_yuz: 'Van Gölü (sodalı, karma yapılı)', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-4', kategori: 'Nehirler ve Göller', on_yuz: 'En büyük tatlı su gölü', arka_yuz: 'Beyşehir Gölü', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-5', kategori: 'Nehirler ve Göller', on_yuz: 'Tuz Gölü', arka_yuz: 'İç Anadolu Bölgesi', zorluk: 'orta', aktif: true },
  { id: 'cografya-3-6', kategori: 'Nehirler ve Göller', on_yuz: 'Marmara Denizi', arka_yuz: 'Çanakkale ve İstanbul Boğazı ile bağlantılı', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-1', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'Akdeniz iklimi', arka_yuz: 'Yazlar sıcak-kuru, kışlar ılık-yağışlı', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-2', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'En fazla yağış', arka_yuz: 'Karadeniz (yıllık 2000 mm+)', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-3', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'En az yağış', arka_yuz: 'Doğu Anadolu', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-4', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'Don olayı en az görülen bölge', arka_yuz: 'Akdeniz', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-5', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'Fön rüzgarı en etkili yer', arka_yuz: 'Doğu Karadeniz (Rize)', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-6', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'Rüzgar aşındırması en fazla', arka_yuz: 'İç Anadolu', zorluk: 'orta', aktif: true },
  { id: 'cografya-4-7', kategori: 'İklim ve Bitki Örtüsü', on_yuz: 'Orman yangını en çok', arka_yuz: 'Ege ve Akdeniz', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-1', kategori: 'Madenler ve Kaynaklar', on_yuz: 'En fazla altın', arka_yuz: 'Kışladağ Altın Madeni', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-2', kategori: 'Madenler ve Kaynaklar', on_yuz: 'En büyük alüminyum (boksit)', arka_yuz: 'Konya Seydişehir', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-3', kategori: 'Madenler ve Kaynaklar', on_yuz: 'Bakır madeni', arka_yuz: 'Kastamonu(Küre), Artvin(Murgul), Diyarbakır(Ergani)', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-4', kategori: 'Madenler ve Kaynaklar', on_yuz: 'Doğalgaz', arka_yuz: 'Hamitabat (Kırklareli), Çamurlu (Mardin)', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-5', kategori: 'Madenler ve Kaynaklar', on_yuz: 'Bor rezervlerinin %73\'ü Türkiye\'de', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-6', kategori: 'Madenler ve Kaynaklar', on_yuz: 'Demir-Çelik', arka_yuz: 'Karabük (taş kömürüne yakınlık)', zorluk: 'orta', aktif: true },
  { id: 'cografya-5-7', kategori: 'Madenler ve Kaynaklar', on_yuz: 'Tiftik keçisi', arka_yuz: 'Ankara ve çevresi', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-1', kategori: 'Dünya Coğrafyası', on_yuz: 'En yüksek şelale', arka_yuz: 'Angel Şelalesi (Venezuela, 979 m)', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-2', kategori: 'Dünya Coğrafyası', on_yuz: 'En uzun sıradağlar', arka_yuz: 'And Dağları (Güney Amerika)', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-3', kategori: 'Dünya Coğrafyası', on_yuz: 'En büyük ada', arka_yuz: 'Grönland', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-4', kategori: 'Dünya Coğrafyası', on_yuz: 'En büyük ikinci ada', arka_yuz: 'Yeni Gine', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-5', kategori: 'Dünya Coğrafyası', on_yuz: 'En kalabalık Müslüman ülke', arka_yuz: 'Endonezya', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-6', kategori: 'Dünya Coğrafyası', on_yuz: 'En büyük petrol rezervi', arka_yuz: 'Venezuela', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-7', kategori: 'Dünya Coğrafyası', on_yuz: 'Afrika\'da 54 bağımsız ülke var', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'cografya-6-8', kategori: 'Dünya Coğrafyası', on_yuz: 'Güney Afrika\'nın 3 başkenti', arka_yuz: 'Pretoria, Cape Town, Bloemfontein', zorluk: 'orta', aktif: true },
];

export const konuCografyaData: KonuNotu[] = [...konuCografyaDataBase, ...konuCografyaTarimData];
