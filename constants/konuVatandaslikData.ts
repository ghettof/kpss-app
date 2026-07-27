export interface KonuNotu {
  id: string;
  kategori: string;
  on_yuz: string;
  arka_yuz: string;
  zorluk: string;
  aktif: boolean;
}

export const konuVatandaslikData: KonuNotu[] = [
  // ── HUKUKUN TEMEL KAVRAMLARI VE YAPTIRIM TÜRLERİ ──────────
  { id: "v001", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Sosyal hayatı düzenleyen kurallar nelerdir?", arka_yuz: "Din, Ahlak, Hukuk ve Görgü kurallarıdır.", zorluk: "kolay", aktif: true },
  { id: "v002", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Hukuk kurallarını diğer sosyal kurallardan ayıran temel fark nedir?", arka_yuz: "Maddi yaptırıma (devlet gücüyle desteklenen) dayalı olmasıdır. Diğerleri manevi yaptırımlıdır (ayıplama, kınama, dışlama).", zorluk: "orta", aktif: true },
  { id: "v003", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Maddi yaptırım türleri nelerdir?", arka_yuz: "Ceza, Cebri İcra, Tazminat, İptal, Hükümsüzlük (Yokluk, Butlan).", zorluk: "kolay", aktif: true },
  { id: "v004", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Kanunun suç işleyen kişilere öngördüğü yaptırım türü nedir?", arka_yuz: "Cezadır.", zorluk: "kolay", aktif: true },
  { id: "v005", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Borcun devlet organları (icra daireleri) aracılığıyla zorla tahsil edilmesi nedir?", arka_yuz: "Cebri icradır.", zorluk: "kolay", aktif: true },
  { id: "v006", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Hukuka aykırı bir eylemle verilen zararın parasal olarak giderilmesi nedir?", arka_yuz: "Tazminattır.", zorluk: "kolay", aktif: true },
  { id: "v007", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "İdari makamların hukuka aykırı işleminin idari yargı tarafından ortadan kaldırılması nedir?", arka_yuz: "İptaldir.", zorluk: "kolay", aktif: true },
  { id: "v008", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Hukuki işlemin kurucu unsurlarından birinin eksik olması sonucu hiç doğmamış sayılması nedir?", arka_yuz: "Yokluktur. Örnek: Hemcins evlilik, resmi memur önünde yapılmayan evlilik.", zorluk: "orta", aktif: true },
  { id: "v009", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Kanunun emredici hükümlerine, ahlaka veya kamu düzenine aykırı sözleşmenin geçersizliği nedir?", arka_yuz: "Mutlak Butlandır. Akıl hastası birinin yaptığı işlemler de mutlak butlanla batıldır.", zorluk: "orta", aktif: true },
  { id: "v010", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "İradede sakatlık (hile, korkutma, yanılma) veya sarhoşluk durumunda ortaya çıkan yaptırım nedir?", arka_yuz: "Nisbi Butlandır.", zorluk: "orta", aktif: true },
  { id: "v011", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Suçun bilerek ve isteyerek işlenmesi ile istemeyerek, ihmal sonucu işlenmesi ne olarak adlandırılır?", arka_yuz: "Bilerek ve isteyerek işlenmesi Kast, istemeyerek ihmal sonucu işlenmesi Taksirdir.", zorluk: "kolay", aktif: true },
  { id: "v012", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Devlet memuru disiplin cezaları nelerdir?", arka_yuz: "Uyarma, kınama, aylıktan kesme, kademe ilerlemesinin durdurulması, devlet memurluğundan çıkarma. (Görevden uzaklaştırma bir disiplin cezası değil, geçici bir idari tedbirdir.)", zorluk: "orta", aktif: true },
  { id: "v013", kategori: "Hukukun Temel Kavramları ve Yaptırım Türleri", on_yuz: "Hukuk kurallarının temel özellikleri nelerdir?", arka_yuz: "Soyuttur, geneldir, süreklidir, objektiftir, kişilik dışıdır ve maddi yaptırıma dayalıdır.", zorluk: "kolay", aktif: true },

  // ── HUKUKUN KAYNAKLARI VE TÜRLERİ ──────────────────────────
  { id: "v014", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Yetkili makamlarca konulan yazılı kuralların tamamına ne denir?", arka_yuz: "Mevzu Hukuk (mevzuat) denir.", zorluk: "kolay", aktif: true },
  { id: "v015", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Bir ülkede yürürlükte olan yazılı ve yazısız tüm hukuk kurallarının tamamına ne denir?", arka_yuz: "Pozitif (Müsbet) Hukuk denir.", zorluk: "kolay", aktif: true },
  { id: "v016", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Yürürlükten kalkmış, artık bağlayıcılığı olmayan hukuka ne denir?", arka_yuz: "Tarihi Hukuk denir.", zorluk: "kolay", aktif: true },
  { id: "v017", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Olması gereken, adil ve idealize edilen hukuka ne denir?", arka_yuz: "İdeal Hukuk (Tabii Hukuk) denir.", zorluk: "kolay", aktif: true },
  { id: "v018", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Kesinlikle uyulması gereken hukuk kuralları nasıl adlandırılır?", arka_yuz: "Emredici kurallar denir.", zorluk: "kolay", aktif: true },
  { id: "v019", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Bir hukuki kavramın ne anlama geldiğini açıklayan kurallara ne denir?", arka_yuz: "Tanımlayıcı kurallar denir.", zorluk: "kolay", aktif: true },
  { id: "v020", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Tarafların sözleşme yaparken öngörmedikleri konulardaki uyuşmazlıkların çözümüne yarayan kurallar nedir?", arka_yuz: "Tamamlayıcı Hukuk Kurallarıdır; taraflar aksini belirtmedikçe devreye girer.", zorluk: "orta", aktif: true },
  { id: "v021", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Tarafların bir hukuki işlemde kullandıkları ancak anlamını açıklamadıkları hususları yorumlamaya yarayan kural nedir?", arka_yuz: "Yorumlayıcı Hukuk Kurallarıdır.", zorluk: "orta", aktif: true },
  { id: "v022", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Hukukun (yazılı/asli) kaynakları nelerdir?", arka_yuz: "Anayasa, Kanun, Cumhurbaşkanlığı Kararnamesi, Milletlerarası Anlaşmalar, Yönetmelik, Genelge, Yönerge.", zorluk: "orta", aktif: true },
  { id: "v023", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Hukukun yazısız (tali) kaynağı nedir?", arka_yuz: "Örf ve Adet Hukukudur.", zorluk: "kolay", aktif: true },
  { id: "v024", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Bir örf-adet kuralının hukuki bağlayıcılık kazanması için gereken üç şart nedir?", arka_yuz: "Genel inanış, süreklilik, devlet gücü tarafından desteklenme.", zorluk: "orta", aktif: true },
  { id: "v025", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Hukukun yardımcı kaynakları nelerdir?", arka_yuz: "Doktrin (bilim adamlarının görüşleri) ve İçtihat (mahkemelerce daha önce verilmiş emsal kararlar).", zorluk: "orta", aktif: true },
  { id: "v026", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Hakların kullanılması ve borçların yerine getirilmesinde geçerli olan ilke nedir?", arka_yuz: "Objektif Dürüstlük ilkesidir.", zorluk: "orta", aktif: true },
  { id: "v027", kategori: "Hukukun Kaynakları ve Türleri", on_yuz: "Hakların kazanılmasında geçerli olan, kişinin bilmemesi gereken bir durumu bilmemesi ilkesi nedir?", arka_yuz: "Subjektif İyi Niyet ilkesidir.", zorluk: "orta", aktif: true },

  // ── HUKUK BOŞLUĞU ────────────────────────────────────────
  { id: "v028", kategori: "Hukuk Boşluğu", on_yuz: "Somut bir olaya uygulanacak yazılı kurallarda hüküm bulunmaması durumu nedir?", arka_yuz: "Kanun Boşluğudur; hakim bu durumda örf ve adet hukukuna bakar.", zorluk: "orta", aktif: true },
  { id: "v029", kategori: "Hukuk Boşluğu", on_yuz: "Somut bir olayda hem yazılı hem yazısız kaynaklarda hüküm bulunmaması durumu nedir?", arka_yuz: "Hukuk Boşluğudur; hakim bu durumda hukuk yaratır.", zorluk: "orta", aktif: true },
  { id: "v030", kategori: "Hukuk Boşluğu", on_yuz: "Kanun koyucunun bilerek ve isteyerek, hakimin somut olaya göre karar vermesi için bıraktığı boşluk nedir?", arka_yuz: "Kural İçi Boşluktur; hakimin burada takdir yetkisi vardır.", zorluk: "orta", aktif: true },
  { id: "v031", kategori: "Hukuk Boşluğu", on_yuz: "Kanun koyucunun bir konuda bilinçsizce ve özensizce davranarak kanun yapmayı unutması hangi boşluk türüdür?", arka_yuz: "Kural Dışı Boşluktur; hakim burada hukuk yaratarak boşluğu doldurur.", zorluk: "zor", aktif: true },

  // ── KİŞİLER HUKUKU (GERÇEK VE TÜZEL KİŞİLİK) ──────────────
  { id: "v032", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Gerçek kişilik ne zaman ve nasıl başlar?", arka_yuz: "Tam ve sağ doğumla başlar.", zorluk: "kolay", aktif: true },
  { id: "v033", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Hak sahibi olabilme, borç altına girebilme ehliyeti nedir?", arka_yuz: "Hak Ehliyetidir. Sağ ve tam doğmak şartıyla ana rahmine düşüldüğü an başlar.", zorluk: "kolay", aktif: true },
  { id: "v034", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Kişinin kendi işlem ve eylemleriyle hak kazanabilme, borç altına girebilme ehliyeti nedir?", arka_yuz: "Fiil Ehliyetidir.", zorluk: "kolay", aktif: true },
  { id: "v035", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Tam fiil ehliyetine sahip olma şartları nelerdir?", arka_yuz: "Ayırt etme gücüne sahip olmak, ergin (reşit) olmak, kısıtlı olmamak.", zorluk: "orta", aktif: true },
  { id: "v036", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Normal erginlik yaşı ve olağan evlilikle oluşan erginlik yaşı kaçtır?", arka_yuz: "Normal erginlik yaşı 18'dir. Olağan evlilikle erginlik yaşı 17'dir.", zorluk: "kolay", aktif: true },
  { id: "v037", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Gerçek kişiliği sona erdiren durumlar nelerdir?", arka_yuz: "Ölüm, Ölüm Karinesi, Birlikte Ölüm Karinesi, Gaiplik.", zorluk: "orta", aktif: true },
  { id: "v038", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Ölüm durumunda kaç gün içinde nüfus müdürlüğüne bildirim yapılmalıdır?", arka_yuz: "10 gün içinde bildirim yapılmalıdır.", zorluk: "orta", aktif: true },
  { id: "v039", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Ceza ehliyeti yaş sınırları nasıldır?", arka_yuz: "0-12 yaş: Ceza ehliyeti yok. 12-15 yaş: Ayırt etme gücü yoksa yok, varsa indirimli ceza. 15-18 yaş: İndirimli ceza. 18 yaş ve üstü: Tam ceza.", zorluk: "orta", aktif: true },
  { id: "v040", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Dernekler, sendikalar ve kooperatifler kaç kişiyle kurulur?", arka_yuz: "En az 7 kişiyle, önceden izin alınmadan kurulur.", zorluk: "kolay", aktif: true },
  { id: "v041", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Vakıf nasıl tanımlanır?", arka_yuz: "Belirli ve iktisadi olmayan bir amacı gerçekleştirmek üzere kişilerin bir mal topluluğunu bu amaca özgülemesiyle oluşan tüzel kişiliktir.", zorluk: "orta", aktif: true },
  { id: "v042", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Şirket nasıl tanımlanır?", arka_yuz: "İktisadi amaç ya da kazanç paylaşma amacı güden kişi topluluğu niteliğindeki tüzel kişiliktir.", zorluk: "orta", aktif: true },
  { id: "v043", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Türk vatandaşlığından çıkarılma kararını kim verir?", arka_yuz: "Cumhurbaşkanı verir.", zorluk: "orta", aktif: true },
  { id: "v044", kategori: "Kişiler Hukuku (Gerçek ve Tüzel Kişilik)", on_yuz: "Türk vatandaşlığına alma ve vatandaşlıktan kendi iradesiyle çıkma işlemlerini kim yürütür?", arka_yuz: "İçişleri Bakanlığı yürütür.", zorluk: "orta", aktif: true },

  // ── HUKUKİ OLAY, FİİL VE İŞLEM ────────────────────────────
  { id: "v045", kategori: "Haklar ve Hukuki Kavramlar", on_yuz: "Kişinin iradesiyle gerçekleşip gerçekleşmediğine bakılmaksızın hukuki sonuç bağlanan olaylara ne denir?", arka_yuz: "Hukuki Olay denir. Örnek: Doğum ve ölüm.", zorluk: "orta", aktif: true },
  { id: "v046", kategori: "Haklar ve Hukuki Kavramlar", on_yuz: "Kişinin iradesiyle gerçekleşen ve hukuki sonuç bağladığı insan davranışına ne denir?", arka_yuz: "Hukuki Fiil denir. Örnek: Kişinin ormanda bir ağaçtan sandık yapması.", zorluk: "orta", aktif: true },
  { id: "v047", kategori: "Haklar ve Hukuki Kavramlar", on_yuz: "Kişinin irade beyanında bulunarak hukuki bir sonuç yaratmasına ne denir?", arka_yuz: "Hukuki İşlem denir. Örnek: Araba satım sözleşmesi.", zorluk: "orta", aktif: true },
  { id: "v048", kategori: "Haklar ve Hukuki Kavramlar", on_yuz: "Mutlak haklar nedir, örnekleri nelerdir?", arka_yuz: "Sahibine maddi/manevi mallar ile kişiler üzerinde geniş yetkiler veren, herkese karşı ileri sürülebilen haklardır. Örnek: Mülkiyet hakkı, telif hakkı, patent hakkı, yaşam hakkı.", zorluk: "orta", aktif: true },
  { id: "v049", kategori: "Haklar ve Hukuki Kavramlar", on_yuz: "Nisbi haklar nedir, örnekleri nelerdir?", arka_yuz: "Sadece belirli kişilere karşı ileri sürülebilen haklardır. Örnek: Alacak hakkı, nafaka hakkı.", zorluk: "orta", aktif: true },

  // ── HUKUK DALLARI ────────────────────────────────────────
  { id: "v050", kategori: "Hukuk Dalları", on_yuz: "Hukukun ana dalları nelerdir?", arka_yuz: "Kamu Hukuku, Özel Hukuk ve Karma Hukuk'tur.", zorluk: "kolay", aktif: true },
  { id: "v051", kategori: "Hukuk Dalları", on_yuz: "Devlet ile birey veya diğer bir devlet arasındaki ilişkileri düzenleyen hukuk dalı hangisidir?", arka_yuz: "Kamu Hukuku'dur.", zorluk: "kolay", aktif: true },
  { id: "v052", kategori: "Hukuk Dalları", on_yuz: "Kamu Hukuku'nun alt dalları nelerdir?", arka_yuz: "Anayasa Hukuku, İdare Hukuku, Ceza Hukuku, Vergi Hukuku, Devletler Genel Hukuku, Yargılama Hukuku, İcra ve İflas Hukuku.", zorluk: "orta", aktif: true },
  { id: "v053", kategori: "Hukuk Dalları", on_yuz: "Kişilerin birbirleriyle olan ilişkilerini düzenleyen hukuk dalı hangisidir?", arka_yuz: "Özel Hukuk'tur.", zorluk: "kolay", aktif: true },
  { id: "v054", kategori: "Hukuk Dalları", on_yuz: "Özel Hukuk'un alt dalları nelerdir?", arka_yuz: "Medeni Hukuk (Kişilik, Aile, Eşya, Miras Hukuku), Borçlar Hukuku, Devletler Özel Hukuku, Ticaret Hukuku (Ticari İşletme, Şirketler, Sigorta, Kıymetli Evrak, Deniz Ticareti Hukuku).", zorluk: "orta", aktif: true },
  { id: "v055", kategori: "Hukuk Dalları", on_yuz: "Karma Hukuk'un alt dalları nelerdir?", arka_yuz: "İş ve Sosyal Güvenlik Hukuku, Uzay Hukuku, Toprak Hukuku, Bankacılık Hukuku, Fikir ve Sanat Eserleri Hukuku, Hava Hukuku, Çevre Hukuku.", zorluk: "orta", aktif: true },
  { id: "v056", kategori: "Hukuk Dalları", on_yuz: "Hukuka aykırı ve kusurlu fiil olarak tanımlanan kavram nedir?", arka_yuz: "Suçtur.", zorluk: "kolay", aktif: true },
  { id: "v057", kategori: "Hukuk Dalları", on_yuz: "Ceza Hukukuna hâkim olan ilkeler nelerdir?", arka_yuz: "Kanunilik ilkesi, hümanizm ilkesi, kusursuz ceza olmaz ilkesi, cezaların şahsiliği ilkesi, cezalandırmada adalet ve eşitlik ilkesi.", zorluk: "orta", aktif: true },
  { id: "v058", kategori: "Hukuk Dalları", on_yuz: "Kişinin cezalandırılmasının amacının yeniden topluma kazandırmak olduğunu savunan ilke nedir?", arka_yuz: "Hümanizm ilkesidir.", zorluk: "orta", aktif: true },
  { id: "v059", kategori: "Hukuk Dalları", on_yuz: "Vergi Hukukunun temel ilkeleri nelerdir?", arka_yuz: "Vergide adalet ilkesi, vergide genellik ilkesi, verginin kanuniliği ilkesi.", zorluk: "orta", aktif: true },
  { id: "v060", kategori: "Hukuk Dalları", on_yuz: "Kamu gelirleri nelerdir?", arka_yuz: "Vergiler, harçlar, resimler, şerefiyeler (bayındırlık katılma payı), parafiskal gelirler, mülk ve teşebbüs gelirleri, borçlanma gelirleri.", zorluk: "orta", aktif: true },
  { id: "v061", kategori: "Hukuk Dalları", on_yuz: "Devletin sunduğu kamu hizmeti karşılığında alınan bedel nedir?", arka_yuz: "Harçtır.", zorluk: "kolay", aktif: true },

  // ── ANAYASA TARİHİ VE ANAYASA TÜRLERİ ─────────────────────
  { id: "v062", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Anayasal gelişmenin ilk adımı kabul edilen belge nedir?", arka_yuz: "Sened-i İttifak'tır (1808).", zorluk: "orta", aktif: true },
  { id: "v063", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Türk tarihinin ilk yazılı anayasası hangisidir?", arka_yuz: "1876 Kanun-i Esasi'dir.", zorluk: "kolay", aktif: true },
  { id: "v064", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Türk devletinin (Cumhuriyet dönemi) ilk anayasası hangisidir?", arka_yuz: "1921 Anayasası'dır (Teşkilat-ı Esasiye).", zorluk: "kolay", aktif: true },
  { id: "v065", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Türk anayasa tarihindeki tek yumuşak ve tek çerçeve anayasa hangisidir?", arka_yuz: "1921 Anayasası'dır.", zorluk: "orta", aktif: true },
  { id: "v066", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "\"Milli egemenlik\" ilkesine ilk kez yer veren anayasa hangisidir?", arka_yuz: "1921 Anayasası'dır.", zorluk: "orta", aktif: true },
  { id: "v067", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "\"Sosyal Devlet\" ilkesi ilk kez hangi anayasada yer almıştır?", arka_yuz: "1961 Anayasası'nda yer almıştır.", zorluk: "orta", aktif: true },
  { id: "v068", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Anayasa Mahkemesi ve kuvvetler ayrılığı ilk kez hangi anayasa ile geldi?", arka_yuz: "1961 Anayasası ile gelmiştir.", zorluk: "orta", aktif: true },
  { id: "v069", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Kadınlara milletvekili seçme ve seçilme hakkı hangi yıl verildi?", arka_yuz: "1934 yılında, 1924 Anayasası'nda yapılan değişiklikle verildi.", zorluk: "kolay", aktif: true },
  { id: "v070", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Çok partili hayata geçiş ilk kez hangi yıl denenmiştir?", arka_yuz: "1924 yılında (Terakkiperver Cumhuriyet Fırkası) denenmiştir; kalıcı geçiş ise 1946'dır.", zorluk: "orta", aktif: true },
  { id: "v071", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Tek dereceli seçim ile gizli oy-açık sayım ilkesi hangi yıllarda uygulanmaya başlandı?", arka_yuz: "Tek dereceli seçim 1946'dan itibaren, gizli oy-açık sayım ilkesi 1950'den itibaren uygulanmıştır.", zorluk: "orta", aktif: true },
  { id: "v072", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Çift meclisli (iki kamaralı) anayasalarımız hangileridir?", arka_yuz: "1876 Kanun-i Esasi (Meclis-i Mebusan - Meclis-i Ayan) ve 1961 Anayasası'dır (Millet Meclisi - Cumhuriyet Senatosu).", zorluk: "orta", aktif: true },
  { id: "v073", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Referandum ile kabul edilen anayasalarımız hangileridir?", arka_yuz: "1961 ve 1982 Anayasalarıdır.", zorluk: "orta", aktif: true },
  { id: "v074", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Değiştirilmesi zor şartlara bağlı, değiştirilemez hükümler içeren anayasa türü nedir?", arka_yuz: "Sert Anayasa'dır. 1924, 1961 ve 1982 Anayasaları sert anayasalardır.", zorluk: "orta", aktif: true },
  { id: "v075", kategori: "Anayasa Tarihi ve Anayasa Türleri", on_yuz: "Her durumun kuralla çözülmesine dayalı, ayrıntılı anayasa türü nedir?", arka_yuz: "Kazuistik Anayasa'dır. 1924, 1961 ve 1982 Anayasaları kazuistik anayasalardır.", zorluk: "orta", aktif: true },

  // ── TEMEL HAK VE HÜRRİYETLER ───────────────────────────────
  { id: "v076", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Olağanüstü durumlarda dahi sınırlandırılamayan \"çekirdek haklar\" nelerdir?", arka_yuz: "Yaşama hakkı; maddi-manevi varlığın bütünlüğü; din, vicdan, düşünce ve kanaatlerini açıklamaya zorlanamama; suç ve cezaların geçmişe yürümemesi; masumiyet karinesi.", zorluk: "orta", aktif: true },
  { id: "v077", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Oy kullanamayanlar kimlerdir?", arka_yuz: "T.C. vatandaşı olmayanlar, 18 yaşını doldurmayanlar, silah altındaki er ve erbaşlar, askeri öğrenciler, kasıtlı suçtan hüküm giyip ceza infaz kurumunda bulunanlar.", zorluk: "orta", aktif: true },
  { id: "v078", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Oy kullanabilenler kimlerdir?", arka_yuz: "18 yaşından büyük T.C. vatandaşları, subay/astsubay/uzman çavuşlar, taksirli suçlardan hüküm giyenler ve tutuklular, yurt dışındaki T.C. vatandaşları.", zorluk: "orta", aktif: true },
  { id: "v079", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Siyasi partiye üye olamayanlar kimlerdir?", arka_yuz: "Hakimler ve savcılar, yüksek yargı organı mensupları (Sayıştay dahil), memur statüsündeki görevliler, silahlı kuvvet mensupları, yükseköğretim öncesi öğrenciler. (Üniversite öğrencileri üye olabilir.)", zorluk: "orta", aktif: true },
  { id: "v080", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Milletvekili seçilme yaşı kaçtır?", arka_yuz: "18'dir.", zorluk: "kolay", aktif: true },
  { id: "v081", kategori: "Temel Hak ve Hürriyetler", on_yuz: "Temel hak ve hürriyetler nasıl sınırlandırılabilir ve durdurulabilir?", arka_yuz: "Kanunla sınırlandırılabilir; savaş, OHAL, seferberlik gibi durumlarda durdurulabilir.", zorluk: "orta", aktif: true },

  // ── YASAMA (TBMM) ────────────────────────────────────────
  { id: "v082", kategori: "Yasama (TBMM)", on_yuz: "1982 Anayasası'na göre yasama yetkisi kime aittir?", arka_yuz: "TBMM'ye aittir.", zorluk: "kolay", aktif: true },
  { id: "v083", kategori: "Yasama (TBMM)", on_yuz: "TBMM ve Cumhurbaşkanı seçimleri kaç yılda bir, aynı günde yapılır?", arka_yuz: "5 yılda bir yapılır.", zorluk: "kolay", aktif: true },
  { id: "v084", kategori: "Yasama (TBMM)", on_yuz: "Meclis çalışmalarını 1 ay içinde toplam kaç birleşim günü takip etmeyen milletvekilinin vekilliği düşürülebilir?", arka_yuz: "5 birleşim günü.", zorluk: "orta", aktif: true },
  { id: "v085", kategori: "Yasama (TBMM)", on_yuz: "Milletvekilliğinin düşürülmesine kim karar verir, ilgili vekil kaç gün içinde itiraz edebilir?", arka_yuz: "TBMM Genel Kurulu karar verir; ilgili vekil 7 gün içinde Anayasa Mahkemesi'ne başvurabilir.", zorluk: "orta", aktif: true },
  { id: "v086", kategori: "Yasama (TBMM)", on_yuz: "TBMM bir yasama yılında en fazla kaç ay tatil yapabilir?", arka_yuz: "En fazla 3 ay tatil yapabilir.", zorluk: "kolay", aktif: true },
  { id: "v087", kategori: "Yasama (TBMM)", on_yuz: "TBMM tatildeyken Meclis'i doğrudan toplantıya çağırmaya kimler yetkilidir?", arka_yuz: "Cumhurbaşkanı ve TBMM Başkanı yetkilidir.", zorluk: "orta", aktif: true },
  { id: "v088", kategori: "Yasama (TBMM)", on_yuz: "Savaş nedeniyle seçimler en fazla ne kadar süre ertelenebilir?", arka_yuz: "En fazla 1 yıl süreyle ertelenebilir. Bu kararı TBMM verir.", zorluk: "orta", aktif: true },
  { id: "v089", kategori: "Yasama (TBMM)", on_yuz: "Kanun teklif etmeye kim yetkilidir?", arka_yuz: "En az 1 milletvekili yetkilidir. Cumhurbaşkanı bütçe kanunu hariç kanun teklif edemez.", zorluk: "kolay", aktif: true },
  { id: "v090", kategori: "Yasama (TBMM)", on_yuz: "Kanunlar, başka bir tarih belirtilmediyse ne zaman yürürlüğe girer?", arka_yuz: "Resmi Gazete'de yayımlandığı gün yürürlüğe girer.", zorluk: "kolay", aktif: true },
  { id: "v091", kategori: "Yasama (TBMM)", on_yuz: "Milletlerarası antlaşmaları uygun bulan ve onaylayan makamlar sırasıyla kimlerdir?", arka_yuz: "TBMM uygun bulur, Cumhurbaşkanı onaylayıp yayımlar.", zorluk: "orta", aktif: true },
  { id: "v092", kategori: "Yasama (TBMM)", on_yuz: "Anayasa değişikliği teklifi için en az kaç milletvekilinin imzası gerekir?", arka_yuz: "Üye tamsayısının en az 1/3'ü, yani 200 milletvekilinin imzası gerekir.", zorluk: "orta", aktif: true },
  { id: "v093", kategori: "Yasama (TBMM)", on_yuz: "Genel af ilanı için gereken oy oranı nedir?", arka_yuz: "Üye tamsayısının 3/5'i (en az 360 milletvekili).", zorluk: "orta", aktif: true },
  { id: "v094", kategori: "Yasama (TBMM)", on_yuz: "TBMM'nin bilgi edinme ve denetim yolları nelerdir?", arka_yuz: "Yazılı soru, genel görüşme, Meclis araştırması, Meclis soruşturmasıdır.", zorluk: "orta", aktif: true },
  { id: "v095", kategori: "Yasama (TBMM)", on_yuz: "TBMM genel oyla seçilen kaç milletvekilinden oluşur?", arka_yuz: "600 milletvekilinden oluşur.", zorluk: "kolay", aktif: true },
  { id: "v096", kategori: "Yasama (TBMM)", on_yuz: "TBMM toplantı yeter sayısı için gereken çoğunluk nedir?", arka_yuz: "En az 200 üye (1/3 çoğunluk) gereklidir.", zorluk: "orta", aktif: true },
  { id: "v097", kategori: "Yasama (TBMM)", on_yuz: "TBMM Başkanlık Divanında kimler bulunur?", arka_yuz: "TBMM Başkanı, Başkan Vekilleri, Katip Üyeler, İdari Amirler bulunur.", zorluk: "orta", aktif: true },
  { id: "v098", kategori: "Yasama (TBMM)", on_yuz: "TBMM Başkanı hakkında hangi kurallar geçerlidir?", arka_yuz: "Başkan seçildiğinde vekilliği sona ermez; TBMM'de oy kullanamaz; milletvekili olmak zorundadır; varsa partiyle ilişiği devam eder ama parti faaliyetlerine katılamaz; siyasi partiler TBMM Başkanlığına aday gösteremez.", zorluk: "zor", aktif: true },

  // ── YÜRÜTME (CUMHURBAŞKANI) ────────────────────────────────
  { id: "v099", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "1982 Anayasası'na göre yürütme yetkisi ve görevi kime aittir?", arka_yuz: "Cumhurbaşkanı'na aittir.", zorluk: "kolay", aktif: true },
  { id: "v100", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Cumhurbaşkanlığına aday olma şartları nelerdir?", arka_yuz: "En az 40 yaşını doldurmak ve yükseköğrenim (üniversite) mezunu olmak.", zorluk: "kolay", aktif: true },
  { id: "v101", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Cumhurbaşkanlığına kimler aday gösterebilir?", arka_yuz: "Siyasi parti grupları; son seçimde tek başına veya birlikte en az %5 oy alan partiler; en az 100 bin seçmen.", zorluk: "orta", aktif: true },
  { id: "v102", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Cumhurbaşkanlığı makamı boşalırsa yenisi seçilene kadar kim vekalet eder?", arka_yuz: "Görevlendirilen Cumhurbaşkanı Yardımcısı vekalet eder.", zorluk: "orta", aktif: true },
  { id: "v103", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Türkiye Cumhuriyeti'nin ilk Cumhurbaşkanı yardımcısı kimdir?", arka_yuz: "Fuat Oktay'dır.", zorluk: "orta", aktif: true },
  { id: "v104", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Cumhurbaşkanı tek başına en fazla kaç ay OHAL ilan edebilir?", arka_yuz: "En fazla 6 ay için OHAL ilan edebilir.", zorluk: "orta", aktif: true },
  { id: "v105", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "OHAL süresini uzatma veya kaldırma yetkisi kimdedir?", arka_yuz: "TBMM'dedir; her defasında en fazla 4 ay uzatılabilir.", zorluk: "orta", aktif: true },
  { id: "v106", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Savaşa ve barışa karar verme yetkisi kimdedir?", arka_yuz: "TBMM'dedir.", zorluk: "kolay", aktif: true },
  { id: "v107", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Sokağa çıkma yasağına kim karar verir?", arka_yuz: "İçişleri Bakanlığı karar verir.", zorluk: "orta", aktif: true },
  { id: "v108", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Milli Güvenlik Kurulu (MGK) hangi anayasa ile kuruldu ve kaç ayda bir toplanır?", arka_yuz: "1961 Anayasası ile kuruldu; kural olarak 2 ayda bir Cumhurbaşkanı başkanlığında toplanır.", zorluk: "orta", aktif: true },
  { id: "v109", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Devlet Denetleme Kurulu (DDK) hangi anayasa ile kuruldu, nereye bağlıdır ve neyi denetleyemez?", arka_yuz: "1982 Anayasası ile kuruldu, Cumhurbaşkanlığına bağlıdır; yargı organlarını denetleyemez. Üyelerini ve başkanını Cumhurbaşkanı atar.", zorluk: "orta", aktif: true },
  { id: "v110", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Bütçe kanununu kim hazırlar, kim kabul eder?", arka_yuz: "Cumhurbaşkanı hazırlar, TBMM kabul eder.", zorluk: "orta", aktif: true },
  { id: "v111", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Bakanlıkların kurulması ve kaldırılması nasıl olur?", arka_yuz: "Cumhurbaşkanlığı Kararnamesi ile olur.", zorluk: "orta", aktif: true },
  { id: "v112", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Yönetmelik çıkarabilenler kimlerdir?", arka_yuz: "Cumhurbaşkanlığı, bakanlıklar ve kamu tüzel kişileridir.", zorluk: "orta", aktif: true },
  { id: "v113", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Siyasi partilerin mali denetimini kim yapar?", arka_yuz: "Anayasa Mahkemesi yapar.", zorluk: "orta", aktif: true },
  { id: "v114", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Siyasi partiler kaç kişiyle kurulur?", arka_yuz: "En az 30 Türk vatandaşıyla kurulur.", zorluk: "orta", aktif: true },
  { id: "v115", kategori: "Yürütme (Cumhurbaşkanı)", on_yuz: "Rektörleri kim atar?", arka_yuz: "Cumhurbaşkanı atar.", zorluk: "kolay", aktif: true },

  // ── YARGI ORGANLARI ──────────────────────────────────────
  { id: "v116", kategori: "Yargı Organları", on_yuz: "Türkiye'deki yüksek mahkemeler hangileridir?", arka_yuz: "Anayasa Mahkemesi, Yargıtay, Danıştay ve Uyuşmazlık Mahkemesi'dir.", zorluk: "kolay", aktif: true },
  { id: "v117", kategori: "Yargı Organları", on_yuz: "Anayasa Mahkemesi kaç üyeden oluşur, görev süresi nedir?", arka_yuz: "15 üyeden oluşur; üyelik süresi 12 yıldır, üyeler tekrar seçilemez ve en fazla 65 yaşına kadar görev yapabilirler.", zorluk: "orta", aktif: true },
  { id: "v118", kategori: "Yargı Organları", on_yuz: "Anayasa Mahkemesi Başkanı kimdir?", arka_yuz: "Kadir Özkaya'dır.", zorluk: "orta", aktif: true },
  { id: "v119", kategori: "Yargı Organları", on_yuz: "Cumhurbaşkanı, yardımcıları ve bakanları görevle ilgili suçlardan Yüce Divan sıfatıyla kim yargılar?", arka_yuz: "Anayasa Mahkemesi yargılar. Savcılık görevini Yargıtay Cumhuriyet Başsavcısı yürütür.", zorluk: "orta", aktif: true },
  { id: "v120", kategori: "Yargı Organları", on_yuz: "Adli mahkemelerin (hukuk-ceza) en yüksek karar mercii hangisidir?", arka_yuz: "Yargıtay'dır.", zorluk: "kolay", aktif: true },
  { id: "v121", kategori: "Yargı Organları", on_yuz: "Yargıtay hangi Osmanlı padişahı döneminde kuruldu, üyelerini kim seçer?", arka_yuz: "Abdülaziz döneminde kuruldu; üyelerini Hâkimler ve Savcılar Kurulu (HSK) seçer.", zorluk: "orta", aktif: true },
  { id: "v122", kategori: "Yargı Organları", on_yuz: "Yargıtay Başkanı ve Yargıtay Cumhuriyet Başsavcısı kimdir?", arka_yuz: "Yargıtay Başkanı Ömer Kerkez, Yargıtay Cumhuriyet Başsavcısı Muhsin Şentürk'tür.", zorluk: "orta", aktif: true },
  { id: "v123", kategori: "Yargı Organları", on_yuz: "İdari mahkemelerin en yüksek karar mercii hangisidir?", arka_yuz: "Danıştay'dır.", zorluk: "kolay", aktif: true },
  { id: "v124", kategori: "Yargı Organları", on_yuz: "Danıştay üyelerini kim seçer, başkanı kimdir?", arka_yuz: "Üyelerin 1/4'ünü Cumhurbaşkanı, 3/4'ünü HSK seçer. Başkanı Zeki Yiğit'tir.", zorluk: "orta", aktif: true },
  { id: "v125", kategori: "Yargı Organları", on_yuz: "Adli ve idari yargı mercileri arasındaki görev/hüküm uyuşmazlıklarını kesin olarak çözen mahkeme hangisidir?", arka_yuz: "Uyuşmazlık Mahkemesi'dir.", zorluk: "orta", aktif: true },
  { id: "v126", kategori: "Yargı Organları", on_yuz: "Kamu idareleri ile SGK'nın gelir-giderlerini TBMM adına denetleyen, ancak yüksek mahkeme sayılmayan kurum hangisidir?", arka_yuz: "Sayıştay'dır. Abdülaziz döneminde kurulmuştur, üyelerini ve başkanını TBMM seçer.", zorluk: "orta", aktif: true },
  { id: "v127", kategori: "Yargı Organları", on_yuz: "Sayıştay ile Danıştay arasında uyuşmazlık çıkarsa kimin kararları esas alınır?", arka_yuz: "Danıştay'ın kararları esas alınır.", zorluk: "zor", aktif: true },
  { id: "v128", kategori: "Yargı Organları", on_yuz: "Hâkimler ve Savcılar Kurulu'nun (HSK) başkanı kimdir?", arka_yuz: "Adalet Bakanı'dır (görev gereği); şu anki Adalet Bakanı Akın Gürlek'tir.", zorluk: "orta", aktif: true },
  { id: "v129", kategori: "Yargı Organları", on_yuz: "Hâkim ve savcılar en fazla kaç yaşına kadar görev yapabilir?", arka_yuz: "65 yaşına kadar görev yapabilirler.", zorluk: "kolay", aktif: true },

  // ── İDARE HUKUKU (TAŞRA VE MAHALLİ İDARELER) ──────────────
  { id: "v130", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "İl genel idaresinin başında bulunan, Cumhurbaşkanı kararıyla atanan yetki genişliğine sahip amir kimdir?", arka_yuz: "Vali'dir.", zorluk: "kolay", aktif: true },
  { id: "v131", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "İlçe genel idaresinin başında bulunan, Cumhurbaşkanı onayı ile atanan mülki amir kimdir?", arka_yuz: "Kaymakam'dır.", zorluk: "kolay", aktif: true },
  { id: "v132", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "Bir belediye başkanını geçici olarak görevden uzaklaştırmaya kim yetkilidir?", arka_yuz: "İçişleri Bakanlığı yetkilidir.", zorluk: "orta", aktif: true },
  { id: "v133", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "Belediye başkanının görevine kesin ve sürekli olarak son verme yetkisi kimdedir?", arka_yuz: "Danıştay'dadır (yargı yoluyla).", zorluk: "orta", aktif: true },
  { id: "v134", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "Belediye başkanı mazeretsiz ve kesintisiz kaç gün görevine gelmezse görevden uzaklaştırılma süreci başlar?", arka_yuz: "20 gün görevine gelmezse süreç başlar.", zorluk: "orta", aktif: true },
  { id: "v135", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "İl-ilçe-büyükşehir belediyeleri nasıl kurulur?", arka_yuz: "Kanunla kurulur.", zorluk: "kolay", aktif: true },
  { id: "v136", kategori: "İdare Hukuku (Taşra ve Mahalli İdareler)", on_yuz: "RTÜK (Radyo ve Televizyon Üst Kurulu) üyelerini kim seçer?", arka_yuz: "TBMM seçer.", zorluk: "orta", aktif: true },
];
