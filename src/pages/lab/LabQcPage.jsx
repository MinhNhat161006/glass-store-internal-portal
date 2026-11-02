import React, { useState, useEffect } from 'react';
import { labApi } from '../../api/labApi';
import { message } from 'antd';

export default function LabQcPage() {
  const [selectedTray, setSelectedTray] = useState('');

  // Checklist state
  const [checks, setChecks] = useState({
    optics: true,
    mechanics: true,
    coating: true,
    packaging: true
  });

  const toggleCheck = (key) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAction = (msg) => {
    message.success(msg);
  };

    const [qcQueue, setQcQueue] = useState([]);
  const selectedItem = qcQueue.find(q => q.id === selectedTray) || qcQueue[0] || null;

  useEffect(() => {
    labApi.getAllLabJobs().then(data => {
      if (Array.isArray(data)) {
        const mapped = data.map((j) => ({
          id: j.jobNumber || ('#LAB-' + j.id),
          tray: 'Khay #' + j.id,
          customer: j.customerName || 'Kh�ch H�ng',
          frame: j.frameInfo || 'G?ng K�nh �on H�ng',
          lens: j.lensInfo || 'Tr�ng K�nh Kh�c X?',
          tech: j.technicianName || 'KTV Tr?n Van K? Thu?t',
          status: j.status === 'QC_PASSED' ? 'passed' : 'inspecting',
          statusLabel: j.status === 'QC_PASSED' ? '�� d?t QC' : 'Ch? ki?m tra',
          statusClass: 'bg-primary-fixed text-on-primary-fixed',
          priority: 'Ti�u chu?n',
          time: 'H�m nay'
        }));
        setQcQueue(mapped);
        if (mapped.length > 0) setSelectedTray(mapped[0].id);
      }
    }).catch(e => console.warn('QC live sync:', e));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-xl shadow-xs border border-[#d8e3fb]/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-outline">XU?NG LAB</span>
              <span className="text-outline">/</span>
              <span className="font-label-md text-label-md text-primary font-semibold">KI?M TRA CH?T LU?NG (QC) &amp; ��NG G�I</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Ki?m Tra Ch?t Lu?ng K�nh &amp; ��ng G�i (Optical QA)
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Th?m d?nh sai s? kh�c x? qua m�y Lensmeter, ki?m tra d? ho�n thi?n co h?c v� ni�m phong tem b�n giao POS.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Lensmeter Nidek LM-1800PD: �?ng B? Live
            </div>
            <button
              onClick={() => handleAction('�� hi?u chu?n m�y do Lensmeter chu?n 0.00D')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-label-md font-label-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-primary">tune</span>
              <span>Hi?u Chu?n M�y [F4]</span>
            </button>
          </div>
        </div>

        {/* 2. 4 QC KPI METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">T?ng Nghi?m Thu</span>
              <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">eyeglasses</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-on-surface font-bold">{qcQueue.length}</span>
              <span className="font-label-md text-label-md text-outline">c?p</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Ho�n th�nh 75% ca s�ng
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">�?t Chu?n (Pass QC)</span>
              <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">verified</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-primary font-bold">{qcQueue.length}</span>
              <span className="font-label-md text-label-md text-primary font-semibold">t? l? 100%</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Chu?n ANSI Z80.1 qu?c t?
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-error uppercase tracking-wider font-semibold">L?i / M�i L?i</span>
              <div className="w-7 h-7 rounded-lg bg-error-container text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">replay</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-error font-bold">0</span>
              <span className="font-label-md text-label-md text-error">c?p</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-error">
              L?ch t�m PD &gt; 0.5mm
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Ch? B�n Giao POS</span>
              <div className="w-7 h-7 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">package_2</span>
              </div>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="font-display-lg text-display-lg text-on-secondary-container font-bold">0</span>
              <span className="font-label-md text-label-md text-outline">h?p</span>
            </div>
            <div className="mt-1 pt-1.5 border-t border-[#e7eeff] text-body-sm text-[11px] text-outline">
              Chua c� don ch? giao
            </div>
          </div>
        </div>

        {/* 3. TWO-COLUMN QC WORKSTATION */}
        <div className="grid grid-cols-12 gap-3.5 items-start">

          {/* Left Column (4/12): QC Waiting Queue */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-2.5">
            <div className="p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Khay Ch? �o Ki?m ({qcQueue.length})</span>
                <span className="font-label-mono text-[11px] text-outline">F2 Scan</span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-[16px]">qr_code_scanner</span>
                <input
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface font-label-mono text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-outline"
                  placeholder="Qu�t m� khay / M� don #LAB-..."

                />
              </div>
            </div>

            {/* Tray List */}
<div className="flex flex-col gap-2">
  {qcQueue.length === 0 ? (
    <div className="p-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-[#d8e3fb]">
      <span className="material-symbols-outlined text-3xl text-slate-300 mb-1">rule</span>
      <p className="text-xs text-outline font-medium">Chua c� khay k�nh n�o c?n do ki?m QC</p>
    </div>
  ) : (
    qcQueue.map((item) => {
                const isSelected = selectedTray === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTray(item.id)}
                    className={`p-3 rounded-xl transition-all cursor-pointer relative border ${
                      isSelected
                        ? 'bg-surface-container-lowest border-primary/30 shadow-sm ring-1 ring-primary/20'
                        : 'bg-surface-container-lowest border-[#d8e3fb]/40 hover:border-primary/20 hover:shadow-xs'
                    }`}
                  >
                    {isSelected && <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-primary rounded-r"></div>}
                    <div className="flex items-start justify-between pl-1">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-label-mono font-bold text-primary text-xs">{item.id}</span>
                          <span className={`px-2 py-0.2 rounded-full text-[10px] font-semibold ${item.statusClass}`}>
                            {item.statusLabel}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-mono text-[10px] text-outline">{item.tray}</span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold mt-1">{item.customer}</h3>
                        <div className="text-[11px] text-outline mt-0.5 truncate">{item.frame}</div>
                      </div>
                      <span className="text-[10px] font-label-mono text-outline">{item.time}</span>
                    </div>
                  </div>
                );
                }))}
            </div>
          </div>

          {/* Right Column (8/12): Focal Inspection Station */}
{qcQueue.length === 0 ? (
  <div className="col-span-12 xl:col-span-8 p-12 text-center bg-surface-container-lowest rounded-xl border border-dashed border-[#d8e3fb] flex flex-col items-center justify-center">
    <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">verified</span>
    <h3 className="font-title-md text-on-surface font-semibold">Tr?m Ki?m �?nh Quang H?c (Lensmeter QA) S?n S�ng</h3>
    <p className="text-xs text-outline max-w-md mt-1">Khi xu?ng ho�n t?t m�i l?p c�c c?p k�nh thu?c, khay k? thu?t s? du?c chuy?n sang tr?m n�y d? th?m d?nh sai s? quang h?c.</p>
  </div>
) : (
  <div className="col-span-12 xl:col-span-8 flex flex-col gap-3">

            {/* Order Details Header */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#e7eeff] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary-container text-on-primary font-label-mono font-bold text-xs">
                      �ON �ANG �O: #LAB-2026-088
                    </span>
                    <span className="font-label-mono text-[11px] text-outline">Toa #RX-2026-889</span>
                    <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-semibold">
                      VIP Titanium
                    </span>
                  </div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                    Kh�ch: Nguy?n Ho�ng Duy (32 Tu?i � Nam � Flagship Q.1)
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] text-outline block">B�c si ch? d?nh:</span>
                  <span className="font-title-md text-title-md text-primary font-semibold">BS. Vu Anh Tu?n</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-body-sm">
                <div className="p-2 rounded-lg bg-surface-container-low border border-[#d8e3fb]/30">
                  <span className="text-[10px] text-outline block">KTV M�i L?p</span>
                  <span className="font-semibold text-on-surface">Tr?n Van B�ch</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-[#d8e3fb]/30">
                  <span className="text-[10px] text-outline block">M�y M�i 3D</span>
                  <span className="font-semibold text-on-surface">Essilor Delta #01</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-[#d8e3fb]/30">
                  <span className="text-[10px] text-outline block">G?ng K�nh</span>
                  <span className="font-semibold text-on-surface truncate block">{selectedItem?.frame || 'Gọng Kính Đơn Hàng'}</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low border border-[#d8e3fb]/30">
                  <span className="text-[10px] text-outline block">Tr�ng K�nh</span>
                  <span className="font-semibold text-on-surface truncate block">{selectedItem?.lens || 'Tròng Kính Khúc Xạ'}</span>
                </div>
              </div>
            </div>

            {/* Compact Optical Comparison Table (OD & OS) */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">biotech</span>
                  1. �?i Chi?u Quang H?c (Toa Kh�m vs Th?c T? Lensmeter)
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                  Chu?n ANSI Z80.1 (�0.12D)
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#d8e3fb]/40">
                <table className="w-full text-left font-body-md text-body-md">
                  <thead className="bg-surface-container-low text-outline font-label-md text-label-md uppercase">
                    <tr>
                      <th className="py-2 px-3">M?t</th>
                      <th className="py-2 px-3">Th�ng S?</th>
                      <th className="py-2 px-3 text-center">Toa K� (Rx)</th>
                      <th className="py-2 px-3 text-center text-primary font-bold">Lensmeter �o</th>
                      <th className="py-2 px-3 text-center text-outline">Sai S? (?)</th>
                      <th className="py-2 px-3 text-center">��nh Gi�</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d8e3fb]/30 font-label-mono text-body-sm text-on-surface">
                    {/* OD */}
                    <tr>
                      <td className="py-2 px-3 font-bold text-primary bg-primary-fixed/20 text-center" rowSpan={3}>OD</td>
                      <td className="py-2 px-3 font-medium">�? C?u (SPH)</td>
                      <td className="py-2 px-3 text-center font-bold">-3.25 D</td>
                      <td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-3.25 D</td>
                      <td className="py-2 px-3 text-center text-outline">0.00 D</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">�? Tr? (CYL)</td>
                      <td className="py-2 px-3 text-center font-bold">-0.75 D</td>
                      <td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">-0.73 D</td>
                      <td className="py-2 px-3 text-center text-outline">+0.02 D</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Tr?c (AXIS) &amp; PD</td>
                      <td className="py-2 px-3 text-center font-bold">180� � 32.0mm</td>
                      <td className="py-2 px-3 text-center font-bold text-primary bg-primary-fixed/10">180.5� � 32.0mm</td>
                      <td className="py-2 px-3 text-center text-outline">+0.5� � 0.0mm</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>

                    {/* OS */}
                    <tr>
                      <td className="py-2 px-3 font-bold text-secondary bg-secondary-fixed/30 text-center" rowSpan={3}>OS</td>
                      <td className="py-2 px-3 font-medium">�? C?u (SPH)</td>
                      <td className="py-2 px-3 text-center font-bold">-2.75 D</td>
                      <td className="py-2 px-3 text-center font-bold text-secondary bg-secondary-fixed/10">-2.75 D</td>
                      <td className="py-2 px-3 text-center text-outline">0.00 D</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">�? Tr? (CYL)</td>
                      <td className="py-2 px-3 text-center font-bold">-0.50 D</td>
                      <td className="py-2 px-3 text-center font-bold text-secondary bg-secondary-fixed/10">-0.50 D</td>
                      <td className="py-2 px-3 text-center text-outline">0.00 D</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Tr?c (AXIS) &amp; PD</td>
                      <td className="py-2 px-3 text-center font-bold">175� � 32.0mm</td>
                      <td className="py-2 px-3 text-center font-bold text-secondary bg-secondary-fixed/10">175� � 31.8mm</td>
                      <td className="py-2 px-3 text-center text-outline">0� � -0.2mm</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">�?T CHU?N</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4-Item Finishing & Packaging Checklist */}
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <span className="font-title-md text-title-md text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                2. Nghi?m Thu Co H?c &amp; ��ng G�i
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-body-sm">
                <label
                  onClick={() => toggleCheck('optics')}
                  className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    checks.optics ? 'bg-surface-container-lowest border-primary/40 text-on-surface' : 'bg-surface-container-low border-[#d8e3fb]/40 text-outline'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${checks.optics ? 'text-primary' : 'text-outline'}`}>
                    {checks.optics ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>�? kh?p vi?n khung &amp; r�nh V (Mini Bevel)</span>
                </label>

                <label
                  onClick={() => toggleCheck('coating')}
                  className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    checks.coating ? 'bg-surface-container-lowest border-primary/40 text-on-surface' : 'bg-surface-container-low border-[#d8e3fb]/40 text-outline'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${checks.coating ? 'text-primary' : 'text-outline'}`}>
                    {checks.coating ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>V�ng ph? AR kh�ng xu?c, kh�ng b?i kh�</span>
                </label>

                <label
                  onClick={() => toggleCheck('mechanics')}
                  className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    checks.mechanics ? 'bg-surface-container-lowest border-primary/40 text-on-surface' : 'bg-surface-container-low border-[#d8e3fb]/40 text-outline'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${checks.mechanics ? 'text-primary' : 'text-outline'}`}>
                    {checks.mechanics ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>C�n ch?nh 4 di?m (Bench Alignment) &amp; Ve mui</span>
                </label>

                <label
                  onClick={() => toggleCheck('packaging')}
                  className={`p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    checks.packaging ? 'bg-surface-container-lowest border-primary/40 text-on-surface' : 'bg-surface-container-low border-[#d8e3fb]/40 text-outline'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${checks.packaging ? 'text-primary' : 'text-outline'}`}>
                    {checks.packaging ? 'check_box' : 'check_box_outline_blank'}
                  </span>
                  <span>D�n tem ni�m phong QC &amp; Khan lau h�ng</span>
                </label>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-[#d8e3fb]/40 gap-3">
              <button
                onClick={() => handleAction('�� l?p bi�n b?n y�u c?u m�i l?i do kh�ng d?t chu?n')}
                className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-error-container text-on-surface hover:text-on-error-container font-label-md text-label-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">replay</span>
                <span>Y�u C?u M�i L?i (Re-Edge)</span>
              </button>

              <button
                onClick={() => handleAction('�� NGHI?M THU �?T CHU?N (PASS QC)! Chuy?n don sang qu?y POS b�n giao kh�ch')}
                className="flex-1 py-2 px-4 rounded-xl bg-primary text-on-primary hover:bg-[#0b4d6b] font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>�?T CHU?N (PASS QC) &amp; B�N GIAO POS</span>
              </button>
            </div></div>)}
      </div>
    </div>
  </div>
);
}






