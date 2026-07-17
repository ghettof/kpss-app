export interface KonuNotu {
  id: string;
  kategori: string;
  on_yuz: string;
  arka_yuz: string;
  zorluk: string;
  aktif: boolean;
}

export const konuTurkceData: KonuNotu[] = [
  { id: 'turkce-1-1', kategori: 'Ses Bilgisi', on_yuz: 'Büyük ünlü uyumu', arka_yuz: 'Kelimedeki ünlüler ya hep kalın ya da hep ince olmalı', zorluk: 'orta', aktif: true },
  { id: 'turkce-1-2', kategori: 'Ses Bilgisi', on_yuz: 'Küçük ünlü uyumu', arka_yuz: 'Düz ünlülerden sonra düz, yuvarlaktan sonra dar-yuvarlak veya düz gelir', zorluk: 'orta', aktif: true },
  { id: 'turkce-1-3', kategori: 'Ses Bilgisi', on_yuz: 'Ünsüz benzeşmesi', arka_yuz: 'f,s,t,k,ç,ş,h,p sonrası c,d,g → ç,t,k olur', zorluk: 'orta', aktif: true },
  { id: 'turkce-1-4', kategori: 'Ses Bilgisi', on_yuz: 'Türkçe eklemeli bir dildir', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-1-5', kategori: 'Ses Bilgisi', on_yuz: '8 ünlü harf', arka_yuz: 'a, e, ı, i, o, ö, u, ü', zorluk: 'orta', aktif: true },
  { id: 'turkce-2-1', kategori: 'Cümle Ögeleri', on_yuz: 'Özne', arka_yuz: 'Yüklemin bildirdiği işi yapan (kim? ne?)', zorluk: 'orta', aktif: true },
  { id: 'turkce-2-2', kategori: 'Cümle Ögeleri', on_yuz: 'Yüklem', arka_yuz: 'Öznenin yaptığını bildiren unsur — cümlenin sonunda', zorluk: 'orta', aktif: true },
  { id: 'turkce-2-3', kategori: 'Cümle Ögeleri', on_yuz: 'Nesne', arka_yuz: 'Eylemin etkisini taşıyan öge (kimi? neyi?)', zorluk: 'orta', aktif: true },
  { id: 'turkce-2-4', kategori: 'Cümle Ögeleri', on_yuz: 'Zarf', arka_yuz: 'Eylemi niteleyen kelime (nasıl? nerede? ne zaman?)', zorluk: 'orta', aktif: true },
  { id: 'turkce-2-5', kategori: 'Cümle Ögeleri', on_yuz: 'Vurgu', arka_yuz: 'Yüklemden hemen önceki ögededir', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-1', kategori: 'Sözcük Türleri', on_yuz: 'İsim', arka_yuz: 'Varlıkları ve kavramları karşılar', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-2', kategori: 'Sözcük Türleri', on_yuz: 'Sıfat', arka_yuz: 'İsimleri niteler (güzel ev)', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-3', kategori: 'Sözcük Türleri', on_yuz: 'Zamir', arka_yuz: 'İsmin yerine kullanılır (ben, sen, o...)', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-4', kategori: 'Sözcük Türleri', on_yuz: 'Fiil/Eylem', arka_yuz: 'İş, oluş, durum bildirir', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-5', kategori: 'Sözcük Türleri', on_yuz: 'Zarf', arka_yuz: 'Fiili, sıfatı veya zarfı niteler', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-6', kategori: 'Sözcük Türleri', on_yuz: 'Edat', arka_yuz: 'Tek başına anlamı olmaz, cümlede anlam kazanır', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-7', kategori: 'Sözcük Türleri', on_yuz: 'Bağlaç', arka_yuz: 'Kelime/cümleleri bağlar (ve, ama, fakat)', zorluk: 'orta', aktif: true },
  { id: 'turkce-3-8', kategori: 'Sözcük Türleri', on_yuz: 'Ünlem', arka_yuz: 'Duygu ve heyecanları ifade eder', zorluk: 'orta', aktif: true },
  { id: 'turkce-4-1', kategori: 'Fiilimsi (Eylemsi)', on_yuz: 'Fiil kökünden türeyip isim, sıfat veya zarf görevinde kullanılır', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-4-2', kategori: 'Fiilimsi (Eylemsi)', on_yuz: 'İsim-fiil (mastar)', arka_yuz: '-mak, -me, -iş (gitmek, gitme, gidiş)', zorluk: 'orta', aktif: true },
  { id: 'turkce-4-3', kategori: 'Fiilimsi (Eylemsi)', on_yuz: 'Sıfat-fiil (ortaç)', arka_yuz: '-en, -ar, -mez, -dik, -ecek', zorluk: 'orta', aktif: true },
  { id: 'turkce-4-4', kategori: 'Fiilimsi (Eylemsi)', on_yuz: 'Zarf-fiil (ulaç)', arka_yuz: '-arak, -ince, -ip, -ken', zorluk: 'orta', aktif: true },
  { id: 'turkce-4-5', kategori: 'Fiilimsi (Eylemsi)', on_yuz: 'Fiilimsiler yüklem olamaz', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-1', kategori: 'Anlam Bilgisi', on_yuz: 'Gerçek anlam', arka_yuz: 'Kelimenin temel anlamı', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-2', kategori: 'Anlam Bilgisi', on_yuz: 'Mecaz anlam', arka_yuz: 'Kelimenin gerçek dışı kullanımı', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-3', kategori: 'Anlam Bilgisi', on_yuz: 'Terim anlam', arka_yuz: 'Bir bilim dalında özel kullanım', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-4', kategori: 'Anlam Bilgisi', on_yuz: 'Deyim', arka_yuz: 'En az iki kelimeden oluşan kalıplaşmış ifade', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-5', kategori: 'Anlam Bilgisi', on_yuz: 'Atasözü', arka_yuz: 'Toplumun deneyimlerinden doğan kalıplaşmış söz', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-6', kategori: 'Anlam Bilgisi', on_yuz: 'Kişileştirme (Teşhis)', arka_yuz: 'İnsan dışı varlıklara insani özellikler verilmesi', zorluk: 'orta', aktif: true },
  { id: 'turkce-5-7', kategori: 'Anlam Bilgisi', on_yuz: 'Kaligram', arka_yuz: 'Yazının görsel forma dönüştüğü şiir türü', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-1', kategori: 'Yazım Kuralları', on_yuz: '"Her şey" ayrı yazılır', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-2', kategori: 'Yazım Kuralları', on_yuz: 'Bağlaç "de/da" ayrı yazılır', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-3', kategori: 'Yazım Kuralları', on_yuz: 'Soru eki "mı/mi" ayrı yazılır', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-4', kategori: 'Yazım Kuralları', on_yuz: 'Özel isimler büyük harfle başlar', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-5', kategori: 'Yazım Kuralları', on_yuz: 'Birleşik fiiller bitişik yazılır', arka_yuz: '', zorluk: 'orta', aktif: true },
  { id: 'turkce-6-6', kategori: 'Yazım Kuralları', on_yuz: 'Anlam kayması', arka_yuz: 'Fiilin bir kipi ifade edip başka kipi kastetmesi (Yarın geliyorum → gelecek zaman)', zorluk: 'orta', aktif: true },
];
