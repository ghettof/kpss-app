export const KONULAR = [
  {
    id: 1,
    baslik: '📈 Pay ve Sermaye Piyasalarına Giriş',
    renk: '#4A90D9',
    icerik: [
      {
        altBaslik: 'Pay Nedir?',
        maddeler: [
          'Pay, bir anonim şirketin sermayesinin en küçük ve eşit parçasıdır.',
          'Şirketi büyük bir pizzaya benzetirsek, her bir dilim bir "pay"dır.',
          'Pay sahibine iki temel hak tanır: Mülkiyet hakkı ve söz hakkı.',
          'İtibari değer (nominal değer): Payın üzerinde yazan değerdir, en az 1 Kuruş olabilir.',
          'Halka açık şirketlerde itibari değer genellikle 1 TL olarak standartlaşmıştır.',
          'Kaydileştirme: 2012 yılından itibaren fiziksel hisse senedi basma uygulaması terk edilmiştir.',
          'MKK (Merkezi Kayıt Kuruluşu): Payları dijital olarak kaydeden ve izleyen kurumdur.',
        ],
      },
      {
        altBaslik: 'Pay vs. Borçlanma Aracı (Tahvil) Karşılaştırması',
        maddeler: [
          'PAY: Şirketin sahibisiniz, vadesi yoktur, sabit getirisi yoktur, daha risklidir, söz hakkınız vardır.',
          'TAHVİL: Şirketin alacaklısısınız, belirli vadesi vardır, sabit getirisi (faiz) vardır, daha az risklidir, söz hakkınız yoktur.',
          'Risk ve getiri doğru orantılıdır.',
        ],
      },
      {
        altBaslik: 'Pay Çeşitleri - Nama vs. Hamiline',
        maddeler: [
          'Nama Yazılı Paylar: Pay sahibinin kim olduğu şirket pay defterine ismen kaydedilir.',
          'Hamiline Yazılı Paylar: Üzerinde sahip ismi yazmaz. Senedi elinde bulunduran kişi payın sahibi kabul edilir.',
          'Önemli Kural: Bedeli tamamen ödenmemiş paylar için hamiline yazılı pay senedi çıkarılması YASAKTIR.',
        ],
      },
      {
        altBaslik: 'Adi vs. İmtiyazlı Paylar',
        maddeler: [
          'Adi Paylar: Sahiplerine eşit ve standart haklar tanır.',
          'İmtiyazlı Paylar: Kâr payı, oy hakkı, yönetim kurulunda temsil, tasfiye payı gibi konularda ayrıcalık tanır.',
          'Oyda İmtiyaz: Bir paya en çok 15 oy hakkı tanınabilir.',
        ],
      },
      {
        altBaslik: 'Bedelli vs. Bedelsiz Sermaye Artırımı',
        maddeler: [
          'Bedelli Sermaye Artırımı: Şirkete dışarıdan yeni para (nakit) girer. Ortaklar rüçhan hakkını kullanarak yeni pay alır.',
          'Bedelsiz Sermaye Artırımı: Şirketin iç kaynakları (geçmiş yıl kârları, yedek akçeler) sermayeye eklenir. Ortaklara bedava pay verilir.',
        ],
      },
      {
        altBaslik: 'Rüçhan Hakkı (Yeni Pay Alma Hakkı)',
        maddeler: [
          'Rüçhan hakkı, mevcut ortakların yeni payları öncelikli olarak satın alma hakkıdır.',
          'Amaç: Mevcut ortakların pay oranlarının ve söz haklarının azalmasını önlemektir.',
          'Rüçhan hakkının kullanım süresi genellikle 15-60 gündür. Bu sürede kullanılmazsa hak YANAR.',
        ],
      },
      {
        altBaslik: 'Azınlık Pay Sahibinin Özel Hakları',
        maddeler: [
          'Azınlık: Halka kapalı şirketlerde sermayenin en az %10\'una, halka açık şirketlerde en az %5\'ine sahip olanlardır.',
          'Genel Kurulu Toplantıya Çağırma ve Gündeme Madde Ekletme Hakkı',
          'Özel Denetçi Atanmasını İsteme Hakkı (en güçlü azınlık hakkı)',
          'Finansal Tabloların Müzakeresini Erteleme Hakkı',
        ],
      },
      {
        altBaslik: 'Katılma İntifa Senedi (KİS)',
        maddeler: [
          'KİS, sahibine oy hakkı vermez, sadece mali haklar tanır.',
          'Şirketler için yönetim kontrolünü riske atmadan fon toplama aracıdır.',
          'Halka açık şirketler KİS sahiplerine yeni pay alma hakkı tanıyamaz.',
        ],
      },
    ],
  },
  {
    id: 2,
    baslik: '📜 Pay Tebliği ve Halka Arz',
    renk: '#E67E22',
    icerik: [
      {
        altBaslik: 'İhraççı vs. Halka Arz Eden',
        maddeler: [
          'İhraççı: Sermaye piyasası aracını çıkaran şirketin kendisidir (tüzel kişilik).',
          'Halka Arz Eden: Kendi sahip olduğu hisseleri halka satmak için başvuran mevcut ortaklardır.',
          'Sermaye Artırımı Yoluyla Halka Arz: Para şirketin kasasına girer.',
          'Mevcut Payların Satışı Yoluyla Halka Arz: Para ortakların cebine girer.',
        ],
      },
      {
        altBaslik: 'Halka Arz Sonrası Pay Satış Yasağı',
        maddeler: [
          'Klasik Kural: Büyük ortaklar (sermayenin %5+ fazlası) 1 yıl boyunca hisselerini arz fiyatının altında satamaz.',
          'Yeni Kural (19/09/2024): Tüm yatırımcılar 90 gün boyunca payları borsa dışında satamaz.',
          'Yeni Kural: Mevcut ortaklar 180 gün boyunca payları borsada DAHİL satamaz.',
        ],
      },
      {
        altBaslik: 'Ek Satış Hakkı (Greenshoe)',
        maddeler: [
          'Halka arzın piyasa değeri 950 Milyon TL\'nin altındaysa ZORUNLUDUR.',
          'Halka arz edilen payların nominal değerinin %20\'si kadar ek pay satışa hazır bekletilir.',
          'Ek paylar ANCAK hisse fiyatı arz fiyatının ÜZERİNE çıkarsa satılabilir.',
        ],
      },
      {
        altBaslik: 'Fiyat İstikrarını Sağlayıcı İşlemler',
        maddeler: [
          'Amaç: Halka arz fiyatının altına düşen hisse fiyatına alım yaparak destek olmak.',
          'Süre: En çok 30 GÜN',
          'Limit: Halka arzdan elde edilen brüt gelirin %5\'i',
        ],
      },
      {
        altBaslik: 'Girişim Sermayesi Pazarı (GSP)',
        maddeler: [
          'Henüz ana lige hazır olmayan, büyüme potansiyeli yüksek genç şirketler için tasarlanmıştır.',
          'Paylar halka arz edilmez, sadece NİTELİKLİ YATIRIMCILARA satılır.',
          'GSP\'ye kabul edilen şirket, en geç 5 YIL içinde ana pazarlardan birine geçmek zorundadır.',
        ],
      },
    ],
  },
  {
    id: 3,
    baslik: '📜 Kıymetli Evrak ve Menkul Kıymetler',
    renk: '#27AE60',
    icerik: [
      {
        altBaslik: 'Kıymetli Evrak Nedir?',
        maddeler: [
          'Tanım: İçerdikleri hak, senetten ayrı olarak ileri sürülemediği gibi başkalarına da devredilemez.',
          'Mücerretlik (Soyutluk) İlkesi: Kıymetli evrak, onu doğuran asıl hukuki ilişkiden bağımsız hale gelir.',
        ],
      },
      {
        altBaslik: 'Kıymetli Evrakın İçerdiği Hak Türleri',
        maddeler: [
          'Alacak Hakkı: Bir kişiden belirli miktar para alacağını gösterir. Örnek: Çek, Bono, Poliçe, Tahvil',
          'Ortaklık Hakkı: Bir şirkete ortak olduğunu gösterir. Örnek: Hisse senetleri',
          'Ayni Hak: Doğrudan bir mal üzerindeki hakkı temsil eder. Örnek: Makbuz senedi',
        ],
      },
      {
        altBaslik: 'Menkul Kıymet Nedir?',
        maddeler: [
          'Yatırım amacı güdülen kıymetli evraklardır.',
          'Para, çek, poliçe ve bono menkul kıymet tanımının DIŞINDA bırakılmıştır.',
          'Her menkul kıymet aslında bir kıymetli evraktır. Ancak her kıymetli evrak menkul kıymet değildir.',
        ],
      },
    ],
  },
  {
    id: 4,
    baslik: '📊 Borçlanma Araçları Tebliği',
    renk: '#8E44AD',
    icerik: [
      {
        altBaslik: 'Borçlanma Araçları Türleri',
        maddeler: [
          'Finansman Bonosu: Vadesi 1 yıldan kısa (30-364 gün), kısa vadeli nakit ihtiyaçları için.',
          'Tahvil: Vadesi 1 yıldan uzun (365 gün ve üzeri), uzun vadeli yatırım projeleri için.',
          'Paya Dönüştürülebilir Tahvil (PDT): Yatırımcıya vade sonunda tahvili hisseye çevirme hakkı verir.',
          'Değiştirilebilir Tahvil (DT): Yatırımcıya tahvilini başka bir şirketin hissesiyle değiştirme hakkı verir.',
          'Kıymetli Maden Bonoları: Altın, gümüş gibi madenlere endeksli bonolar.',
        ],
      },
      {
        altBaslik: 'İhraç Limiti Hesaplaması',
        maddeler: [
          'Halka Açık Ortaklıklar: İhraç Limiti ≤ Özkaynaklar x 5',
          'Halka Açık Olmayan Ortaklıklar: İhraç Limiti ≤ Özkaynaklar x 3',
          'Yatırım yapılabilir seviyede kredi notuna sahip BANKALAR için limitler %100 artırılır.',
          'Hesaplamada mutlaka bağımsız denetimden geçmiş konsolide tablolar esas alınır.',
        ],
      },
      {
        altBaslik: 'SPK Kurul Ücreti',
        maddeler: [
          'Vadesi 179 güne kadar: On binde 5',
          'Vadesi 180-364 gün: On binde 7',
          'Vadesi 365-730 gün: Binde 1',
          'Vadesi 730 günden uzun: On binde 15',
        ],
      },
    ],
  },
  {
    id: 5,
    baslik: '🏷️ Tahviller ve Özel Türleri',
    renk: '#C0392B',
    icerik: [
      {
        altBaslik: 'Paya Dönüştürülebilir Tahvil (PDT)',
        maddeler: [
          'Başlangıçta normal tahvil gibidir, ancak yatırımcıya vade sonunda hisseye dönüşme hakkı verir.',
          'Minimum Vade: 365 günden az olamaz.',
          'En Erken Dönüşüm: Alım tarihinden itibaren en az 365 gün geçmelidir.',
          'Dönüşüm masraflarının TAMAMI ihraççı şirket tarafından karşılanır. Yatırımcıdan masraf alınamaz!',
        ],
      },
      {
        altBaslik: 'Değiştirilebilir Tahvil (DET) - PDT\'den Farkı',
        maddeler: [
          'PDT: A Şirketi\'nin borcu → A Şirketi\'nin kendi hissesine dönüşür.',
          'DET: A Şirketi\'nin borcu → B Şirketi\'nin hissesiyle değiştirilir.',
          'DET için de minimum vade 365 gün, en erken değiştirme 365 gün, masraflar ihraççıya ait.',
        ],
      },
      {
        altBaslik: 'Finansman Bonosu',
        maddeler: [
          'Vadesi 30 günden az ve 364 günden fazla OLAMAZ.',
          'Tahvilden ayıran en net özellik: VADE SÜRESİ (30-364 gün arası).',
          'Genellikle iskonto edilerek satılır.',
        ],
      },
    ],
  },
  {
    id: 6,
    baslik: '💰 Yatırım Fonları - Temel Kavramlar',
    renk: '#F39C12',
    icerik: [
      {
        altBaslik: 'Yatırım Ortaklığı vs. Yatırım Fonu',
        maddeler: [
          'Yatırım Ortaklığı: Ayrı ve bağımsız bir TÜZEL KİŞİLİĞİ olan anonim şirkettir.',
          'Yatırım Fonu: Tüzel kişiliği OLMAYAN, sadece bir mal varlığı yığınıdır.',
        ],
      },
      {
        altBaslik: 'Fon Mal Varlığının Korunması',
        maddeler: [
          'PYŞ iflas etse, borca batsa veya vergi borcunu ödeyemese bile,',
          'Fonun içindeki paralara ve varlıklara KESİNLİKLE dokunulamaz.',
          'Fon mal varlığı haczedilemez, rehin gösterilemez, iflas masasına dahil edilemez.',
        ],
      },
      {
        altBaslik: 'Kolektif Yatırımın 4 Süper Gücü',
        maddeler: [
          '1. Profesyonel Yönetim: Uzman ekip tarafından yönetilir.',
          '2. Maliyet Avantajı (Ölçek Ekonomisi): Toptan alım avantajı, düşük komisyonlar.',
          '3. Riskin Dağıtılması: Tek bir hisse yerine 50 farklı varlığa yatırım.',
          '4. Ek Kazanç İmkanları: Ödünç verme, repo gibi işlemlerden ek getiri.',
        ],
      },
    ],
  },
  {
    id: 7,
    baslik: '🏢 Şemsiye Fon ve Fon Türleri',
    renk: '#4A90D9',
    icerik: [
      {
        altBaslik: 'Şemsiye Fon Zorunluluğu ve İstisnaları',
        maddeler: [
          'Kuruluş Zorunluluğu: Yatırım fonlarının şemsiye fon şeklinde kurulması ZORUNLUDUR.',
          'İsteğe Bağlı: Gayrimenkul Yatırım Fonları (GYF) ve Girişim Sermayesi Yatırım Fonları (GSYF)',
          'Kesinlikle YASAK: Borsa Yatırım Fonları (BYF) şemsiye fon şeklinde KURULAMAZ!',
        ],
      },
      {
        altBaslik: 'Fon Türleri ve Temel Yatırım Kuralları',
        maddeler: [
          'Borçlanma Araçları Fonu: En az %80\'i yerli/yabancı tahvil/bono.',
          'Hisse Senedi Fonu: En az %80\'i yerli/yabancı hisse senetleri.',
          'Kıymetli Madenler Fonu: En az %80\'i altın/gümüş ve dayalı araçlar.',
          'Para Piyasası Fonu: Ortalama vade en fazla 45 gün, likit araçlar.',
          'Garantili Fon: Vade sonunda anapara garantisi vardır (garantör taahhüdü).',
          'Koruma Amaçlı Fon: Anapara korumayı amaçlar, garanti YOKTUR.',
          'Serbest Fon: Sadece NİTELİKLİ YATIRIMCILARA satılır.',
        ],
      },
      {
        altBaslik: 'Şemsiye Fon Kuruluş Süreci',
        maddeler: [
          'SPK Kararı: Belgeler eksiksiz sunulduktan sonra SPK\'nın karar süresi 2 AY.',
          'Tescil ve İlan: SPK onayını tebellüğden itibaren 6 İŞ GÜNÜ içinde tescil ve ilan.',
          'İlk Fon İhracı: Şemsiye fon kurulduktan sonra en geç 3 AY içinde ilk alt fon için başvuru yapılmalı.',
        ],
      },
    ],
  },
  {
    id: 8,
    baslik: '🔄 Katılma Payı İşlemleri ve Fiyatlama',
    renk: '#E67E22',
    icerik: [
      {
        altBaslik: 'Fiyatlama Yöntemleri',
        maddeler: [
          'İleri Fiyatlama (Standart): Emir verdiğinizde işlem, o günün sonunda hesaplanacak İLK YENİ FİYAT üzerinden gerçekleşir.',
          'Son Fiyatla İşlem: Sadece PARA PİYASASI FONLARI ve KISA VADELİ BORÇLANMA ARAÇLARI FONLARI için geçerlidir.',
        ],
      },
      {
        altBaslik: 'TEFAS',
        maddeler: [
          'Farklı portföy yönetim şirketlerinin fonlarını, tek bir banka veya aracı kurum üzerinden alıp satmayı sağlayan merkezi platformdur.',
          'Zorunlu Katılım: Özel fon, serbest fon, GYF, GSYF, garantili ve koruma amaçlı fonlar dışındaki TÜM FONLAR TEFAS\'a üye olmak ZORUNDADIR.',
          'TEFAS Komisyonu: Genel komisyon %35, özel anlaşma ile azami %65.',
        ],
      },
    ],
  },
  {
    id: 9,
    baslik: '🛡️ Fon Portföyü Sınırlamaları',
    renk: '#27AE60',
    icerik: [
      {
        altBaslik: 'Temel Limitler',
        maddeler: [
          'Tek İhraççı Sınırı: Fon toplam değerinin %10\'u (Devlet varlıkları %25)',
          'Yoğunlaşma Sınırı: %5\'ten fazla yatırım yapılan ihraççıların toplamı fon değerinin %40\'ını aşamaz.',
          'Grup Şirketi Sınırı: Fon toplam değerinin %20\'si',
          'Mülkiyet Sınırı: Bir şirketin sermayesinin/oy hakkının %10\'unu aşamaz.',
        ],
      },
      {
        altBaslik: 'Finansal İşlem Limitleri',
        maddeler: [
          'Kredi Çekme / Borçlanma: Fon toplam değerinin %10\'u',
          'Menkul Kıymet Ödünç Verme: Portföydeki menkul kıymetlerin piyasa değerinin %50\'si',
          'Kıymetli Maden Ödünç Verme: Portföydeki madenlerin piyasa değerinin %75\'i',
        ],
      },
      {
        altBaslik: 'Kesin Yasaklar',
        maddeler: [
          'Açığa Satış YAPAMAZ',
          'Kredili Menkul Kıymet İşlemi YAPAMAZ',
          'Opsiyon Satıcısı OLAMAZ (Serbest Fonlar hariç)',
        ],
      },
    ],
  },
  {
    id: 10,
    baslik: '🔄 Türev Araçlar',
    renk: '#8E44AD',
    icerik: [
      {
        altBaslik: 'Forward vs. Futures',
        maddeler: [
          'Forward → Tezgahüstü (OTC), Esnek, Yüksek kredi riski, Vade sonunda hesaplaşma',
          'Futures → Borsa (VİOP), Standart, Takas merkezi güvencesi, Günlük kâr/zarar',
          'Futures\'da temerrüt riski neredeyse SIFIRLANIR.',
        ],
      },
      {
        altBaslik: 'Opsiyon Sözleşmeleri',
        maddeler: [
          'Opsiyon Alıcısı: Primi öder, HAKKI alır. Maksimum zararı prim kadardır.',
          'Opsiyon Satıcısı: Primi alır, YÜKÜMLÜLÜK altına girer.',
          'Call (Alım Opsiyonu): Belirlenen fiyattan ALMA hakkı verir.',
          'Put (Satım Opsiyonu): Belirlenen fiyattan SATMA hakkı verir.',
          'Amerikan Tipi: Vade sonuna kadar HERHANGİ BİR ZAMANDA kullanılabilir.',
          'Avrupa Tipi: SADECE VADE SONUNDA kullanılabilir.',
        ],
      },
      {
        altBaslik: 'Türev Araçların 3 Temel Amacı',
        maddeler: [
          '1. Riskten Korunma (Hedging): En temel ve en meşru kullanım amacı.',
          '2. Spekülasyon: Risk alarak kâr elde etmek.',
          '3. Arbitraj: Fiyat farklılıklarından risksiz kâr elde etmek.',
        ],
      },
      {
        altBaslik: 'Türkiye\'de Türev Piyasaları Tarihçesi',
        maddeler: [
          'VOBAŞ (2005): İzmir\'de kuruldu. SADECE FUTURES işlem gördü, opsiyon HİÇ işlem görmedi!',
          '2013: VOBAŞ, İMKB ve İstanbul Altın Borsası birleşerek Borsa İstanbul (BİAŞ) kuruldu.',
          'VİOP: Türkiye\'de tüm organize türev işlemler VİOP\'ta gerçekleşir.',
          'İlk opsiyon işlemleri: Aralık 2012 - VİOP (VOBAŞ\'ta değil!)',
        ],
      },
    ],
  },
  {
    id: 11,
    baslik: '🏛️ Kamu Borçlanması',
    renk: '#C0392B',
    icerik: [
      {
        altBaslik: 'Devletin 3 Temel Finansman Alternatifi',
        maddeler: [
          '1. Vergiler: En sağlıklı ve en sağlam gelir kaynağı.',
          '2. Emisyon (Para Basma): En tehlikeli yol. Enflasyona yol açar.',
          '3. Borçlanma: En yaygın finansman aracı.',
        ],
      },
      {
        altBaslik: '4749 Sayılı Kanun - Borçlanma Limiti',
        maddeler: [
          'Borçlanmada nihai yetki: HAZİNE VE MALİYE BAKANI',
          'Limit: Yıllık bütçe açığı kadar net borç kullanımı yapılabilir.',
          'Bakan: Limiti en fazla %5 artırabilir.',
          'Cumhurbaşkanı: İlave %5 daha artırabilir.',
          'Toplam: %10 ek artırım imkanı.',
        ],
      },
      {
        altBaslik: 'İç Borç vs. Dış Borç',
        maddeler: [
          'İç Borç: Türkiye\'de yerleşiklerden, genellikle TL cinsi.',
          'Dış Borç: Yurt dışındaki yerleşik olmayanlardan, genellikle döviz cinsi.',
          'KRİTİK: Borcun iç/dış olduğunu belirleyen PARANIN CİNSİ DEĞİL, İHRAÇ EDİLDİĞİ PİYASADIR!',
          'Türkiye\'de dolar cinsi tahvil → İÇ BORÇ',
          'Londra\'da TL cinsi tahvil → DIŞ BORÇ',
        ],
      },
      {
        altBaslik: 'DİBS Türleri',
        maddeler: [
          'Hazine Bonosu: Vadesi 1 yıldan kısa (364 güne kadar)',
          'Devlet Tahvili: Vadesi 1 yıl ve daha uzun (365 gün ve üzeri)',
          'Kira Sertifikası (Sukuk): Faizsiz alternatif, kira gelirinden pay verir.',
          'İkisinin ortak adı: DİBS (Devlet İç Borçlanma Senedi)',
        ],
      },
      {
        altBaslik: 'Kim Hangi Kurala Tabi?',
        maddeler: [
          'Hazine (Devlet): SPK mevzuatına TABİ DEĞİL (istisna)',
          'Belediyeler: Hem Hazine izni HEM SPK kuralları (ÇİFTE DENETİM)',
          'KİT\'ler: SPK\'ya tabi, kendi kanunlarındaki limitler geçerli.',
          'NOT: Hazine\'nin verdiği izin, borca garanti verdiği anlamına gelmez.',
        ],
      },
      {
        altBaslik: 'Getiri Eğrisi',
        maddeler: [
          'Normal (Yukarı Eğimli): Sağlıklı, büyüyen ekonominin göstergesi.',
          'Ters (Aşağı Eğimli): Resesyon habercisi. Kısa vadeli faizler > uzun vadeli faizler.',
          'Düz (Yatay): Belirsizlik dönemi göstergesi.',
        ],
      },
    ],
  },
];