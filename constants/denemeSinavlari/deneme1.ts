export interface DenemeSorusu {
  id: number;
  soru: string;
  secenekler: string[]; // ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."]
  cevap: number; // 0=A, 1=B, 2=C, 3=D, 4=E
  aciklama: string;
}

export const deneme1Baslik = "İslamiyet Öncesi Türk Devletleri";

export const deneme1: DenemeSorusu[] = [
  {
    id: 1,
    soru: "Çin kaynaklarında \"Miğfer\" anlamına gelen ve tarihte Türk adını bir devlet adı olarak ilk kez kullanan topluluk aşağıdakilerden hangisidir?",
    secenekler: ["A) Hunlar", "B) Göktürkler", "C) Avarlar", "D) Uygurlar", "E) Hazarlar"],
    cevap: 1,
    aciklama: "Çin kaynaklarında Türk kelimesinin anlamı \"Miğfer\" olarak geçmektedir. Tarihte Türk adını siyasi bir devlet adı olarak ilk kez kullanan devlet ise Göktürk Devleti'dir.",
  },
  {
    id: 2,
    soru: "Hazarların, İslam ordularının Kafkasya üzerinden kuzeye doğru ilerlemesini engelleyerek Doğu Avrupa'nın İslamlaşmasını geciktiren temel askeri faaliyeti aşağıdakilerden hangisidir?",
    secenekler: [
      "A) Çin ile ittifak kurarak İslam ordularına arkadan saldırmaları",
      "B) Peçeneklerle birleşerek Bizans sınırında tampon bölge oluşturmaları",
      "C) Kafkasya geçitlerinde İslamiyet'in yayılmasını askeri güçle engellemeleri",
      "D) Museviliği resmi din ilan ederek bölgedeki Hristiyanları yanlarına çekmeleri",
      "E) Bizans İmparatorluğu ile ortaklaşa donanma kurarak halifelik ordularını denizden kuşatmaları",
    ],
    cevap: 2,
    aciklama: "Hazarlar, Kafkasya bölgesinde güçlü bir set oluşturarak Hz. Osman döneminden itibaren İslam ordularının kuzeye (Doğu Avrupa'ya) geçişini engellemişlerdir. Bu durum bölgenin uzun süre Hristiyan ve Musevi/Şaman kalmasında etkili olmuştur.",
  },
  {
    id: 3,
    soru: "Tarih öğretmeni Sibel Hanım, dersinde öğrencilerine şu bilgileri vermiştir:\n- Tarihte kendi adına para bastıran ilk Türk hükümdarıdır.\n- Yöneticisi olduğu topluluk, Türgişler olarak bilinmektedir.\nSibel Öğretmen'in hakkında bilgi verdiği bu Türk hükümdarı aşağıdakilerden hangisidir?",
    secenekler: ["A) Bumin Kağan", "B) Baga Tarkan", "C) Bilge Kağan", "D) Moyun Çur", "E) Bayan Kağan"],
    cevap: 1,
    aciklama: "Kendi adına para bastıran ilk Türk hükümdarı Türgişlerin başındaki Baga Tarkan'dır. Göktürkler para kullansa da hükümdar adına basılan ilk sikke Baga Tarkan dönemine aittir.",
  },
  {
    id: 4,
    soru: "I. İtil Bulgarları\nII. Karluklar\nIII. Hazarlar\nYukarıdaki Türk topluluklarından hangilerinin tarihteki en önemli ortak özelliği \"İslamiyet'i kabul eden ilk Türkler\" olmalarıdır?",
    secenekler: ["A) Yalnız I", "B) Yalnız II", "C) I ve II", "D) I ve III", "E) II ve III"],
    cevap: 2,
    aciklama: "İtil (Volga) Bulgarları, Doğu Avrupa'da İslamiyet'i kabul eden ilk Türk devletidir. Karluklar ise Orta Asya'da İslamiyet'i topluca kabul eden ilk Türk boyudur. Hazarlar ise Museviliği benimseyen tek Türk devletidir. Dolayısıyla I ve II öncülleri \"Müslüman\" olmaları bakımından ortaktır.",
  },
  {
    id: 5,
    soru: "Göktürk Devleti kurulmadan önce Orta Asya'ya hükmeden ve bu devletin yıkılmasıyla batıya göç ederek Avrupa'da da devlet kuran topluluk aşağıdakilerden hangisidir?",
    secenekler: ["A) Kırgızlar", "B) Kutluklar", "C) Uygurlar", "D) Avarlar", "E) Sabirler"],
    cevap: 3,
    aciklama: "Göktürklerden önce Orta Asya'da hüküm süren ve Göktürklere yenildikten sonra batıya göç ederek bugünkü Macaristan bölgesinde (Avrupa'da) ikinci kez devlet kuran topluluk Avarlardır. İstanbul'u kuşatan ilk Türk topluluğudur.",
  },
  {
    id: 6,
    soru: "Aşağıdakilerden hangisi, Avrupalılar tarafından \"Tanrı'nın Kırbacı\" ve \"Cesur Kavimlerin Efendisi\" olarak nitelendirilen ünlü Türk hükümdarıdır?",
    secenekler: ["A) Balamir", "B) Mete Han", "C) Atilla", "D) Teoman", "E) Uldız"],
    cevap: 2,
    aciklama: "Avrupa Hun Devleti hükümdarı Atilla, Avrupalılar tarafından \"Tanrı'nın Kırbacı\" (Aegidius) ve \"Cesur Kavimlerin Efendisi\" unvanlarıyla anılmıştır. Almanların Nibelungen Destanı'nda ise \"Etzel\" adıyla geçer.",
  },
  {
    id: 7,
    soru: "Avrupa'da kurulan aşağıdaki Türk devletlerinden hangisi, kendisini doğrudan \"Avrupa Hun Devleti'nin varisi\" olarak kabul etmiştir?",
    secenekler: ["A) Peçenekler", "B) İtil Bulgarları", "C) Hazarlar", "D) Macarlar", "E) Kumanlar"],
    cevap: 3,
    aciklama: "Bugün Macaristan olarak bilinen Macarlar, kendilerini Avrupa Hun İmparatorluğu'nun ve Atilla'nın soyundan gelen varisler olarak kabul ederler. Ülkenin İngilizce ismi olan \"Hungary\" de \"Hun\" kelimesinden türemiştir.",
  },
  {
    id: 8,
    soru: "Tarihte \"Çar\" unvanını kullanan ilk Türk devleti aşağıdakilerden hangisidir?",
    secenekler: ["A) Tuna Bulgarları", "B) İtil Bulgarları", "C) Hazarlar", "D) Kırgızlar", "E) Göktürkler"],
    cevap: 0,
    aciklama: "Slavlaşan ve Hristiyanlığı benimseyen Tuna Bulgarları, hükümdarları Simon döneminden itibaren ilk kez \"Çar\" unvanını kullanmaya başlamışlardır.",
  },
  {
    id: 9,
    soru: "Aşağıdakilerden hangisi Uygurların yerleşik yaşama geçmesinde etkili olan ve savaşçı özelliklerini kaybetmelerine neden olan temel gelişmedir?",
    secenekler: [
      "A) Çin ile yapılan ipek ticareti",
      "B) Maniheizm dininin benimsenmesi",
      "C) Kırgızların baskısı altında kalmaları",
      "D) Kağıt ve matbaayı kullanmaya başlamaları",
      "E) Töles İsyanı'nı bastırmakta zorlanmaları",
    ],
    cevap: 1,
    aciklama: "Uygurların Bögü Kağan döneminde benimsediği Maniheizm (Mani dini), et yemeyi ve savaşmayı yasakladığı için Uygurların göçebeliği bırakıp yerleşik yaşama geçmelerine, tarım yapmalarına ve savaşçı özelliklerini kaybetmelerine neden olmuştur.",
  },
  {
    id: 10,
    soru: "Tarihte Moğollara itaat eden \"ilk Müslüman Türk topluluğu\" aşağıdakilerden hangisidir?",
    secenekler: ["A) Oğuzlar", "B) Kıpçaklar", "C) Karluklar", "D) Kırgızlar", "E) Peçenekler"],
    cevap: 2,
    aciklama: "Cengiz Han liderliğindeki Moğol İmparatorluğu'na itaat eden ilk Müslüman Türk topluluğu Karluklardır. (Moğollara itaat eden ilk Türk devleti ise Kırgızlardır ancak onlar o dönemde Müslüman değildi.)",
  },
  {
    id: 11,
    soru: "I. Uygurlar\nII. Göktürkler\nIII. Kutluk Devleti (II. Göktürk)\nYukarıdaki Türk devletlerinden hangileri tarihte yerleşik yaşama geçerek şehir kalıntıları ve kalıcı mimari eserler bırakmışlardır?",
    secenekler: ["A) Yalnız I", "B) Yalnız II", "C) I ve II", "D) I ve III", "E) II ve III"],
    cevap: 0,
    aciklama: "Tarihte yerleşik yaşama geçen ilk Türk devleti Uygurlardır. Göktürkler ve Kutluklar (II. Göktürk) göçebe/konargöçer yaşam tarzını sürdürmüşlerdir.",
  },
  {
    id: 12,
    soru: "Bugün Moğolistan sınırları içerisinde yer alan Orhun Abideleri aşağıdaki devletlerden hangisinin dönemine aittir?",
    secenekler: ["A) I. Göktürk Devleti", "B) Kutluk Devleti", "C) Uygur Devleti", "D) Kırgız Devleti", "E) Asya Hun Devleti"],
    cevap: 1,
    aciklama: "Türk tarihinin ilk yazılı belgeleri olan Orhun Abideleri (Göktürk Kitabeleri), II. Göktürk yani Kutluk Devleti döneminde Bilge Kağan, Kül Tigin ve Vezir Tonyukuk adına dikilmiştir.",
  },
  {
    id: 13,
    soru: "Göktürklerin Çin esaretine girdiği fetret devrinde çıkan isyanlar arasında en dikkat çekeni ve Türk milliyetçiliğinin ilk kıvılcımı kabul edileni aşağıdakilerden hangisidir?",
    secenekler: ["A) Kürşat Ayaklanması", "B) Töles İsyanı", "C) Baba İshak İsyanı", "D) Şeyh Bedrettin İsyanı", "E) Patrona Halil İsyanı"],
    cevap: 0,
    aciklama: "Çin esaretine karşı sarayı basarak ihtilal yapmaya çalışan Kürşat ve 39 arkadaşı, canları pahasına verdikleri bu mücadele ile Türk tarihinin ilk bağımsızlık ve milliyetçilik ayaklanmasını gerçekleştirmişlerdir.",
  },
  {
    id: 14,
    soru: "Türk toplumsal yapısının temel taşlarını oluşturan birimlerin \"küçükten büyüğe\" doğru sıralanışı aşağıdakilerden hangisinde doğru verilmiştir?",
    secenekler: [
      "A) Urug - Oguş - Boy - Bodun - İl",
      "B) Oguş - Urug - Boy - Bodun - İl",
      "C) Oguş - Boy - Urug - Bodun - İl",
      "D) Urug - Boy - Oguş - İl - Bodun",
      "E) Oguş - Urug - Bodun - Boy - İl",
    ],
    cevap: 1,
    aciklama: "İslamiyet öncesi Türklerde sosyal hiyerarşi şu şekildedir: Oguş (Aile) → Urug (Aileler Birliği/Sülale) → Boy (Kabile) → Bodun (Millet) → İl (Devlet).",
  },
  {
    id: 15,
    soru: "Çin esaretine son vererek II. Göktürk Devleti'ni kuran ve bu mücadelesinden dolayı \"İlteriş\" (Derleyen, toplayan) unvanını alan Türk hükümdarı kimdir?",
    secenekler: ["A) Bumin Kağan", "B) Kutluk Kağan", "C) Bilge Kağan", "D) Kapgan Kağan", "E) Kül Tigin"],
    cevap: 1,
    aciklama: "Kutluk Kağan, Çin esaretindeki Türk boylarını bir bayrak altında toplayıp II. Göktürk Devleti'ni kurduğu için kendisine devlet kuran, derleyen anlamında \"İlteriş\" unvanı verilmiştir.",
  },
  {
    id: 16,
    soru: "Aşağıdakilerden hangisi kurultay üyeleri (Toygun) arasında yer almaz?",
    secenekler: ["A) Hakan", "B) Hatun", "C) Boy Beyleri", "D) Tiginler", "E) Şaman (Din Adamı)"],
    cevap: 4,
    aciklama: "Kurultay (Toy) üyelerine \"Toygun\" denir. Kurultaya Hakan, Hatun (Eş), Tiginler (Şehzadeler), Boy Beyleri ve askeri yöneticiler katılır. Ancak din adamları (Şaman/Kam/Baksı) teokratik bir yapı oluşmaması için kurultaya üye kabul edilmezlerdi.",
  },
  {
    id: 17,
    soru: "Aşağıdakilerden hangisi Türklerin göçebe (konargöçer) bir yaşam tarzına sahip olmasının doğrudan sonuçlarından biri değildir?",
    secenekler: [
      "A) Hapis cezalarının kısa süreli olması",
      "B) Taşınabilir sanat eserlerinin gelişmesi",
      "C) Sınıf farklılıklarının ve köleliğin oluşmaması",
      "D) Yazılı hukuk kurallarının gelişmemesi",
      "E) İlk düzenli ordunun kurulması",
    ],
    cevap: 4,
    aciklama: "İlk düzenli orduyu kuran kişi Asya Hun İmparatoru Mete Han'dır (MÖ 209). Düzenli ordunun kurulması göçebe yaşamın değil, askeri ihtiyaçların ve teşkilatçılığın sonucudur. Diğer şıklar (kısa süreli hapis, taşınabilir sanat, mülkiyet ve sınıf farkı olmaması) göçebe yaşamın doğrudan sonuçlarıdır.",
  },
  {
    id: 18,
    soru: "İpekyolu hakimiyeti için sırasıyla \"Bizans ile anlaşıp Sasani'yi zayıflatma\" ve ardından \"Sasani ile anlaşıp Akhunları yıkma\" siyasetini izleyen Türk devleti hangisidir?",
    secenekler: ["A) Göktürkler", "B) Hazarlar", "C) Avarlar", "D) Hunlar", "E) Uygurlar"],
    cevap: 0,
    aciklama: "I. Göktürk Devleti, İpekyolu'na hakim olmak için önce Sasaniler ile ittifak kurup Akhunları yıkmış; daha sonra güçlenen Sasanilere karşı Bizans ile ittifak kurarak Sasanileri zayıflatmıştır. Denge politikasının erken örneklerindendir.",
  },
  {
    id: 19,
    soru: "İslamiyet öncesi Türk devletlerinde ölen kişilerin mezarlarının (kurgan) etrafına, hayattayken öldürdüğü düşman sayısı kadar dikilen taş heykellere ne ad verilir?",
    secenekler: ["A) Yuğ", "B) Balbal", "C) Kurgan", "D) Kam", "E) Uçmağ"],
    cevap: 1,
    aciklama: "Türklerde kurgan adı verilen mezarların çevresine dikilen ve ölen kişinin öldürdüğü düşman askerlerini temsil eden taş heykellere Balbal denir. Bu heykeller aynı zamanda heykel sanatının ilk örnekleridir.",
  },
  {
    id: 20,
    soru: "Uygur Devleti'nin yıkılmasının ardından Orta Asya'da siyasi birliği sağlayan ve dünya edebiyat tarihinin en uzun destanı olan Manas Destanı'nı oluşturan Türk topluluğu aşağıdakilerden hangisidir?",
    secenekler: ["A) Kırgızlar", "B) Karluklar", "C) Oğuzlar", "D) Peçenekler", "E) Kumanlar"],
    cevap: 0,
    aciklama: "840 yılında Uygur Devleti'ni yıkarak Ötüken'de devlet kuran ve günümüzde de hala devam eden ünlü Manas Destanı'nı sözlü edebiyata kazandıran Türk topluluğu Kırgızlardır.",
  },
];
