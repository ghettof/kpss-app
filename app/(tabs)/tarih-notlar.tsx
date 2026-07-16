import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RENK = '#e67e22';

const KONULAR = [
  {
    baslik: '📌 1. İslamiyet Öncesi Türk Tarihi & İlk Devletler (1-16)',
    icerik: `• İslamiyet'i kabul eden ilk Türk devleti: İtil Bulgarları
• İslamiyet'i kabul eden ilk Türk topluluğu: Karluklar
• Parayı kullanan ilk Türk devleti: Göktürkler
• Kendi adına para bastıran ilk Türk devleti ve hükümdarı: Türgişler - Baga Tarkan
• Çin kaynaklarında "Türk" kelimesinin anlamı: Miğfer
• İslamiyet'in yayılmasını engelleyen devletler: Hazarlar - Türgişler
• Kendilerini Avrupa Hun Devleti'nin varisi olarak gören devlet: Macarlar
• "Çar" unvanını kullanan ilk Türk devleti: Tuna Bulgarları
• "Tanrının Kırbacı", "Cesur Kavimlerin Efendisi" olarak bilinen Türk hükümdarı: Atilla
• Asya Hun Devleti'nden sonra Orta Asya'ya hükmeden devlet: Avarlar
• Cengiz Han'a itaat eden ilk Müslüman Türk topluluğu: Karluklar
• Yerleşik yaşama geçen ilk Türk devleti: Uygurlar
• Çin eserlerinden kurtulup devlet kuran Türk devleti: Kutluk Devleti
• Orhun Abideleri hangi ülkede yer almaktadır: Moğolistan
• Toplumsal hiyerarşi küçükten büyüğe: Oguş - Urug - Boy - Bodun - İl
• İslamiyet'i kabul etmeyen tek Moğol devleti: Kubilay Hanlığı`,
  },
  {
    baslik: '📌 2. Türk-İslam Tarihi & Anadolu Selçuklu (17-44)',
    icerik: `• Türk-İslam tarihini başlatan savaş: Talas Savaşı
• İlk cami-medrese-kervansaray-posta teşkilatı örneklerini veren devlet: Karahanlılar
• İslamiyet'i koruyan ilk hükümdar: Gazneli Mahmut
• Gazneliler döneminde yaşayan ünlü bilim adamı: Biruni
• Gaznelilerin yıkılmasını kolaylaştıran savaş: Dandanakan Savaşı
• "Doğu'nun ve Batı'nın Sultanı" unvanı verilen hükümdar: Tuğrul Bey
• "Ebu'l Fetih" unvanı verilen hükümdar: Alparslan
• İlk Bizans-Büyük Selçuklu savaşı: Pasinler Savaşı
• Malazgirt Savaşı'nın diğer adları: Yurtaçan - Yurtkuran Savaşı
• İlk kurulan Türk beyliği: Saltuklular
• En güçlü olan beylik: Danişmentliler
• Denizcilikle uğraşan beylik: Çaka Beyliği
• Ali Kuşçu hangi devletlerde yaşamıştır: Timur - Akkoyunlu - Osmanlı
• Azerbaycan'ın Türkleşmesini sağlayan devlet: Karakoyunlular
• Kutsal bölgelere hakim olan ilk Türk-İslam devleti: Akşitler
• Kudüs'ü Haçlılardan kurtaran devlet: Eyyubiler
• Maristan adı verilen hastaneleri yapan devlet: Tolunoğulları
• Bimaristan adı verilen hastaneleri yapan devlet: Karahanlılar
• İslamiyet'i kabul eden ilk Moğol devleti: Altın Orda Devleti
• Timur'un yıkması ile Rusların güneye inmesi kolaylaşan devlet: Altın Orda Devleti
• Yıkılmasıyla Anadolu Moğol istilasına açık hale gelen devlet: Harzemşahlar
• Anadolu'daki ilk dini isyan: Baba İshak İsyanı
• Anadolu Selçuklu Devleti'nin en parlak dönemi: I. Alaaddin Keykubat
• Büyük Selçuklu Devleti'nin en parlak dönemi: Melikşah
• Büyük Selçuklu Devleti'nin son hükümdarı: Sultan Sencer
• Büyük Selçuklu'nun yıkılmasını hızlandıran savaş: Katvan Savaşı
• Anadolu Selçuklu'nun yıkılmasını hızlandıran savaş: Kösedağ Savaşı
• Malazgirt ve Kösedağ savaşlarının ortak özelliği: Beyliklerin kurulmasına yol açmıştır`,
  },
  {
    baslik: '📌 3. Osmanlı Devleti Kuruluş & Yükseliş Dönemi (45-99)',
    icerik: `• Osmanlı'da ilk verginin adı: Bac Vergisi
• Aşiretten Beyliğe geçiş dönemi padişahı: Osman Bey
• Beylikten Devlete geçiş dönemi padişahı: Orhan Bey
• Osmanlı'ya katılan ilk beylik: Karesioğulları
• İlk vezir kimdir: Alaaddin Paşa
• İlk medrese nerede, kimin döneminde açıldı: Orhan Bey - İznik
• İlk müderris kimdir: Davud-i Kayseri
• İlk kadı kimdir: Dursun Fakih
• Savaş alanında ölen tek Osmanlı padişahı: I. Murat
• Türk Bayrağı'nın şekillendiği savaş: I. Kosova Savaşı
• İlk Osmanlı-Haçlı savaşı: Sırpsındığı Savaşı
• Edirne'nin başkent oluşunu sağlayan savaş: Sazlıdere Savaşı
• İlk defterdar-kazasker-sadrazam ataması hangi padişah döneminde: I. Murat
• Rumeli Beylerbeyliğini kuran padişah: I. Murat
• Anadolu Beylerbeyliğini kuran padişah: Yıldırım Bayezid
• Anadolu Hisarı'nı yaptıran padişah: Yıldırım Bayezid
• Rumeli Hisarı'nı yaptıran padişah: Fatih Sultan Mehmet
• I. Bayezid'in "Yıldırım" unvanını aldığı savaş: Frenkyazısı Savaşı
• I. Bayezid'in "Sultan-ı İklim-i Rum" unvanını aldığı savaş: Niğbolu Savaşı
• Niğbolu ganimetiyle yaptırılan cami: Bursa Ulu Camii
• Osmanlı'yı Fetret Devri'ne sokan savaş: Ankara Savaşı (1402)
• Fetret Devri'nde taht mücadelesi veren şehzadeler: İsa - Musa - Mehmet - Süleyman
• Fetret Devri'nde İstanbul'u kuşatan şehzade: Musa Çelebi
• Osmanlı'nın ikinci kurucusu: Çelebi Mehmet
• İlk dini ve sosyal içerikli isyan: Şeyh Bedrettin İsyanı
• İlk Osmanlı-Venedik savaşı: Çalıbey Savaşı
• İlk şeyhülislam ataması yapan padişah: II. Murat
• İstanbul'u kuşatan padişah ve şehzadeler: Yıldırım Bayezid - Şehzade Musa - II. Murat - II. Mehmet
• Fatih'in alamadığı karada ve denizdeki iki yer: Belgrad - Rodos
• Karadeniz'in Türk gölü olmasını sağlayan bölge: Kırım
• Fatih döneminde ticari ayrıcalık verilen devlet: Venedik
• Kendi portresini yaptıran ilk Osmanlı padişahı: Fatih Sultan Mehmet
• İstanbul'un fethinin dünya tarihi açısından üç önemi: Rönesans - Coğrafi Keşifler - Feodalitenin zayıflaması
• Osmanlı'da yükselme içinde duraklama dönemi: II. Bayezid
• II. Bayezid'in reddettiği iki ünlü bilim insanı: Kristof Kolomb - Leonardo Da Vinci
• İlk avarız vergisini toplayan padişah: II. Bayezid
• 8 yıla 80 yıllık iş sığdıran padişah: Yavuz Sultan Selim
• Osmanlı'ya katılan son beylik: Dulkadiroğulları
• Yavuz döneminde Avrupa'da yaşanan önemli gelişme: Reform Hareketleri
• İlk Celali İsyanı olan Bozoklu Celal İsyanı nerede çıktı: Tokat
• Osmanlı'nın Orta Avrupa'da söz sahibi olmasını sağlayan bölge: Belgrad
• Avusturya üzerinde üstünlük sağlanan antlaşma: İbrahim Paşa (İstanbul) Antlaşması
• İlk Osmanlı-İran antlaşması: Amasya Antlaşması
• ABD Temsilciler Meclisi'nde portresi olan padişah: Kanuni Sultan Süleyman
• Kanuni'nin idam ettirdiği ünlü denizci: Piri Reis
• "Donanma Günü" olarak kutlanan gelişme: Preveze Deniz Savaşı
• Akdeniz'in Türk gölü olması hangi padişah döneminde: Kanuni Sultan Süleyman
• Barbaros'un katılımıyla Osmanlı mülkü sayılan ülke: Cezayir
• Kanuni'nin son seferi: Zigetvar
• Savaşa gitmeyen ilk Osmanlı padişahı: II. Selim
• İnebahtı'da kolunu kaybeden ünlü romancı: Cervantes
• Sokullu'nun 3 önemli projesi: Don-Volga Kanalı - Süveyş Kanalı - Marmara Projesi
• Sokullu'nun sadrazamlık yaptığı padişahlar: Kanuni - II. Selim - III. Murat
• Takiyüddin Mehmet ilk rasathaneyi kimin döneminde yaptırdı: III. Murat
• Doğu ve Batı'da en geniş sınırlara ulaşılan antlaşmalar: Ferhat Paşa - Bucaş Antlaşmaları`,
  },
  {
    baslik: '📌 4. Osmanlı Duraklama & Gerileme Dönemi (100-144)',
    icerik: `• "Eğri Fatih" olarak bilinen padişah: III. Mehmet
• Avusturya üzerindeki üstünlüğün başladığı ve bittiği antlaşmalar: İbrahim Paşa - Zitvatorok Antlaşması
• Sancağa çıkma geleneğini kaldıran padişah: III. Mehmet
• Ekber ve Erşed uygulamasını getiren padişah: I. Ahmet
• "Mavi Camii" olarak bilinen cami: Sultan Ahmet Camii
• "Anadolu'nun El-Hamrası" olarak bilinen yapı: Divriği Ulu Camii
• Doğu'da ilk toprak kaybının yaşandığı antlaşma: Nasuh Paşa Antlaşması
• II. Osman'ın Yeniçerileri kaldırma fikrini oluşturan kuşatma: Hotin Kuşatması
• Günümüz Türkiye-İran sınırını belirleyen antlaşma: Kasr-ı Şirin Antlaşması
• Kanatlı uçuşu gerçekleştiren tarihi kişilik: Hezarfen Ahmet Çelebi
• Batı'da en geniş sınırlara ulaşılan antlaşma: Bucaş Antlaşması
• Vakayı Vakvakiye kimin döneminde yaşandı: IV. Mehmet
• Osmanlı'da en küçük yaşta tahta geçen padişah: IV. Mehmet
• Viyana'yı kuşatıp başarısız olan sadrazam: Merzifonlu Kara Mustafa Paşa
• Batı'da geniş çaplı ilk toprak kaybının yaşandığı antlaşma: Karlofça Antlaşması
• Duraklama döneminde Osmanlı'ya karşı Kutsal İttifak'taki devletler: Venedik - Avusturya - Rusya - Lehistan - Malta
• III. Mustafa'nın tahttan indirilip yerine III. Ahmet'in getirildiği olay: Edirne Olayı
• Osmanlı'nın kaybettiği toprakları geri alma ümidinin doğduğu antlaşma: Prut Antlaşması
• Osmanlı'nın kaybettiği toprakları geri alma ümidinin bittiği antlaşma: Pasarofça Antlaşması
• Pasarofça Antlaşması ile beraber başlayan dönem: Lale Devri
• Lale Devri'ni bitiren olay: Patrona Halil İsyanı
• Bir isyanla tahta gelen ve bir isyanla tahttan indirilen padişah: III. Ahmet
• Lale Devri'nde ıslahat yapılan alanlar: Din - Askeri - Yönetim - Hukuk
• Osmanlı'nın Batı'da kazançlı çıktığı son antlaşma: Belgrad Antlaşması
• Belgrad Antlaşması'nda arabulucu devlet: Fransa
• Osmanlı'nın denge siyasetini ilk defa uyguladığı yer: Fransa'nın Mısır'ı İşgali
• Napolyon'u Akka önlerinde durduran komutan: Cezzar Ahmet Paşa
• Osmanlı'ya karşı ayaklanan ilk millet: Sırplar
• Osmanlı'dan bağımsızlık kazanarak ayrılan ilk millet: Rumlar (Yunanlılar)
• Osmanlı'nın Kuzey Afrika'daki ilk toprak kaybı: Cezayir
• Boğazlar meselesinin başladığı antlaşma: Hünkar İskelesi Antlaşması
• Mısır sorununun başlamasına neden olan antlaşma: Kütahya Antlaşması
• Osmanlı'nın İngiltere'nin yarı sömürgesi olduğu antlaşma: Balta Limanı Ticaret Antlaşması
• Kırım Savaşı'nda ilk defa borç alınan ülke: İngiltere
• Osmanlı donanmasının yakıldığı yerler sırasıyla: İnebahtı - Çeşme - Navarin - Sinop
• Osmanlı'nın Avrupa devleti sayıldığı antlaşma: Paris Antlaşması (1856)
• Telgraf hattının döşendiği savaş: Kırım Savaşı
• Namık Kemal'in "Vatan Yahut Silistre" oyununu anlattığı savaş: Kırım Savaşı
• 93 Harbi'nde Doğu'daki önemli kadın kahraman: Nene Hatun
• 93 Harbi'nde "Plevne Kahramanı": Gazi Osman Paşa
• Meclis tarafından onaylanmayan iki antlaşma: Ayastefanos - Sevr
• Sırbistan'ın bağımsız olma aşamaları: Bükreş - Edirne - Berlin Antlaşmaları
• Mustafa Kemal'in katılamadığı savaş (yaşı küçük): Dömeke Meydan Savaşı
• İlk karantina uygulamasını getiren padişah: II. Mahmut
• Tanzimat ve Islahat Fermanlarını yayımlayan padişah: Abdülmecid`,
  },
  {
    baslik: '📌 5. Osmanlı Son Dönemi & I. Dünya Savaşı (145-191)',
    icerik: `• Kendi heykelini yaptıran ilk Osmanlı padişahı: Abdülaziz
• Mustafa Kemal'in "Milletin Sarayı" dediği saray: Dolmabahçe Sarayı
• Maarifperver olarak bilinen padişah: II. Abdülhamid
• Abdülmecid'i devirip Abdülaziz'i tahta çıkarmayı hedefleyen darbe: Kuleli Olayı
• II. Abdülhamid'i indirip yerine V. Murat'ı çıkarmayı hedefleyen darbe: Çırağan Baskını
• Ertuğrul Fırkateyni hangi ülkeye gönderildi: Japonya
• Osmanlı'nın katıldığı ilk olimpiyatlar: Stockholm Olimpiyatları
• Osmanlı'da rejime karşı çıkarılan ilk isyan: 31 Mart İsyanı
• Mustafa Kemal'in tarih sahnesine ilk çıkışı: 31 Mart İsyanı (Hareket Ordusu)
• I. Meşrutiyeti ilan ettiren grup: Genç Osmanlılar
• II. Meşrutiyeti ilan ettiren grup: İttihat ve Terakki
• Meclis kararıyla tahttan indirilen ilk ve ikinci padişahlar: II. Abdülhamid - Vahdettin
• Trablusgarp Savaşı'nda Mustafa Kemal'in lakabı: Gazeteci Şerif
• Dünya tarihinde ilk defa savaş uçağının kullanıldığı savaş: Trablusgarp Savaşı
• Üçlü Antlaşma'nın (Ouchy) imzalandığı ülke: İsviçre
• I. Balkan Savaşı'nda Osmanlı'ya saldıran devletler: Sırbistan - Karadağ - Yunanistan - Bulgaristan
• I. Balkan Savaşı'ndan sonra yaşanan hükümet darbesi: Babıali Baskını
• Babıali Baskını ile indirilen ve getirilen hükümetler: Kamil Paşa indirildi - Mahmut Şevket Paşa getirildi
• I. Balkan Savaşı'nı bitiren antlaşma: Londra Antlaşması
• II. Balkan Savaşı'na neden olan devlet: Bulgaristan (çok toprak kazandığı için)
• I. Balkan'da olmayıp II. Balkan'da olan devlet: Romanya
• I. Dünya Savaşı'nda en karlı çıkan devletler: İngiltere - Fransa - Japonya
• I. Dünya Savaşı'nda ilk çekilen ve en son katılan devletler: Japonya - Yunanistan
• Açılan ilk cephe: Kafkasya Cephesi
• En çok toprak kaybının yaşandığı cephe: Suriye - Filistin Cephesi
• "Ben size savaşmayı değil, ölmeyi emrediyorum." sözünün söylendiği mevzi: Conkbayırı
• Toprak kazanan tek cephe: Kafkasya Cephesi
• 18 Mart Kahramanı: Cevat Çobanlı
• Wilson İlkelerinde kurulması öngörülen devlet: Polonya
• Yenen ve yenilen devletler arasında barış görüşmeleri konferansı: Paris Barış Konferansı
• Osmanlı'da ilk işgal edilen toprak: Musul
• Anadolu'da ilk işgal edilen toprak: Hatay
• İtilaf devletleri arasında ilk görüş ayrılığının olduğu yer: Paris Barış Konferansı
• İzmir'in işgalinin haksız olduğunu belirten rapor: Amiral Bristol Raporu
• Kurulan ilk cemiyet: Kars İslam Şurası
• Kuvayı Milliye teriminin geçtiği rapor: Dr. Esad Işık Raporu
• Amacına ulaşan zararlı cemiyetler: Alyans İsrailit - Maccabi
• Mustafa Kemal'in Fethi Okar ile çıkarttığı gazete: Minber
• Milli Mücadele'nin gerekçesi ve yönteminin belirlendiği gelişme: Amasya Genelgesi
• Milli egemenlik ve milli bağımsızlıktan ilk bahseden yer: Amasya Genelgesi
• Milli sınırdan ilk bahsedilen yer: Erzurum Kongresi
• Temsil Heyetinin kurulma kararı alındığı, kurulduğu ve sayısının arttığı gelişmeler: Amasya Genelgesi - Erzurum Kongresi - Sivas Kongresi
• Manda ve himayenin ilk reddedildiği yer: Erzurum Kongresi
• Manda ve himayenin kesin reddedildiği yer: Sivas Kongresi
• Sivas Kongresi'nde Batı Cephesi'ne atanan komutan: Ali Fuat Cebesoy
• Damat Ferit'in istifası üzerine göreve getirilen sadrazam: Ali Rıza Paşa
• Temsil Heyetinin varlığının tanındığı ilk gelişme: Amasya Görüşmeleri`,
  },
  {
    baslik: '📌 6. Kurtuluş Savaşı Cepheleri & TBMM Dönemi (192-221)',
    icerik: `• Son Osmanlı Mebusan Meclisi'nde kabul edilen karar: Misak-ı Milli
• Misak-ı Milli'nin ilanından sonra işgal edilen şehir: İstanbul
• TBMM'ye karşı çıkan isyanların genel amacı: TBMM'yi ortadan kaldırmak
• TBMM'ye karşı çıkan ilk isyan: Anzavur İsyanı
• TBMM'ye karşı çıkan en uzun süreli isyan: Çerkez Ethem İsyanı
• TBMM'ye karşı çıkan en geniş kapsamlı isyan: Koçgiri İsyanı
• Düzenli ordunun kazandığı ilk savaş: I. İnönü Savaşı
• Düzenli ordunun kaybettiği ilk ve tek savaş: Kütahya-Eskişehir Savaşları
• TBMM'nin uluslararası alanda ilk siyasi başarısı: Gümrü Antlaşması
• TBMM'yi resmi olarak tanıyan ilk devlet: Ermenistan
• Doğu Cephesi'nin kapanmasını sağlayan antlaşma: Gümrü Antlaşması
• Sovyet Rusya ile imzalanan ilk antlaşma: Moskova Antlaşması
• Misak-ı Milli'yi tanıyan ilk büyük devlet: Sovyet Rusya
• İstiklal Marşı'nın kabul edildiği savaş sonrası: I. İnönü Savaşı
• Londra Konferansı'na TBMM'nin çağrıldığı dönem: I. İnönü Savaşı sonrası
• Afganistan ile dostluk antlaşmasının imzalandığı dönem: I. İnönü Savaşı sonrası
• Teşkilat-ı Esasiye Kanunu'nun kabul edildiği yıl: 1921
• Başkomutanlık Kanunu hangi savaş öncesinde çıkarıldı: Sakarya Meydan Muharebesi
• Mustafa Kemal'e mareşallik ve gazilik verilen savaş: Sakarya Meydan Muharebesi
• "Hattı müdafaa yoktur, sathı müdafaa vardır." sözü hangi savaşta söylendi: Sakarya Meydan Muharebesi
• Türk ordusunun taarruza geçtiği son savunma savaşı: Büyük Taarruz
• Kurtuluş Savaşı'nın son muharebesi: Başkomutanlık Meydan Muharebesi (Dumlupınar)
• Kurtuluş Savaşı'nın askeri safhasını bitiren antlaşma: Mudanya Ateşkes Antlaşması
• İstanbul, Boğazlar ve Doğu Trakya'nın savaşılmadan alınmasını sağlayan antlaşma: Mudanya Ateşkes Antlaşması
• Lozan Konferansı'na TBMM adına baş delege: İsmet Paşa
• Lozan görüşmeleri sırasında kaldırılan kurum: Saltanat
• Yeni Türk Devleti'nin uluslararası alanda tanınmasını sağlayan antlaşma: Lozan Antlaşması
• Lozan'da çözülemeyen ve sonraya bırakılan konu: Musul Sorunu
• Lozan'da Türkiye'nin istediği gibi çözülemeyen konu: Boğazlar Meselesi
• Cumhuriyetin ilan tarihi: 29 Ekim 1923`,
  },
  {
    baslik: '📌 7. Atatürk Dönemi İnkılapları & Cumhuriyet (222-288)',
    icerik: `• Cumhuriyetin ilanından sonra kurulan ilk muhalefet partisi: Terakkiperver Cumhuriyet Fırkası
• Çok partili hayata geçişte kurulan ikinci muhalefet partisi: Serbest Cumhuriyet Fırkası
• Cumhuriyet dönemindeki ilk çok partili hayat denemesi: Terakkiperver Cumhuriyet Fırkası
• Şeyh Sait İsyanı hangi dönemde çıkmıştır: Cumhuriyet Dönemi
• Takrir-i Sükun Kanunu hangi isyan sonrası çıkarıldı: Şeyh Sait İsyanı
• İzmir Suikastı girişimi hangi yıl: 1926
• Kabotaj Kanunu hangi yıl kabul edildi: 1926
• Medeni Kanun hangi ülkeden alınmıştır: İsviçre
• Ceza Kanunu hangi ülkeden alınmıştır: İtalya
• Ticaret Kanunu hangi ülkeden alınmıştır: Almanya
• İlk nüfus sayımı hangi yıl yapıldı: 1927
• Harf İnkılabı hangi yıl yapıldı: 1928
• Millet Mektepleri hangi amaçla açılmıştır: Yeni harfleri öğretmek
• Kadınlara belediye seçimlerinde hak verildiği yıl: 1930
• Kadınlara muhtarlık seçimlerinde hak verildiği yıl: 1933
• Kadınlara milletvekili seçme ve seçilme hakkı verildiği yıl: 1934
• Soyadı Kanunu hangi yıl çıkarıldı: 1934
• Atatürk soyadının verildiği tarih: 24 Kasım 1934
• İlk Türk Tarih Kongresi hangi yıl yapıldı: 1932
• Atatürk'ün ölüm tarihi: 10 Kasım 1938
• II. Dünya Savaşı sırasında Türkiye'nin cumhurbaşkanı: İsmet İnönü
• Türkiye'nin II. Dünya Savaşı'na fiilen katılma kararı aldığı tarih: 23 Şubat 1945
• Türkiye'nin NATO'ya üye olduğu yıl: 1952
• NATO'ya girişte etkili olan savaş: Kore Savaşı
• Çok partili hayata geçildikten sonra iktidara gelen ilk parti: Demokrat Parti
• Demokrat Parti'nin iktidara geldiği yıl: 1950
• Türkiye'nin ilk kadın başbakanı: Tansu Çiller
• Türkiye Cumhuriyeti'nin ilk başbakanı: İsmet İnönü
• Cumhuriyet döneminin ilk cumhurbaşkanı: Mustafa Kemal Atatürk
• Türkiye'nin Avrupa Konseyi'ne üye olduğu yıl: 1949
• Birleşmiş Milletler'in kuruluş tarihi: 1945
• Türkiye'nin BM'ye katıldığı yıl: 1945
• Avrupa Ekonomik Topluluğu'nu (AET) kuran antlaşma: Roma Antlaşması
• Türkiye'nin AB'ye tam üyelik başvurusu yaptığı yıl: 1987
• Türkiye'nin AB aday ülke ilan edildiği zirve: Helsinki Zirvesi (1999)
• Türkiye'nin ilk yerli otomobili: Devrim
• GAP'ın açılımı: Güneydoğu Anadolu Projesi
• Türkiye'nin ilk yerli haberleşme uydusu: TÜRKSAT 6A
• Türkiye'nin ilk milli savaş gemisi projesi: MİLGEM
• Türkiye'nin ilk milli tank projesi: ALTAY
• Türk Devletleri Teşkilatı'nın eski adı: Türk Konseyi
• Türk Devletleri Teşkilatı'nın merkezi: İstanbul
• Türkiye'nin ilk nükleer santrali: Akkuyu Nükleer Güç Santrali
• İlk Türk Nobel ödüllü yazar: Orhan Pamuk
• İlk Türk Nobel ödüllü bilim insanı: Aziz Sancar
• UNESCO Dünya Miras Listesi'ne giren ilk Türk varlığı: Divriği Ulu Camii ve Darüşşifası
• Türkiye'nin ilk milli insansız savaş uçağı: Bayraktar KIZILELMA
• TBMM'nin açılış tarihi: 23 Nisan 1920
• İlk anayasa: Teşkilat-ı Esasiye Kanunu (1921)
• Cumhuriyet döneminin ilk anayasası: 1924 Anayasası
• Halifeliğin kaldırıldığı tarih: 3 Mart 1924
• Tevhid-i Tedrisat Kanunu'nun kabul tarihi: 3 Mart 1924
• Şeriye ve Evkaf Vekâleti'nin kaldırıldığı tarih: 3 Mart 1924
• Aşar vergisinin kaldırıldığı yıl: 1925
• Milletler Cemiyeti'ne giriş yılı: 1932
• Balkan Antantı'nın imzalandığı yıl: 1934
• Sadabat Paktı'nın imzalandığı yıl: 1937
• Hatay'ın anavatana katıldığı yıl: 1939
• Montrö Boğazlar Sözleşmesi'nin imzalandığı yıl: 1936
• Atatürk'ün son başbakanı: Celal Bayar
• Türkiye'nin ilk muhalefet partisi: Terakkiperver Cumhuriyet Fırkası (Vecihi Hürkuş da katılmıştır)
• Türkiye'nin ilk yerli uçağını yapan kişi: Vecihi Hürkuş
• İlk Türk kadın savaş pilotu: Sabiha Gökçen
• Türk Tarih Kurumu'nun kuruluş yılı: 1931
• Türk Dil Kurumu'nun kuruluş yılı: 1932
• Soyadı Kanunu ile Mustafa Kemal'e verilen soyadı: Atatürk
• Atatürk'ün naaşı ilk olarak defnedildiği yer: Etnografya Müzesi`,
  },
  {
    baslik: '📌 8. Çağdaş Türk Tarihi & Güncel Olaylar (289-317)',
    icerik: `• Bilge Kral olarak bilinen kişi: Aliya İzzetbegoviç
• Arap Baharı ilk olarak hangi ülkede çıktı: Tunus
• Arap Baharı'nın diğer adları: Twitter Devrimi, Facebook Devrimi, Yasemin Devrimi
• En genç profesör lakaplı kişi: Oktay Sinanoğlu
• Yüzyılın Beyin Cerrahı: Gazi Yaşargil
• Nobel Kimya Ödülü'nü alan Türk: Aziz Sancar
• Nobel Edebiyat Ödülü'nü alan Türk: Orhan Pamuk
• Cep Herkülü olarak bilinen sporcu: Naim Süleymanoğlu
• NATO'ya üye olan son devlet: Kuzey Makedonya
• BM'ye üye olan son devlet: Güney Sudan
• AB'ye üye olan son devlet: Hırvatistan
• AB'den ayrılan devlet: İngiltere
• OPEC'ten ayrılan devlet: Katar
• Türk-Ermeni meselesini yumuşatma diplomasisi: Peynir Diplomasisi
• "Türk" kelimesini kullandığı için cezalandırılan kişi: Dr. Sadık Ahmet
• Dünyanın en çok satan albümü kime aittir: Madonna
• Dünyanın en çok satılan kitabı: Harry Potter
• Klonlanan ilk hayvan: Koyun (Dolly)
• Çernobil faciasının yaşandığı ülke: Ukrayna
• Arap Baharı'ndan etkilenmeyen ülke: Fas
• Halkı tarafından linç edilerek öldürülen devlet başkanı: Muammer Kaddafi
• İsrail işgaline karşı Filistin'de başlatılan ayaklanmanın adı: İntifada
• ABD'nin 1991'de Irak'a yaptığı operasyonun adı: Çöl Fırtınası Operasyonu
• Kosova'nın bağımsızlığını tanıyan ilk devlet: Kostarika
• Türkiye'nin AB ile yaptığı ilk antlaşma: 1963 Ankara Antlaşması
• Dağlık Karabağ sorunu hangi iki ülke arasında: Ermenistan - Azerbaycan
• 2019'da başkenti değişen Orta Asya ülkesi: Kazakistan
• Dünyaca ünlü Kırgız yazar: Cengiz Aytmatov
• SSCB'den ayrılan ilk devlet: Gürcistan`,
  },
  {
    baslik: '📌 9. Dünya Tarihi & Uluslararası Örgütler (318-382)',
    icerik: `• Yıldız Savaşları projesi hangi ülkeye aitti: ABD
• Dünya Vatandaşı ödülünü alan Rus yarbay: Stanislav Petrov
• Suikast sonucu öldürülen başbakan: Nihat Erim
• Yüce Divan'a sevk edilen başbakan: Mesut Yılmaz
• İdam edilen başbakan: Adnan Menderes
• Türkiye'nin Kıbrıs'a yaptığı operasyonun adı: Atilla Harekatı
• Uzaya çıkan ilk insan: Yuri Gagarin
• Ay'a ayak basan ilk insan: Neil Armstrong
• Uzaya çıkan ilk kadın: Valentina Tereşkova
• Kıbrıs Rumlarının kurduğu örgüt: EOKA
• Kıbrıs Türklerinin kurduğu örgüt: Türk Mukavemet Teşkilatı (TMT) - Volkan
• İran'ın İsrail aracılığıyla ABD'den silah almasına verilen ad: İrangate Olayı
• Küba olayında ABD ile SSCB arasındaki telefon hattı: Kırmızı Telefon Hattı
• SALT-II Antlaşması'nın onaylanamama nedeni: SSCB'nin Afganistan'ı işgali
• Avrupa Konseyi'nin merkezi: Strazburg
• UNESCO'nun merkezi: Paris
• Avrupa İnsan Hakları Mahkemesi'nin merkezi: Strazburg
• NATO'nun merkezi: Brüksel
• Birleşmiş Milletler'in merkezi: New York
• Avrupa Birliği'nin para birimi: Euro
• Avrupa Birliği'nin bayrağındaki yıldız sayısı: 12
• Avrupa Birliği'nin marşı: Neşeye Övgü (Ode to Joy)
• Berlin Duvarı hangi yıl yıkıldı: 1989
• SSCB hangi yıl dağıldı: 1991
• Soğuk Savaş'ın sembol duvarı: Berlin Duvarı
• Körfez Savaşı hangi yıl başladı: 1991
• Avrupa Birliği'ni bugünkü adıyla kuran antlaşma: Maastricht Antlaşması
• Avrupa Kömür ve Çelik Topluluğu kaç ülke tarafından kurulmuştur: 6
• Schengen Antlaşması'nın amacı: Serbest dolaşım
• Dünyanın en büyük uluslararası örgütü: Birleşmiş Milletler
• BM'nin kurucu antlaşmasının adı: BM Şartı
• BM Güvenlik Konseyi'nin daimi üye sayısı: 5
• BM Güvenlik Konseyi'nde veto hakkı bulunanlar: Daimi Üyeler
• Dünyanın en büyük ekonomisine sahip ülkesi: ABD
• Yüzölçümü bakımından en büyük ülke: Rusya
• Nüfus bakımından en kalabalık ülke: Hindistan
• Dünyanın en uzun nehri: Nil Nehri
• Dünyanın en yüksek dağı: Everest
• Dünyanın en büyük okyanusu: Büyük Okyanus (Pasifik)
• Küreselleşmenin hız kazandığı dönem: 21. yüzyılın sonları
• İnternetin yaygınlaşmasıyla ortaya çıkan toplum modeli: Bilgi Toplumu
• İlk yapay uydu: Sputnik-1
• İlk cep telefonunu geliştiren şirket: Motorola
• Dünya Sağlık Örgütü'nün kısa adı: WHO
• UNICEF'in açılımı: Birleşmiş Milletler Çocuklara Yardım Fonu
• Uluslararası Para Fonu'nun kısa adı: IMF
• Dünya Bankası'nın merkezi: Washington D.C.
• OPEC'in açılımı: Petrol İhraç Eden Ülkeler Örgütü
• Türk Devletleri Teşkilatı'nın ilk genel sekreteri: Halil Akıncı
• Türk Devletleri Teşkilatı'nın gözlemci üyesi Avrupa ülkesi: Macaristan
• AGİT'in merkezi: Viyana
• Dünya Ticaret Örgütü'nün kısa adı: DTÖ (WTO)
• Dünya Ticaret Örgütü'nün merkezi: Cenevre
• Uluslararası Adalet Divanı'nın merkezi: Lahey
• Avrupa Parlamentosu seçimleri kaç yılda bir yapılır: 5 yılda bir
• Avrupa Birliği'ni yürüten organ: Avrupa Komisyonu
• Avrupa Birliği'nin yasama organı: Avrupa Parlamentosu
• Dünya Çevre Günü hangi tarihte kutlanır: 5 Haziran
• Birleşmiş Milletler Günü hangi tarihte kutlanır: 24 Ekim
• Avrupa Günü hangi tarihte kutlanır: 9 Mayıs
• Dünya Barış Günü hangi tarihte kutlanır: 21 Eylül
• Nobel Barış Ödülü hangi ülkede verilir: Norveç
• Nobel Ödülleri hangi ülkenin vasiyetiyle ortaya çıkmıştır: İsveç
• İlk Türk astronot: Alper Gezeravcı
• Uluslararası Uzay İstasyonu'na çıkan ilk Türk: Alper Gezeravcı`,
  },
];

export default function TarihNotlar() {
  const [acikKonu, setAcikKonu] = useState<number | null>(null);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.geriDon}>
        <Text style={styles.geriDonText}>← Geri</Text>
      </TouchableOpacity>
      <Text style={[styles.baslik, { color: RENK }]}>📜 Tarih Notları</Text>
      {KONULAR.map((konu, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.konuKart, { borderColor: acikKonu === i ? RENK : '#2a2a3e' }]}
          onPress={() => setAcikKonu(acikKonu === i ? null : i)}
          activeOpacity={0.8}
        >
          <View style={styles.konuBaslikRow}>
            <Text style={[styles.konuBaslik, acikKonu === i && { color: RENK }]}>{konu.baslik}</Text>
            <Text style={{ color: acikKonu === i ? RENK : '#666', fontSize: 16 }}>
              {acikKonu === i ? '▲' : '▼'}
            </Text>
          </View>
          {acikKonu === i && (
            <Text style={styles.konuIcerik}>{konu.icerik}</Text>
          )}
        </TouchableOpacity>
      ))}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 16 },
  geriDon: { marginTop: 50, marginBottom: 8 },
  geriDonText: { color: '#6c63ff', fontSize: 16 },
  baslik: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  konuKart: { backgroundColor: '#1a1a2e', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1 },
  konuBaslikRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  konuBaslik: { fontSize: 15, fontWeight: '700', color: '#fff', flex: 1, marginRight: 8 },
  konuIcerik: { color: '#ccc', fontSize: 13, lineHeight: 24, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#2a2a3e' },
});
