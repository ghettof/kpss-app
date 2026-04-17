import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DENEME1, DENEME1_BASLIK, DENEME1_KONU, Soru } from '../constants/sorular/spk/deneme1';
import { DENEME2, DENEME2_BASLIK, DENEME2_KONU } from '../constants/sorular/spk/deneme2';
import { DENEME3, DENEME3_BASLIK, DENEME3_KONU } from '../constants/sorular/spk/deneme3';
import { DENEME4, DENEME4_BASLIK, DENEME4_KONU } from '../constants/sorular/spk/deneme4';
import { DENEME5, DENEME5_BASLIK, DENEME5_KONU } from '../constants/sorular/spk/deneme5';

const KONULAR = [
  { id: 1, baslik: '📈 Paylar ve Pay Benzeri Menkul Kıymetler', renk: '#4A90D9', icerik: [
    { altBaslik: 'Pay Nedir?', maddeler: ['Anonim şirketin sermayesinin en küçük parçasıdır','Mülkiyet hakkı + Söz hakkı verir','İtibari değer: En az 1 kuruş, halka açık şirketlerde 1 TL','MKK: Fiziki hisse yerine elektronik kayıt (KAP, e-GKS)'] },
    { altBaslik: 'Pay Türleri', maddeler: ['Nama yazılı: Sahibi kayıtlı, ciroyla devredilir','Hamiline yazılı: Elinde bulunduran sahibidir','İmtiyazlı pay: 1 paya en fazla 15 oy hakkı','Bedelli artırım: Şirkete nakit girer, rüçhan hakkı kullanılır','Bedelsiz artırım: İç kaynaklardan, ortağa bedava pay'] },
    { altBaslik: 'Azınlık Hakları', maddeler: ['Halka açık şirketlerde: %5 ve üzeri → azınlık','Halka kapalı şirketlerde: %10 ve üzeri → azınlık','Genel kurulu toplantıya çağırma hakkı','Özel denetçi atanması isteme hakkı','Finansal tabloların ertelenmesini isteme'] },
    { altBaslik: 'Halka Arz Sonrası Kurallar', maddeler: ["Büyük ortak satış yasağı: 1 yıl (arz fiyatı altında)","Tüm yatırımcılar satış yasağı: 90 gün (borsa dışı)","Mevcut ortaklar satış yasağı: 180 gün","Ek satış (Greenshoe) oranı: Halka arzın %15'i","Fiyat istikrarı işlem süresi: En çok 30 gün"] },
    { altBaslik: 'Sermaye Artırımı', maddeler: ['Rüçhan hakkı kullanım süresi: 15-60 gün','SPK 2 TL Kuralı: Bedelsiz sonrası hisse 2 TL altına düşemez','Bedelsiz kaynaklar: Yedek akçe, geçmiş kâr, emisyon primi','Bedelsiz YASAK kaynaklar: Ara dönem kârları'] },
    { altBaslik: 'Katılma İntifa Senedi (KİS)', maddeler: ["Oy hakkı vermez, sadece mali haklar sağlar","İhraç limiti: Ödenmiş sermayenin %50'si","Halka açık şirketler KİS sahiplerine yeni pay alma hakkı veremez"] },
  ]},
  { id: 2, baslik: '🏦 Borçlanma Araçları', renk: '#E67E22', icerik: [
    { altBaslik: 'Araç Türleri', maddeler: ['Finansman Bonosu: 30-364 gün, kısa vadeli','Tahvil: 365+ gün, uzun vadeli','PDT: Vade sonunda aynı şirketin payına dönüşür','DET: Vade sonunda BAŞKA şirketin payıyla değişir','Kıymetli Maden Bonosu: 30-364 gün, altın/gümüşe endeksli'] },
    { altBaslik: 'İhraç Limiti', maddeler: ['Halka açık şirket: Özkaynak × 5','Halka kapalı şirket: Özkaynak × 3','Yüksek kredi notlu banka: ×2 artırım uygulanır','Hesaplamada konsolide tablolar esas alınır'] },
    { altBaslik: 'PDT Kritik Kurallar', maddeler: ['Minimum vade: 365 gün','En erken dönüşüm: Alımdan 365 gün sonra','Dönüşüm masrafları: Tamamen ihraççıya ait','Halka arz şartı: Paylar borsada + kayıtlı sermaye sisteminde olmalı'] },
    { altBaslik: 'BASK', maddeler: ['Tertip BASK: Tek tertip için, 2/3 çoğunluk kararı','YK onayı: Tertip BASK kararından 3 iş günü içinde','Genel BASK talebi: YK onayından 5 iş günü içinde','Genel BASK toplantısı: Onaydan 15 iş günü içinde','İhraççının ve ilişkili tarafların oy hakkı yoktur'] },
    { altBaslik: 'Yeşil Borçlanma Araçları', maddeler: ['3 zorunlu unsur: Çerçeve Belgesi + Münhasır Kullanım + İkinci Taraf Görüşü','4 bileşen: Kullanım, Proje Seçimi, Fon Yönetimi, Raporlama','SPK kurul ücreti: %50 indirim teşvik'] },
  ]},
  { id: 3, baslik: '💼 Yatırım Fonu Katılma Payları', renk: '#27AE60', icerik: [
    { altBaslik: 'Temel Kavramlar', maddeler: ['Tüzel kişiliği YOKTUR (şirket değil, mal varlığıdır)','Kurucu: Portföy Yönetim Şirketi (PYŞ)','Saklayıcı: Takasbank, banka veya aracı kurum','Katılma payının itibari değeri yoktur','PYŞ iflas etse bile fon varlıkları haczedilemez'] },
    { altBaslik: 'Şemsiye Fon', maddeler: ['Tüm fonlar şemsiye fon altında kurulmak ZORUNDADIR','İstisna: GYF ve GSYF → isteğe bağlı','KESİNLİKLE YASAK: BYF şemsiye fon OLAMAZ','İlk fon başvurusu: Şemsiye kurulduktan 3 ay içinde'] },
    { altBaslik: 'Portföy Limitleri', maddeler: ["Tek ihraççı: Max %10 (Devlet varlıkları için %25)","Yoğunlaşma: Max %40 (İştirak fonları muaf)","Grup şirketi: Max %20 (VKŞ için %35)","Mülkiyet: Bir şirketin sermayesinin max %10'u"] },
    { altBaslik: 'Fon Toplam Gider Oranı', maddeler: ['Para Piyasası Fonu: %1,65','Koruma/Garantili, Endeks, Kıymetli Maden: %2,19','Kısa Vadeli Borçlanma/Kira: %2,56','Diğer Fonlar (Hisse vb.): %3,65','Aşım varsa 5 iş günü içinde fona iade zorunlu'] },
    { altBaslik: 'TEFAS ve Fiyatlama', maddeler: ['TEFAS genel komisyon: %35','TEFAS özel komisyon (max): %65','İleri Fiyatlama: Çoğu fon için standart','Son Fiyatla İşlem: Sadece Para Piyasası ve Kısa Vadeli Borçlanma Fonları'] },
  ]},
  { id: 4, baslik: '📊 Türev Araçlar', renk: '#8E44AD', icerik: [
    { altBaslik: 'Forward vs Futures', maddeler: ['Forward: OTC (tezgahüstü), esnek, temerrüt riski yüksek','Futures: Borsa (VİOP), standart, Takasbank güvencesi','Futures: Günlük kâr/zarar, teminat zorunlu','Forward: Vade sonunda tek seferde hesaplaşma'] },
    { altBaslik: 'Opsiyon Sözleşmeleri', maddeler: ['Alıcı: Prim öder, HAK kazanır (max kayıp = prim)','Satıcı: Prim alır, YÜKÜMLÜLÜK altına girer','Call (Alım): Belirlenen fiyattan alma hakkı','Put (Satım): Belirlenen fiyattan satma hakkı','Avrupa tipi (E): Sadece vade sonunda kullanılır','Amerikan tipi (A): Vadeye kadar herhangi bir gün'] },
    { altBaslik: 'Kullanım Amaçları', maddeler: ['Riskten Korunma (Hedging): Ana amaç, gelecekteki fiyatı sabitler','Spekülasyon: Fiyat tahminiyle kâr elde etme','Arbitraj: Fiyat farklılıklarından risksiz kâr'] },
  ]},
  { id: 5, baslik: '🏛️ Kamu Borçlanma Araçları', renk: '#C0392B', icerik: [
    { altBaslik: 'DİBS Türleri', maddeler: ['Hazine Bonosu: 1 yıldan kısa, genellikle iskontolu','Devlet Tahvili: 1 yıl ve üzeri','Kira Sertifikası (Sukuk): Faizsiz, kira geliri esaslı','TÜFEX: Enflasyona endeksli','Altın Tahvili: Altın fiyatına endeksli'] },
    { altBaslik: 'İç Borç vs Dış Borç', maddeler: ["İç Borç: Türkiye'de yerleşiklerden, genellikle TL","Dış Borç: Yurt dışından, genellikle döviz","Ayrım: Borcun yapıldığı piyasaya göre (para cinsine göre DEĞİL)","Eurobond: Yurt dışında ihraç edilen döviz cinsi tahvil → DIŞ BORÇ","Yurt içinde dolar cinsi tahvil → İÇ BORÇ"] },
    { altBaslik: 'Kamu Kurumları', maddeler: ['Hazine: SPK kurallarına TABİ DEĞİL (istisna)','Belediyeler: Hem Hazine izni HEM SPK kuralları (çifte denetim)',"KİT'ler: SPK'ya tabi, özel kanunlardaki limitler geçerli"] },
  ]},
  { id: 6, baslik: '⭐ Sınavda En Çok Çıkanlar', renk: '#F39C12', icerik: [
    { altBaslik: 'Kritik Rakamlar', maddeler: ['İmtiyazlı oy: Max 15 oy/pay','Azınlık: Halka açık %5, kapalı %10',"KİS ihraç limiti: Sermayenin %50'si",'PDT min vade: 365 gün','BASK kararı: 2/3 çoğunluk','Yeşil tahvil teşvik: %50 ücret indirimi','Endeks fonu korelasyon: Min %90','Borçlanma limiti artırımı: Bakan +%5, CB +%5'] },
    { altBaslik: 'Karıştırılan Kavramlar', maddeler: ['Şemsiye fon: BYF olamaz (GYF ve GSYF isteğe bağlı)','VOBAŞ: Sadece futures, opsiyon yoktu','Hazine DİBS: SPK kurallarından istisna','Belediye tahvili: Çifte denetim (Hazine + SPK)','Garantili fon ≠ Koruma amaçlı fon','İç borç/dış borç ayrımı: Para cinsine göre değil piyasaya göre'] },
  ]},
];

const DENEMELER = [
  { id: 1, baslik: DENEME1_BASLIK, konu: DENEME1_KONU, sorular: DENEME1, renk: '#4A90D9' },
  { id: 2, baslik: DENEME2_BASLIK, konu: DENEME2_KONU, sorular: DENEME2, renk: '#4A90D9' },
  { id: 3, baslik: DENEME3_BASLIK, konu: DENEME3_KONU, sorular: DENEME3, renk: '#E67E22' },
  { id: 4, baslik: DENEME4_BASLIK, konu: DENEME4_KONU, sorular: DENEME4, renk: '#E67E22' },
  { id: 5, baslik: DENEME5_BASLIK, konu: DENEME5_KONU, sorular: DENEME5, renk: '#27AE60' },
];

type Ekran = 'menu' | 'denemeListe' | 'sinav' | 'sonuc' | 'konuCalis';

export default function SPKSinav() {
  const [ekran, setEkran] = useState<Ekran>('menu');
  const [secilenDeneme, setSecilenDeneme] = useState<typeof DENEMELER[0] | null>(null);
  const [soruIndex, setSoruIndex] = useState(0);
  const [secilen, setSecilen] = useState<string | null>(null);
  const [cevapVerildi, setCevapVerildi] = useState(false);
  const [dogru, setDogru] = useState(0);
  const [yanlis, setYanlis] = useState(0);
  const [acikKonu, setAcikKonu] = useState<number | null>(null);
  const [acikBolum, setAcikBolum] = useState<number | null>(null);

  const aktifSorular: Soru[] = secilenDeneme?.sorular ?? [];
  const soru = aktifSorular[soruIndex];
  const renk = secilenDeneme?.renk ?? '#4A90D9';

  const basla = (deneme: typeof DENEMELER[0]) => {
    setSecilenDeneme(deneme); setSoruIndex(0); setSecilen(null);
    setCevapVerildi(false); setDogru(0); setYanlis(0); setEkran('sinav');
  };
  const cevapla = (cevap: string) => {
    if (cevapVerildi) return;
    setSecilen(cevap); setCevapVerildi(true);
    if (cevap === soru.dogruCevap) setDogru(d => d + 1); else setYanlis(y => y + 1);
  };
  const sonraki = () => {
    if (soruIndex + 1 >= aktifSorular.length) setEkran('sonuc');
    else { setSoruIndex(i => i + 1); setSecilen(null); setCevapVerildi(false); }
  };
  const tekrar = () => {
    setSoruIndex(0); setSecilen(null); setCevapVerildi(false);
    setDogru(0); setYanlis(0); setEkran('sinav');
  };

  if (ekran === 'menu') return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={s.geri}>← Geri</Text></TouchableOpacity>
        <Text style={s.baslik}>SPK Hazırlık</Text>
        <View style={{ width: 50 }} />
      </View>
      <Text style={s.altBaslikHeader}>Sermaye Piyasası Araçları 1</Text>
      <View style={s.menuGrid}>
        <TouchableOpacity style={[s.menuKart, { backgroundColor: '#C0392B' }]} onPress={() => setEkran('denemeListe')}>
          <Text style={s.menuEmoji}>📝</Text>
          <Text style={s.menuBaslik}>Deneme Sınavları</Text>
          <Text style={s.menuAlt}>5 deneme • 125 soru</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.menuKart, { backgroundColor: '#2C3E50' }]} onPress={() => setEkran('konuCalis')}>
          <Text style={s.menuEmoji}>📖</Text>
          <Text style={s.menuBaslik}>Konu Çalışma</Text>
          <Text style={s.menuAlt}>Notlar ve özetler</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  if (ekran === 'konuCalis') return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity onPress={() => setEkran('menu')}><Text style={s.geri}>← Geri</Text></TouchableOpacity>
          <Text style={s.baslik}>Konu Çalışma</Text>
          <View style={{ width: 50 }} />
        </View>
        <Text style={s.aciklama}>Konuya tıkla, alt başlıklara göz at</Text>
        {KONULAR.map((konu) => (
          <View key={konu.id} style={s.konuKart}>
            <TouchableOpacity style={[s.konuBaslik, { borderLeftColor: konu.renk }]}
              onPress={() => { setAcikKonu(acikKonu === konu.id ? null : konu.id); setAcikBolum(null); }}>
              <Text style={s.konuBaslikText}>{konu.baslik}</Text>
              <Text style={s.ok}>{acikKonu === konu.id ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {acikKonu === konu.id && (
              <View style={s.konuIcerik}>
                {konu.icerik.map((bolum, idx) => (
                  <View key={idx}>
                    <TouchableOpacity style={[s.bolumBaslik, { backgroundColor: konu.renk + '22' }]}
                      onPress={() => setAcikBolum(acikBolum === idx ? null : idx)}>
                      <Text style={[s.bolumBaslikText, { color: konu.renk }]}>{bolum.altBaslik}</Text>
                      <Text style={[s.bolumOk, { color: konu.renk }]}>{acikBolum === idx ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {acikBolum === idx && (
                      <View style={s.maddeler}>
                        {bolum.maddeler.map((madde, midx) => (
                          <View key={midx} style={s.maddeRow}>
                            <View style={[s.maddeNokta, { backgroundColor: konu.renk }]} />
                            <Text style={s.maddeText}>{madde}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );

  if (ekran === 'denemeListe') return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        <View style={s.header}>
          <TouchableOpacity onPress={() => setEkran('menu')}><Text style={s.geri}>← Geri</Text></TouchableOpacity>
          <Text style={s.baslik}>Deneme Sınavları</Text>
          <View style={{ width: 50 }} />
        </View>
        <Text style={s.altBaslikHeader}>Bir deneme seçin</Text>
        {DENEMELER.map(d => (
          <TouchableOpacity key={d.id} style={[s.sinavKart, { borderLeftColor: d.renk }]} onPress={() => basla(d)}>
            <View style={s.kartSol}>
              <View style={[s.numBadge, { backgroundColor: d.renk }]}><Text style={s.numText}>{d.id}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={[s.sinavNo, { color: d.renk }]}>{d.baslik}</Text>
                <Text style={s.sinavKonu} numberOfLines={2}>{d.konu}</Text>
                <Text style={s.sinavSoru}>25 soru</Text>
              </View>
            </View>
            <Text style={[s.okIcon, { color: d.renk }]}>›</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );

  if (ekran === 'sonuc') {
    const bos = aktifSorular.length - dogru - yanlis;
    const net = (dogru - yanlis * 0.25).toFixed(2);
    return (
      <SafeAreaView style={s.container}>
        <ScrollView contentContainerStyle={s.sonucContainer}>
          <Text style={s.sonucEmoji}>{Number(net) >= 17 ? '🏆' : Number(net) >= 12 ? '👍' : '📚'}</Text>
          <Text style={s.sonucBaslik}>Sınav Bitti!</Text>
          <Text style={s.sonucDenemeAdi}>{secilenDeneme?.baslik} • {secilenDeneme?.konu}</Text>
          <View style={s.sonucKart}>
            <Text style={[s.netPuan, { color: renk }]}>{net}</Text>
            <Text style={s.netLabel}>Net Puan</Text>
          </View>
          <View style={s.sonucDetay}>
            <View style={s.sonucItem}><Text style={s.sonucDogru}>{dogru}</Text><Text style={s.sonucLabel}>Doğru</Text></View>
            <View style={s.ayirac} />
            <View style={s.sonucItem}><Text style={s.sonucYanlis}>{yanlis}</Text><Text style={s.sonucLabel}>Yanlış</Text></View>
            <View style={s.ayirac} />
            <View style={s.sonucItem}><Text style={s.sonucBos}>{bos}</Text><Text style={s.sonucLabel}>Boş</Text></View>
          </View>
          <TouchableOpacity style={[s.tekrarBtn, { backgroundColor: renk }]} onPress={tekrar}>
            <Text style={s.tekrarBtnText}>🔄 Tekrar Çöz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.geriBtn2} onPress={() => setEkran('denemeListe')}>
            <Text style={s.geriBtnText}>← Sınav Listesine Dön</Text>
          </TouchableOpacity>
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.soruHeader}>
        <TouchableOpacity onPress={() => setEkran('denemeListe')}><Text style={s.geri}>← Çık</Text></TouchableOpacity>
        <View style={s.soruHeaderOrta}>
          <Text style={s.soruNo}>{soruIndex + 1} / {aktifSorular.length}</Text>
          <Text style={s.soruDenemeAdi}>{secilenDeneme?.baslik}</Text>
        </View>
        <View style={s.skorBox}>
          <Text style={[s.skorText, { color: '#27AE60' }]}>✓{dogru}</Text>
          <Text style={[s.skorText, { color: '#E74C3C' }]}> ✗{yanlis}</Text>
        </View>
      </View>
      <View style={s.progressBar}>
        <View style={[s.progressFill, { width: `${((soruIndex + 1) / aktifSorular.length) * 100}%` as any, backgroundColor: renk }]} />
      </View>
      <ScrollView style={s.soruScroll}>
        <Text style={s.soruMetin}>{soru.metin}</Text>
        {soru.secenekler.map((opt, i) => {
          let bg = '#1A2635', border = '#2A3F55', harf = '#8899AA', metin = '#ccc';
          if (cevapVerildi) {
            if (opt === soru.dogruCevap) { bg = '#1a3d2b'; border = '#27AE60'; harf = '#27AE60'; metin = '#fff'; }
            else if (opt === secilen) { bg = '#3d1a1a'; border = '#E74C3C'; harf = '#E74C3C'; metin = '#fff'; }
          } else if (secilen === opt) { bg = renk + '33'; border = renk; harf = renk; metin = '#fff'; }
          return (
            <TouchableOpacity key={i} style={[s.secenek, { backgroundColor: bg, borderColor: border }]}
              onPress={() => cevapla(opt)} activeOpacity={cevapVerildi ? 1 : 0.7} disabled={cevapVerildi}>
              <Text style={[s.secenekHarf, { color: harf }]}>{['A','B','C','D','E'][i]})</Text>
              <Text style={[s.secenekText, { color: metin }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {cevapVerildi && (
          <View style={[s.aciklamaBox, { borderColor: secilen === soru.dogruCevap ? '#27AE60' : '#E74C3C', backgroundColor: secilen === soru.dogruCevap ? '#1a3d2b' : '#3d1a1a' }]}>
            <Text style={[s.aciklamaSonuc, { color: secilen === soru.dogruCevap ? '#27AE60' : '#E74C3C' }]}>
              {secilen === soru.dogruCevap ? '✓ Doğru!' : `✗ Yanlış! Doğru: ${soru.dogruCevap}`}
            </Text>
            <Text style={s.aciklamaText}>💡 {soru.aciklama}</Text>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
      <View style={s.altBtn}>
        {!cevapVerildi ? (
          <TouchableOpacity style={[s.sonrakiBtn, { backgroundColor: secilen === null ? '#2A3F55' : renk }]}
            onPress={() => secilen && setCevapVerildi(true)} disabled={secilen === null}>
            <Text style={s.sonrakiBtnText}>Cevapla</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[s.sonrakiBtn, { backgroundColor: renk }]} onPress={sonraki}>
            <Text style={s.sonrakiBtnText}>{soruIndex + 1 >= aktifSorular.length ? 'Sonuçları Gör 🏁' : 'Sonraki →'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F1923' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  geri: { color: '#4A90D9', fontSize: 16 },
  baslik: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  altBaslikHeader: { color: '#8899AA', fontSize: 13, textAlign: 'center', marginBottom: 16, marginTop: 4 },
  aciklama: { color: '#555', fontSize: 12, textAlign: 'center', marginBottom: 16 },
  menuGrid: { flexDirection: 'row', padding: 16, gap: 16 },
  menuKart: { flex: 1, borderRadius: 16, padding: 24, alignItems: 'center' },
  menuEmoji: { fontSize: 40, marginBottom: 12 },
  menuBaslik: { color: '#fff', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  menuAlt: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4, textAlign: 'center' },
  konuKart: { marginHorizontal: 12, marginBottom: 10, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1A2635' },
  konuBaslik: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderLeftWidth: 4 },
  konuBaslikText: { color: '#fff', fontSize: 15, fontWeight: 'bold', flex: 1 },
  ok: { color: '#8899AA', fontSize: 14, marginLeft: 8 },
  konuIcerik: { paddingBottom: 8 },
  bolumBaslik: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, marginHorizontal: 8, marginTop: 6, borderRadius: 8 },
  bolumBaslikText: { fontSize: 13, fontWeight: '700', flex: 1 },
  bolumOk: { fontSize: 12 },
  maddeler: { paddingHorizontal: 16, paddingVertical: 8 },
  maddeRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  maddeNokta: { width: 6, height: 6, borderRadius: 3, marginTop: 6, marginRight: 10, flexShrink: 0 },
  maddeText: { color: '#ccc', fontSize: 13, lineHeight: 20, flex: 1 },
  sinavKart: { marginHorizontal: 12, marginBottom: 10, backgroundColor: '#1A2635', borderRadius: 14, padding: 16, borderLeftWidth: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kartSol: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  numBadge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  numText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sinavNo: { fontSize: 15, fontWeight: 'bold' },
  sinavKonu: { color: '#8899AA', fontSize: 12, marginTop: 2 },
  sinavSoru: { color: '#555', fontSize: 11, marginTop: 2 },
  okIcon: { fontSize: 28, fontWeight: 'bold' },
  soruHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 20 },
  soruHeaderOrta: { alignItems: 'center' },
  soruNo: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  soruDenemeAdi: { color: '#8899AA', fontSize: 11, marginTop: 2 },
  skorBox: { flexDirection: 'row' },
  skorText: { fontSize: 13, fontWeight: 'bold' },
  progressBar: { height: 4, backgroundColor: '#1A2635', marginHorizontal: 16, borderRadius: 2 },
  progressFill: { height: 4, borderRadius: 2 },
  soruScroll: { flex: 1, padding: 16 },
  soruMetin: { color: '#fff', fontSize: 15, lineHeight: 24, marginBottom: 20 },
  secenek: { flexDirection: 'row', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, alignItems: 'flex-start' },
  secenekHarf: { fontSize: 14, fontWeight: 'bold', marginRight: 10, width: 20 },
  secenekText: { fontSize: 14, flex: 1, lineHeight: 20 },
  aciklamaBox: { borderWidth: 1.5, borderRadius: 12, padding: 14, marginTop: 8, marginBottom: 4 },
  aciklamaSonuc: { fontSize: 14, fontWeight: 'bold', lineHeight: 20, marginBottom: 8 },
  aciklamaText: { color: '#ddd', fontSize: 13, lineHeight: 20 },
  altBtn: { padding: 16, paddingBottom: 24 },
  sonrakiBtn: { borderRadius: 12, padding: 16, alignItems: 'center' },
  sonrakiBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sonucContainer: { alignItems: 'center', padding: 20, paddingTop: 40 },
  sonucEmoji: { fontSize: 64, marginBottom: 12 },
  sonucBaslik: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  sonucDenemeAdi: { color: '#8899AA', fontSize: 13, marginBottom: 20, textAlign: 'center' },
  sonucKart: { backgroundColor: '#1A2635', borderRadius: 16, padding: 24, alignItems: 'center', width: '100%', marginBottom: 16 },
  netPuan: { fontSize: 56, fontWeight: 'bold' },
  netLabel: { color: '#8899AA', fontSize: 14, marginTop: 4 },
  sonucDetay: { flexDirection: 'row', backgroundColor: '#1A2635', borderRadius: 12, padding: 16, width: '100%', marginBottom: 16 },
  sonucItem: { flex: 1, alignItems: 'center' },
  sonucDogru: { color: '#27AE60', fontSize: 28, fontWeight: 'bold' },
  sonucYanlis: { color: '#E74C3C', fontSize: 28, fontWeight: 'bold' },
  sonucBos: { color: '#8899AA', fontSize: 28, fontWeight: 'bold' },
  sonucLabel: { color: '#8899AA', fontSize: 12, marginTop: 4 },
  ayirac: { width: 1, backgroundColor: '#2A3F55' },
  tekrarBtn: { borderRadius: 12, padding: 16, width: '100%', alignItems: 'center', marginTop: 8, marginBottom: 8 },
  tekrarBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  geriBtn2: { padding: 12 },
  geriBtnText: { color: '#8899AA', fontSize: 14 },
});
