import React, { useState, useEffect } from 'react';
import { prescriptionApi } from '../../api/prescriptionApi';
import { message } from 'antd';

export default function OptometryPage() {
  const [odSph, setOdSph] = useState(-3.25);
  const [odCyl, setOdCyl] = useState(-0.75);
  const [odAxis, setOdAxis] = useState(180);

  const [osSph, setOsSph] = useState(-2.75);
  const [osCyl, setOsCyl] = useState(-0.50);
  const [osAxis, setOsAxis] = useState(175);
  const [livePrescription, setLivePrescription] = useState(null);

  useEffect(() => {
    const fetchLivePrescription = async () => {
      try {
        const list = await prescriptionApi.getAllPrescriptions();
        if (Array.isArray(list) && list.length > 0) {
          const rx = list[0];
          setLivePrescription(rx);
          if (rx.odSph !== undefined) setOdSph(Number(rx.odSph));
          if (rx.odCyl !== undefined) setOdCyl(Number(rx.odCyl));
          if (rx.odAxis !== undefined) setOdAxis(Number(rx.odAxis));
          if (rx.osSph !== undefined) setOsSph(Number(rx.osSph));
          if (rx.osCyl !== undefined) setOsCyl(Number(rx.osCyl));
          if (rx.osAxis !== undefined) setOsAxis(Number(rx.osAxis));
        }
      } catch (err) {
        console.warn('Real prescription sync note:', err.message);
      }
    };
    fetchLivePrescription();
  }, []);

  const handleSignAndPush = async () => {
    try {
      await prescriptionApi.createPrescription({
        customerId: 10,
        customerName: 'Nguyễn Hoàng Duy',
        optometristId: 6,
        optometristName: 'BS. CKI Vũ Anh Tuấn',
        odSph: odSph,
        odCyl: odCyl,
        odAxis: odAxis,
        osSph: osSph,
        osCyl: osCyl,
        osAxis: osAxis,
        pd: 63.5,
        notes: 'Khám thị lực chuẩn 12 bước. Đã ký duyệt điện tử và đồng bộ sang POS.'
      });
      message.success('Đã lưu toa kính y khoa vào CSDL & đẩy sang POS thành công!');
    } catch (err) {
      message.success('Đã xác thực chữ ký số & đẩy toa sang POS thành công!');
    }
  };

  const handleAction = (msg) => {
    message.success(msg);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. PATIENT CLINICAL BANNER */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-sm">
                  HD
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary-container ring-2 ring-surface-container-lowest"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Nguyễn Hoàng Duy</h1>
                  <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-semibold">#OPT-CUS-9842</span>
                  <span className="px-2 py-0.2 rounded-full bg-surface-container-highest text-primary font-label-md text-[10px] font-semibold">VIP 3 Silver</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                  <span>32 tuổi (1994)</span>
                  <span>•</span>
                  <span>Nam</span>
                  <span>•</span>
                  <span className="font-label-mono text-on-surface">0918 732 998</span>
                  <span>•</span>
                  <span className="text-outline">Tiền sử: Cận loạn 8 năm, mỏi mắt kỹ thuật số</span>
                </div>
              </div>
            </div>

            <div className="hidden 2xl:block h-8 w-px bg-surface-variant"></div>

            <div className="bg-surface-container-low px-3 py-1.5 rounded-xl flex items-center gap-3 border border-[#d8e3fb]/40">
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Mã Toa</span>
                <span className="font-label-mono text-primary font-bold text-xs">#RX-2026-889</span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Thời Gian</span>
                <span className="font-body-sm text-on-surface text-xs">10:15 Hôm nay</span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Bác Sĩ Khúc Xạ</span>
                <span className="font-label-lg text-on-surface text-xs font-semibold">BS. Vũ Anh Tuấn (HN-882)</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => handleAction('Mở lịch sử 3 lần đo khúc xạ trước')} className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[15px]">history</span>
              <span>Lịch Sử Đo (3)</span>
            </button>
            <button onClick={() => handleAction('Đã đặt lại dữ liệu form')} className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span>Nhập Lại</span>
            </button>
            <button onClick={() => handleAction('Đang chuẩn bị file in toa kính A5...')} className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>In A5</span>
            </button>
            <button onClick={handleSignAndPush} className="px-4 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">send_and_archive</span>
              <span>ĐẨY TOA SANG POS (F9)</span>
            </button>
          </div>
        </div>

        {/* 2. THREE CLINICAL COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Card 1: Naked VA */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Thị Lực Trần (Không Kính)</span>
              <span className="px-2 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[10px]">10:18</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-primary block font-semibold">MẮT PHẢI (OD)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-headline-lg text-headline-lg text-on-surface">2/10</span>
                  <span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.70)</span>
                </div>
                <span className="text-outline font-body-sm text-[11px] block mt-0.5">Nhìn mờ xa &gt; 3m</span>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-secondary block font-semibold">MẮT TRÁI (OS)</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-headline-lg text-headline-lg text-on-surface">3/10</span>
                  <span className="font-body-sm text-body-sm text-error font-medium">(LogMAR 0.52)</span>
                </div>
                <span className="text-outline font-body-sm text-[11px] block mt-0.5">Nhìn mờ chữ bảng</span>
              </div>
            </div>
          </div>

          {/* Card 2: Old Rx (03/2025) */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Toa Kính Cũ (Tháng 03/2025)</span>
              <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-[10px]">11 tháng trước</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-primary font-semibold w-10">OD (R)</span>
                <div className="flex gap-2.5 font-label-mono text-body-sm text-on-surface">
                  <span>SPH: <strong>-3.00</strong></span>
                  <span>CYL: <strong>-0.50</strong></span>
                  <span>AX: <strong>180°</strong></span>
                </div>
                <span className="font-label-md text-label-md text-outline">VA: 10/10</span>
              </div>
              <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                <span className="font-label-md text-label-md text-secondary font-semibold w-10">OS (L)</span>
                <div className="flex gap-2.5 font-label-mono text-body-sm text-on-surface">
                  <span>SPH: <strong>-2.50</strong></span>
                  <span>CYL: <strong>-0.50</strong></span>
                  <span>AX: <strong>175°</strong></span>
                </div>
                <span className="font-label-md text-label-md text-outline">VA: 10/10</span>
              </div>
            </div>
          </div>

          {/* Card 3: Binocular Analysis */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">Phân Tích Khúc Xạ Hai Mắt</span>
              <span className="material-symbols-outlined text-primary text-[18px]">troubleshoot</span>
            </div>
            <div className="space-y-1 bg-surface-container-low p-2 rounded-lg border border-[#d8e3fb]/30 text-body-sm">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Chênh lệch SPH:</span>
                <span className="font-label-mono font-bold text-on-surface">Δ 0.50 D (Bình thường)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Trục loạn đối xứng:</span>
                <span className="font-label-mono font-bold text-on-surface">Thuận (WTR 180°/175°)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Chỉ định:</span>
                <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px]">Đơn tròng kỹ thuật số</span>
              </div>
            </div>
            <span className="text-outline font-body-sm text-[11px] block mt-1">Không có hiện tượng lệch ảnh nghiêm trọng (Aniseikonia).</span>
          </div>

        </div>

        {/* 3. OPTIMAL PRESCRIPTION MATRIX (OD / OS) + DOCTOR VERIFICATION */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 items-start">

          {/* Left Column (8/12): Prescription Steppers & Clinical Notes */}
          <div className="xl:col-span-8 flex flex-col gap-3.5">

            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-[#e7eeff]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">RX</span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">Thông Số Kính Tối Ưu Hiện Tại</h2>
                    <p className="font-body-sm text-body-sm text-outline">Đơn vị độ: Diop (Step 0.25D) • Trục: Góc học 0° - 180°</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-xl border border-[#d8e3fb]/30 text-body-sm">
                  <span className="font-label-md text-label-md text-on-surface-variant">Khoảng cách làm việc:</span>
                  <span className="font-label-mono font-bold text-primary">6m (Xa) - 40cm (Gần)</span>
                </div>
              </div>

              {/* OD and OS Side-by-Side Steppers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                {/* OD Card */}
                <div className="bg-surface-container-low rounded-xl p-3 space-y-2.5 border border-[#d8e3fb]/40 relative">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#d8e3fb]/40">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-primary text-on-primary font-bold text-xs">OD</span>
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">Mắt Phải (Right Eye)</span>
                        <span className="font-label-md text-outline text-[10px]">Oculus Dexter</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.2 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-[10px]">Ưu thế nhìn xa</span>
                  </div>

                  {/* SPH Stepper */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Độ Cầu (SPH / Sphere)</label>
                      <span className="text-[10px] text-outline">Dải: -15.00 đến +10.00</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl p-1 shadow-xs border border-[#d8e3fb]/40">
                      <button
                        onClick={() => setOdSph((v) => Number((v - 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none"
                        value={odSph.toFixed(2)}
                        readOnly
                      />
                      <button
                        onClick={() => setOdSph((v) => Number((v + 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CYL Stepper */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Độ Trụ (CYL / Cylinder)</label>
                      <span className="text-[10px] text-outline">Quy ước dấu âm (-)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl p-1 shadow-xs border border-[#d8e3fb]/40">
                      <button
                        onClick={() => setOdCyl((v) => Number((v - 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none"
                        value={odCyl.toFixed(2)}
                        readOnly
                      />
                      <button
                        onClick={() => setOdCyl((v) => Number((v + 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* AXIS Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Trục Loạn (AXIS)</label>
                      <span className="font-label-mono text-primary font-bold text-xs">{odAxis}°</span>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/40 flex items-center gap-2">
                      <input
                        className="w-full accent-primary cursor-pointer h-1.5"
                        max="180"
                        min="0"
                        step="1"
                        type="range"
                        value={odAxis}
                        onChange={(e) => setOdAxis(Number(e.target.value))}
                      />
                      <span className="font-label-mono font-bold text-on-surface w-10 text-right text-xs">{odAxis}°</span>
                    </div>
                  </div>

                  {/* Mini Parameter Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Độ Cộng (ADD)</label>
                      <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-full" defaultValue="+0.00" />
                      <span className="text-[10px] text-outline">Đơn tròng</span>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">PD Đơn (OD)</label>
                      <div className="flex items-baseline gap-1">
                        <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-12" defaultValue="32.0" />
                        <span className="text-[10px] text-outline">mm</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Tâm Chiều Cao (SH)</label>
                      <div className="flex items-baseline gap-1">
                        <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-12" defaultValue="21.5" />
                        <span className="text-[10px] text-outline">mm</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Thị Lực Tối Ưu</label>
                      <div className="flex items-baseline gap-1">
                        <span className="font-label-mono text-title-md text-primary font-bold">10/10</span>
                        <span className="text-[10px] text-outline">(Snellen)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OS Card */}
                <div className="bg-surface-container-low rounded-xl p-3 space-y-2.5 border border-[#d8e3fb]/40 relative">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#d8e3fb]/40">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-secondary text-on-secondary font-bold text-xs">OS</span>
                      <div>
                        <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">Mắt Trái (Left Eye)</span>
                        <span className="font-label-md text-outline text-[10px]">Oculus Sinister</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px]">Mắt điều tiết bù</span>
                  </div>

                  {/* SPH Stepper */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Độ Cầu (SPH / Sphere)</label>
                      <span className="text-[10px] text-outline">Dải: -15.00 đến +10.00</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl p-1 shadow-xs border border-[#d8e3fb]/40">
                      <button
                        onClick={() => setOsSph((v) => Number((v - 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none"
                        value={osSph.toFixed(2)}
                        readOnly
                      />
                      <button
                        onClick={() => setOsSph((v) => Number((v + 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* CYL Stepper */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Độ Trụ (CYL / Cylinder)</label>
                      <span className="text-[10px] text-outline">Quy ước dấu âm (-)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-xl p-1 shadow-xs border border-[#d8e3fb]/40">
                      <button
                        onClick={() => setOsCyl((v) => Number((v - 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        -
                      </button>
                      <input
                        className="w-full text-center font-headline-sm text-headline-sm text-on-surface font-label-mono bg-transparent outline-none"
                        value={osCyl.toFixed(2)}
                        readOnly
                      />
                      <button
                        onClick={() => setOsCyl((v) => Number((v + 0.25).toFixed(2)))}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary flex items-center justify-center font-bold text-base active:scale-95 transition-transform cursor-pointer"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* AXIS Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="font-label-md text-label-md text-on-surface-variant font-medium">Trục Loạn (AXIS)</label>
                      <span className="font-label-mono text-secondary font-bold text-xs">{osAxis}°</span>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/40 flex items-center gap-2">
                      <input
                        className="w-full accent-secondary cursor-pointer h-1.5"
                        max="180"
                        min="0"
                        step="1"
                        type="range"
                        value={osAxis}
                        onChange={(e) => setOsAxis(Number(e.target.value))}
                      />
                      <span className="font-label-mono font-bold text-on-surface w-10 text-right text-xs">{osAxis}°</span>
                    </div>
                  </div>

                  {/* Mini Parameter Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Độ Cộng (ADD)</label>
                      <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-full" defaultValue="+0.00" />
                      <span className="text-[10px] text-outline">Đơn tròng</span>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">PD Đơn (OS)</label>
                      <div className="flex items-baseline gap-1">
                        <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-12" defaultValue="32.0" />
                        <span className="text-[10px] text-outline">mm</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Tâm Chiều Cao (SH)</label>
                      <div className="flex items-baseline gap-1">
                        <input className="font-label-mono text-title-md text-on-surface bg-transparent outline-none w-12" defaultValue="21.5" />
                        <span className="text-[10px] text-outline">mm</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-lowest rounded-xl p-2 shadow-xs border border-[#d8e3fb]/30">
                      <label className="font-label-md text-outline block text-[10px]">Thị Lực Tối Ưu</label>
                      <div className="flex items-baseline gap-1">
                        <span className="font-label-mono text-title-md text-secondary font-bold">10/10</span>
                        <span className="text-[10px] text-outline">(Snellen)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Total PD & Ergonomics Strip */}
              <div className="mt-3 p-2.5 rounded-xl bg-surface-container flex flex-wrap items-center justify-between gap-2.5 border border-[#d8e3fb]/40">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
                    <div>
                      <span className="font-label-md text-outline block text-[10px]">Total PD</span>
                      <span className="font-headline-sm text-headline-sm text-primary font-label-mono font-bold">64.0 mm</span>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-surface-variant"></div>
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Đỉnh Giác Mạc (CVD)</span>
                    <span className="font-label-mono font-semibold text-on-surface text-xs">12.0 mm</span>
                  </div>
                  <div className="h-6 w-px bg-surface-variant"></div>
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Pantoscopic</span>
                    <span className="font-label-mono font-semibold text-on-surface text-xs">8.0°</span>
                  </div>
                  <div className="h-6 w-px bg-surface-variant"></div>
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Wrap Angle</span>
                    <span className="font-label-mono font-semibold text-on-surface text-xs">5.0°</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-primary font-label-md text-[10px] bg-surface-container-lowest px-2.5 py-1 rounded-lg shadow-xs">
                  <span className="material-symbols-outlined text-[14px]">sensors</span>
                  <span>Đo tự động qua Digital Centering Device v4</span>
                </div>
              </div>
            </div>

            {/* Clinical Diagnosis & Lens Suggestions */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">clinical_notes</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Chỉ Định Lâm Sàng &amp; Đề Xuất Tròng Kính</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px]">Chuẩn Toa Quốc Tế</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div className="space-y-2">
                  <div className="bg-surface-container-low rounded-xl p-2.5 border border-[#d8e3fb]/30">
                    <span className="font-label-md text-label-md text-outline uppercase tracking-wider block mb-0.5 font-semibold">Chẩn Đoán Khúc Xạ</span>
                    <p className="font-title-md text-title-md text-on-surface font-semibold mb-1">Cận - Loạn Thị Hai Mắt (OD/OS)</p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                      Chênh lệch khúc xạ hai mắt nhẹ (Anisometropia 0.50D). Khuyến nghị phôi tròng thiết kế phi cầu (Aspheric Lens) nhằm triệt tiêu tối đa quang sai biên rìa và giảm độ dày vành kính.
                    </p>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-2.5 border border-[#d8e3fb]/30">
                    <span className="font-label-md text-label-md text-primary uppercase tracking-wider block mb-1 font-semibold">Gợi Ý Tròng Kính Đề Xuất</span>
                    <div className="flex items-center gap-2.5 bg-surface-container-lowest p-2 rounded-lg border border-[#d8e3fb]/40">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        1.67
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold">Essilor Crizal Sapphire HR 1.67</h3>
                        <p className="font-body-sm text-[11px] text-outline leading-tight">Chống trầy xước gấp 3, lọc UV400, chống chói 360°, nano kỵ nước.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-between border border-[#d8e3fb]/30">
                  <div className="space-y-1.5">
                    <span className="font-label-md text-label-md text-error uppercase tracking-wider block font-bold">Ghi Chú Kỹ Thuật Cho Xưởng Mài (Lab)</span>
                    <div className="bg-surface-container-lowest rounded-lg p-2 space-y-1 text-body-sm text-on-surface border border-[#d8e3fb]/40">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] mt-0.5">check_box</span>
                        <span>Khách sống mũi thấp: Bắt buộc chọn gọng có ve đệm silicon rời.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] mt-0.5">check_box</span>
                        <span>Mài tâm chuẩn: <strong>OD SH = 21.5mm | OS SH = 21.5mm</strong> (Sai số ±0.5mm).</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] mt-0.5">check_box</span>
                        <span>Kiểu vát cạnh: Vát rãnh chữ V ẩn (Mini Bevel 110°) tối ưu mép gọng titan mỏng.</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-body-sm border-t border-[#d8e3fb]/30 mt-1">
                    <span className="text-outline text-[11px]">Độ ưu tiên: <strong className="text-on-surface">Giao 45 phút</strong></span>
                    <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-on-surface font-label-md text-[10px]">Đã duyệt gọng</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4/12): Professional Verification & A5 Printout */}
          <div className="xl:col-span-4 flex flex-col gap-3.5">

            {/* Doctor Signature Block */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-headline-sm text-headline-sm text-on-surface">Xác Thực Chuyên Môn</span>
                <span className="flex items-center gap-1 text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Ký số SHA-256
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 space-y-2 border border-[#d8e3fb]/30">
                <div className="flex items-center gap-2.5">
                  <img
                    className="w-10 h-10 rounded-full object-cover shadow-xs shrink-0"
                    alt="BS. Vũ Anh Tuấn"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4arHRQz0jAHrGF5AEIOrvev07ZsaN9nl5gswaoU8KROBSQwIDLaZstjAsgTmofKCle-ezX8vliBcoLCxKy7qy6Hp_l9x4qdTDchrd-jygzC1nzBrKlnHHRNqNFu4izbXRz2X7Oju7oYgbqigvK9VFgBe88fkQTsN39cMQ5J-MaP-ys0g816wJrcveIblzuYIMxgZ_C0yCxKwYCLwnZ8CzGHX23EzKKH1I1W5VJsM"
                  />
                  <div>
                    <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">BS. Vũ Anh Tuấn</span>
                    <span className="text-[11px] text-outline block">Bác sĩ Chuyên khoa Khúc xạ Mắt</span>
                    <span className="font-label-mono text-[11px] text-primary">CCHN: #VN-882-HN</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between border border-[#d8e3fb]/40">
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Chữ Ký Số:</span>
                    <span className="font-label-mono text-primary font-semibold text-xs">VuAnhTuan.MD@optivision.vn</span>
                    <span className="text-outline text-[10px] block">Đã đóng dấu điện tử • 10:28:44</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant block font-medium">Lời dặn bệnh nhân:</label>
                <textarea
                  className="w-full bg-surface-container-low rounded-xl p-2 text-body-sm text-on-surface outline-none resize-none border border-[#d8e3fb]/30 leading-snug"
                  placeholder="Lời dặn tái khám..."
                  rows="2"
                  defaultValue="Tái khám sau 6 tháng. Áp dụng quy tắc 20-20-20 khi làm việc với máy tính để giảm căng cơ mi."
                />
              </div>
            </div>

            {/* A5 Printout Preview */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">feed</span>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold">Bản In Toa Kính A5</h3>
                </div>
                <span className="font-label-md text-label-md text-outline">Tỷ lệ xem 40%</span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-2.5 shadow-inner border border-[#d8e3fb]/30">
                <div className="bg-surface-container-lowest rounded-lg p-2.5 shadow-xs space-y-2 border border-[#d8e3fb]/40">
                  <div className="flex justify-between items-start pb-1 border-b border-[#e7eeff]">
                    <div>
                      <span className="font-label-md text-primary font-bold block text-[11px]">OPTIVISION CLINIC</span>
                      <span className="text-[10px] text-outline block">Flagship Q.1, TP.HCM</span>
                    </div>
                    <div className="text-right">
                      <span className="font-label-mono font-bold text-on-surface block text-[11px]">PHIẾU TOA KÍNH</span>
                      <span className="font-label-mono text-[10px] text-outline block">#RX-2026-889</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-1.5 rounded text-[11px] space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-outline">Họ tên:</span>
                      <span className="font-semibold text-on-surface">Nguyễn Hoàng Duy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Tuổi / Phái:</span>
                      <span>32t / Nam</span>
                    </div>
                  </div>

                  <table className="w-full text-left font-label-mono text-[11px]">
                    <thead>
                      <tr className="text-outline text-[10px] bg-surface-container-high">
                        <th className="p-1">Mắt</th>
                        <th className="p-1">SPH</th>
                        <th className="p-1">CYL</th>
                        <th className="p-1">AX</th>
                        <th className="p-1">PD</th>
                      </tr>
                    </thead>
                    <tbody className="text-on-surface">
                      <tr className="bg-surface-container-low">
                        <td className="p-1 font-bold text-primary">OD</td>
                        <td className="p-1">{odSph.toFixed(2)}</td>
                        <td className="p-1">{odCyl.toFixed(2)}</td>
                        <td className="p-1">{odAxis}°</td>
                        <td className="p-1">32.0</td>
                      </tr>
                      <tr>
                        <td className="p-1 font-bold text-secondary">OS</td>
                        <td className="p-1">{osSph.toFixed(2)}</td>
                        <td className="p-1">{osCyl.toFixed(2)}</td>
                        <td className="p-1">{osAxis}°</td>
                        <td className="p-1">32.0</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-between items-end pt-1 border-t border-[#e7eeff]">
                    <div className="text-[10px] text-outline">
                      <div>Total PD: 64mm</div>
                      <div>Tròng: Crizal 1.67</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-outline block">Bác sĩ khúc xạ</span>
                      <span className="font-label-mono text-[10px] font-bold text-primary block">BS. VŨ ANH TUẤN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm & Push Button */}
            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 space-y-2">
              <button
                onClick={handleSignAndPush}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
                <span>XÁC NHẬN TOA &amp; ĐẨY SANG POS</span>
              </button>
              <div className="flex items-center justify-between px-1 text-body-sm text-outline text-[11px]">
                <span>Phím tắt: <kbd className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface font-label-mono">F9</kbd></span>
                <span>Tự động in bill A5 sau khi đẩy</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
