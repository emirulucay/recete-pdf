"use client";

import React, { useState, useRef, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import { Plus, Download, FileText, UserCircle, X, RefreshCw } from "lucide-react";

// --- TİP TANIMLAMALARI ---
interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  // Revize Alanları
  hasRevision: boolean;
  revisionCount: number;
  revisionPrice: number;
}

interface ContactDetails {
  name: string;
  email: string;
  phone: string;
}

// --- FORMATLAYICILAR ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(amount);
};

export default function ProposalGenerator() {
  // --- STATE ---
  const [freelancer, setFreelancer] = useState<ContactDetails>({
    name: "Adın Soyadın",
    email: "iletisim@adsoyad.com",
    phone: "+90 555 000 00 00",
  });

  const [client, setClient] = useState({
    name: "Müşteri Firma Adı",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState<ServiceItem[]>([
    {
      id: "1",
      name: "Kurumsal Kimlik Tasarımı",
      description: "Logo, kartvizit ve antetli kağıt tasarımı",
      price: 15000,
      quantity: 1,
      hasRevision: true,
      revisionCount: 2,
      revisionPrice: 1500,
    },
  ]);

  // --- HESAPLAMALAR ---
  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      const revisionTotal = item.hasRevision ? (item.revisionPrice * item.revisionCount) : 0;
      return acc + itemTotal + revisionTotal;
    }, 0);
    
    return { total: subtotal };
  }, [items]);

  // --- AKSİYONLAR ---
  const addItem = () => {
    const newItem: ServiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      description: "",
      price: 0,
      quantity: 1,
      hasRevision: false,
      revisionCount: 1,
      revisionPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof ServiceItem, value: any) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // --- PDF YAZDIRMA ---
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Teklif-${client.name}`,
  });

  return (
    <div className="h-screen w-full bg-gray-100 text-gray-800 flex font-sans overflow-hidden">
      
      {/* --- SOL PANEL: EDİTÖR --- */}
      <aside className="w-[380px] bg-white border-r border-gray-200 shadow-xl z-20 flex flex-col h-full shrink-0">
        
        {/* Başlık */}
        <div className="p-5 border-b border-gray-100 bg-white z-10">
            <div className="flex items-center gap-2 text-gray-800">
                <FileText className="w-5 h-5 text-black" />
                <h1 className="font-bold text-lg tracking-tight">Teklif Oluşturucu</h1>
            </div>
        </div>

        {/* Form Alanı */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
            
            {/* Freelancer Bilgileri */}
            <section>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <UserCircle className="w-3 h-3" /> Senin Bilgilerin
                </h3>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
                    <input
                        type="text"
                        value={freelancer.name}
                        onChange={(e) => setFreelancer({...freelancer, name: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-200 pb-1 text-sm font-semibold focus:border-black outline-none placeholder-gray-400 transition-colors"
                        placeholder="Adın Soyadın"
                    />
                    <input
                        type="text"
                        value={freelancer.email}
                        onChange={(e) => setFreelancer({...freelancer, email: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-200 pb-1 text-xs focus:border-black outline-none placeholder-gray-400 transition-colors"
                        placeholder="E-posta Adresin"
                    />
                     <input
                        type="text"
                        value={freelancer.phone}
                        onChange={(e) => setFreelancer({...freelancer, phone: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-200 pb-1 text-xs focus:border-black outline-none placeholder-gray-400 transition-colors"
                        placeholder="Telefon Numaran"
                    />
                </div>
            </section>

            {/* Müşteri Bilgileri */}
            <section>
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Müşteri Detayları</h3>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
                    <input
                        type="text"
                        value={client.name}
                        onChange={(e) => setClient({...client, name: e.target.value})}
                        className="w-full bg-transparent border-b border-gray-200 pb-1 text-sm font-semibold focus:border-black outline-none placeholder-gray-400 transition-colors"
                        placeholder="Müşteri Firma Adı"
                    />
                    <input
                        type="date"
                        value={client.date}
                        onChange={(e) => setClient({...client, date: e.target.value})}
                        className="w-full bg-transparent text-xs text-gray-500 outline-none pt-1"
                    />
                </div>
            </section>

             {/* Hizmet Listesi */}
             <section>
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Hizmetler & Revizeler</h3>
                </div>
                
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="group relative bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-400 transition-all shadow-sm">
                            
                            {/* ANA HİZMET GİRİŞİ */}
                            <div className="flex gap-3">
                                <div className="flex flex-col w-12 shrink-0">
                                    <label className="text-[9px] text-gray-400 mb-0.5">Adet</label>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value))}
                                        className="w-full bg-gray-50 rounded px-1 py-1 text-center text-xs font-bold outline-none focus:ring-1 focus:ring-black"
                                    />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <label className="text-[9px] text-gray-400 block">Hizmet / Açıklama</label>
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                        placeholder="Hizmet adı..."
                                        className="w-full text-sm font-medium outline-none placeholder-gray-300 border-b border-transparent focus:border-gray-200"
                                    />
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                        placeholder="Kısa açıklama..."
                                        className="w-full text-[11px] text-gray-500 outline-none placeholder-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="mt-2 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between">
                                <div className="w-24 relative">
                                     <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₺</span>
                                     <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value))}
                                        className="w-full pl-4 text-xs font-medium outline-none bg-transparent"
                                        placeholder="Birim Fiyat"
                                    />
                                </div>
                                
                                {/* Revize Toggle Butonu */}
                                <button 
                                    onClick={() => updateItem(item.id, "hasRevision", !item.hasRevision)}
                                    className={`text-[10px] px-2 py-1 rounded border transition-colors flex items-center gap-1 ${item.hasRevision ? 'bg-black text-white border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                                >
                                    <RefreshCw className="w-3 h-3" /> 
                                    {item.hasRevision ? 'Revize Açık' : 'Revize Ekle'}
                                </button>
                            </div>

                            {/* REVİZE DETAY ALANI (Açılır/Kapanır) */}
                            {item.hasRevision && (
                                <div className="mt-3 bg-gray-50 rounded p-2 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="flex items-center gap-2 mb-1 text-[10px] font-bold text-gray-400 uppercase">
                                        <RefreshCw className="w-3 h-3" /> Ekstra Revize Seçenekleri
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <label className="text-[9px] text-gray-400 block">Revize Sayısı</label>
                                            <input 
                                                type="number" 
                                                value={item.revisionCount}
                                                onChange={(e) => updateItem(item.id, "revisionCount", parseFloat(e.target.value))}
                                                className="w-full text-xs p-1 rounded border border-gray-200 outline-none focus:border-black"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="text-[9px] text-gray-400 block">Revize Başı Fiyat</label>
                                            <input 
                                                type="number" 
                                                value={item.revisionPrice}
                                                onChange={(e) => updateItem(item.id, "revisionPrice", parseFloat(e.target.value))}
                                                className="w-full text-xs p-1 rounded border border-gray-200 outline-none focus:border-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={() => removeItem(item.id)}
                                className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500 z-10"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={addItem}
                    className="mt-4 w-full py-2 text-xs font-medium border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black hover:border-gray-400 transition-all flex items-center justify-center gap-1"
                >
                    <Plus className="w-3 h-3" /> Yeni Hizmet Ekle
                </button>
            </section>
        </div>

        {/* Footer Buton */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0 z-10">
           <button
            onClick={() => handlePrint && handlePrint()}
            className="w-full h-11 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm shadow-lg"
          >
            <Download className="w-4 h-4" /> PDF Olarak İndir
          </button>
        </div>
      </aside>

      {/* --- SAĞ PANEL: PDF ÖNİZLEME --- */}
      <main className="flex-1 h-full bg-[#e0e0e0] flex items-center justify-center relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
        </div>

        <div className="transform scale-[0.65] md:scale-[0.75] xl:scale-[0.9] shadow-2xl transition-all duration-300 ease-out origin-center">
          
          <div
            ref={componentRef}
            className="w-[210mm] h-[297mm] bg-white p-[20mm] relative text-black flex flex-col justify-between"
            style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }} 
          >
            {/* --- PDF İÇERİĞİ --- */}
            <div>
              {/* Header: Sadece Sağ Taraf (Freelancer) Kaldı */}
              <div className="flex justify-end items-start pb-8 mb-8 border-b border-black">
                <div className="text-right">
                  <h2 className="text-xl font-bold uppercase tracking-wider mb-1">{freelancer.name}</h2>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <p>{freelancer.email}</p>
                    <p>{freelancer.phone}</p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between items-end mb-16">
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">SAYIN MÜŞTERİ</p>
                    <h3 className="text-2xl font-medium text-gray-900">{client.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Tarih: {client.date}</p>
                 </div>
              </div>

              {/* TABLO */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider w-3/5">Hizmet Detayı</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Miktar</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Birim Fiyat</th>
                    <th className="pb-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Tutar</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {items.map((item) => (
                    <React.Fragment key={item.id}>
                        {/* ANA HİZMET SATIRI */}
                        <tr className={`border-b ${item.hasRevision ? 'border-dotted border-gray-200' : 'border-gray-100'}`}>
                            <td className="py-4 pr-4 align-top">
                                <span className="block font-bold text-gray-900 text-sm">{item.name}</span>
                                <span className="block text-xs text-gray-500 mt-1">{item.description}</span>
                            </td>
                            <td className="py-4 text-center align-top text-gray-600 text-xs">{item.quantity}</td>
                            <td className="py-4 text-right align-top text-gray-600 text-xs">{formatCurrency(item.price)}</td>
                            <td className="py-4 text-right align-top font-bold text-gray-900 text-sm">
                                {formatCurrency(item.price * item.quantity)}
                            </td>
                        </tr>

                        {/* REVİZE SATIRI (Varsa) */}
                        {item.hasRevision && (
                            <tr className="border-b border-gray-100 bg-gray-50/60">
                                <td className="py-2 pr-4 align-middle pl-6 relative">
                                    {/* L şeklindeki bağlantı çizgisi */}
                                    <span className="absolute left-2 top-0 bottom-1/2 w-3 border-l border-b border-gray-300 rounded-bl-lg"></span>
                                    <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                                        <span className="bg-gray-200 text-gray-700 text-[10px] px-1.5 py-0.5 rounded">Ekstra Revize Hakkı</span>
                                    </span>
                                </td>
                                <td className="py-2 text-center align-middle text-gray-500 text-xs">
                                    {item.revisionCount}
                                </td>
                                <td className="py-2 text-right align-middle text-gray-500 text-xs">
                                    {formatCurrency(item.revisionPrice)}
                                </td>
                                <td className="py-2 text-right align-middle font-medium text-gray-700 text-xs">
                                    + {formatCurrency(item.revisionPrice * item.revisionCount)}
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div>
              <div className="flex justify-end mb-12">
                <div className="w-1/2 flex flex-col items-end gap-2">
                  <div className="w-full flex justify-between items-center py-2 border-b border-gray-100 text-xs text-gray-500">
                    <span>Ara Toplam</span>
                    <span>{formatCurrency(totals.total)}</span>
                  </div>
                   <div className="w-full flex justify-between items-center py-3 border-t-2 border-black mt-2">
                    <span className="text-sm font-bold text-gray-900">GENEL TOPLAM</span>
                    <span className="text-3xl font-bold text-black">{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 uppercase tracking-wider text-center border-t border-gray-100 pt-6 flex flex-col gap-1">
                <span>Bu teklif bilgilendirme amaçlıdır.</span>
                <span className="font-bold text-gray-300">FREELANCE TEKLİF SİSTEMİ</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}