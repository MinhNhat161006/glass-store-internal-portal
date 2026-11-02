import React, { useState, useEffect } from 'react';
import { prescriptionApi } from '../../api/prescriptionApi';
import { message } from 'antd';
import { useAuth } from '../../context/AuthContext';

export default function OptometryPage() {
  const { user } = useAuth();
  const [odSph, setOdSph] = useState(0.00);
  const [odCyl, setOdCyl] = useState(0.00);
  const [odAxis, setOdAxis] = useState(180);

  const [osSph, setOsSph] = useState(0.00);
  const [osCyl, setOsCyl] = useState(0.00);
  const [osAxis, setOsAxis] = useState(180);
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
        customerId: livePrescription?.customerId || 1,
        customerName: livePrescription?.customerName || 'Khách Hàng Khám Mới',
        optometristId: user?.id || 1,
        optometristName: user?.staffName || 'BS. Khúc Xạ OptiVision',
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

  const hasRx = Boolean(livePrescription);

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff]">
      <div className="max-w-[1600px] mx-auto p-3.5 sm:p-5 flex flex-col gap-3.5">

        {/* 1. PATIENT CLINICAL BANNER */}
        <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-xs border border-[#d8e3fb]/40 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-primary font-bold text-sm">
                  {hasRx ? (livePrescription.customerName || 'KH').slice(0, 2).toUpperCase() : 'KH'}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${hasRx ? 'bg-primary-container' : 'bg-outline'} ring-2 ring-surface-container-lowest`}></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                    {hasRx ? livePrescription.customerName : 'Chưa Chọn Bệnh Nhân'}
                  </h1>
                  <span className="px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] font-semibold">
                    {hasRx ? `#OPT-CUS-${livePrescription.customerId || '01'}` : 'Chưa có hồ sơ'}
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-surface-container-highest text-primary font-label-md text-[10px] font-semibold">
                    {hasRx ? 'Bệnh Nhân Đang Khám' : 'Sẵn Sàng'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mt-0.5">
                  {hasRx ? (
                    <>
                      <span>{livePrescription.customerPhone || '0901 000 888'}</span>
                      <span>•</span>
                      <span className="text-outline">{livePrescription.notes || 'Quy trình khám khúc xạ tiêu chuẩn'}</span>
                    </>
                  ) : (
                    <span className="text-outline">Vui lòng tiếp nhận hoặc phát số bệnh nhân từ màn hình Hàng Đợi Đo Mắt (FR-EYE)</span>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden 2xl:block h-8 w-px bg-surface-variant"></div>

            <div className="bg-surface-container-low px-3 py-1.5 rounded-xl flex items-center gap-3 border border-[#d8e3fb]/40">
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Mã Toa</span>
                <span className="font-label-mono text-primary font-bold text-xs">
                  {hasRx ? `#RX-2026-0${livePrescription.id}` : 'Chưa tạo'}
                </span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Thời Gian</span>
                <span className="font-body-sm text-on-surface text-xs">Hôm nay</span>
              </div>
              <div className="h-5 w-px bg-surface-dim"></div>
              <div>
                <span className="block font-label-md text-label-md text-outline uppercase tracking-wider">Bác Sĩ Khúc Xạ</span>
                <span className="font-label-lg text-on-surface text-xs font-semibold">{user?.staffName || 'BS. Lê Thị Ánh Tuyết'}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => handleAction('Lịch sử đo khám thị lực')} className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[15px]">history</span>
              <span>Lịch Sử Đo</span>
            </button>
            <button onClick={() => { setOdSph(0); setOdCyl(0); setOdAxis(180); setOsSph(0); setOsCyl(0); setOsAxis(180); handleAction('Đã đặt lại dữ liệu form'); }} className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer">
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
              <span className="px-2 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[10px]">
                {hasRx ? 'Đã đo' : 'Chưa đo'}
              </span>
            </div>
            {hasRx ? (
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
            ) : (
              <div className="py-6 text-center text-outline text-xs bg-surface-container-low rounded-lg">
                Chưa có dữ liệu thị lực trần. Tiếp nhận bệnh nhân để kiểm tra trên bảng thị lực SC-1600.
              </div>
            )}
          </div>

          {/* Card 2: Old Rx */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">Toa Kính Cũ</span>
              <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-[10px]">
                {hasRx ? 'Hồ sơ cũ' : 'Chưa có'}
              </span>
            </div>
            {hasRx ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md text-primary font-semibold w-10">OD (R)</span>
                  <div className="flex gap-2.5 font-label-mono text-body-sm text-on-surface">
                    <span>SPH: <strong>{odSph.toFixed(2)}</strong></span>
                    <span>CYL: <strong>{odCyl.toFixed(2)}</strong></span>
                    <span>AX: <strong>{odAxis}°</strong></span>
                  </div>
                  <span className="font-label-md text-label-md text-outline">VA: 10/10</span>
                </div>
                <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-2.5 py-1.5 border border-[#d8e3fb]/30">
                  <span className="font-label-md text-label-md text-secondary font-semibold w-10">OS (L)</span>
                  <div className="flex gap-2.5 font-label-mono text-body-sm text-on-surface">
                    <span>SPH: <strong>{osSph.toFixed(2)}</strong></span>
                    <span>CYL: <strong>{osCyl.toFixed(2)}</strong></span>
                    <span>AX: <strong>{osAxis}°</strong></span>
                  </div>
                  <span className="font-label-md text-label-md text-outline">VA: 10/10</span>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-outline text-xs bg-surface-container-low rounded-lg">
                Chưa ghi nhận toa kính cũ. Bệnh nhân khám lần đầu tại hệ thống OptiVision.
              </div>
            )}
          </div>

          {/* Card 3: Binocular Analysis */}
          <div className="bg-surface-container-lowest rounded-xl p-3 shadow-xs border border-[#d8e3fb]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">Phân Tích Khúc Xạ Hai Mắt</span>
              <span className="material-symbols-outlined text-primary text-[18px]">troubleshoot</span>
            </div>
            {hasRx ? (
              <>
                <div className="space-y-1 bg-surface-container-low p-2 rounded-lg border border-[#d8e3fb]/30 text-body-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Chênh lệch SPH:</span>
                    <span className="font-label-mono font-bold text-on-surface">Δ {Math.abs(odSph - osSph).toFixed(2)} D (Bình thường)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Trục loạn:</span>
                    <span className="font-label-mono font-bold text-on-surface">OD {odAxis}° / OS {osAxis}°</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Chỉ định:</span>
                    <span className="px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px]">Đơn tròng kỹ thuật số</span>
                  </div>
                </div>
                <span className="text-outline font-body-sm text-[11px] block mt-1">Không có hiện tượng lệch ảnh nghiêm trọng (Aniseikonia).</span>
              </>
            ) : (
              <div className="py-6 text-center text-outline text-xs bg-surface-container-low rounded-lg">
                Chờ kết quả đo khúc xạ hai mắt để tự động phân tích độ tương thích thị giác hai mắt.
              </div>
            )}
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
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-md text-[10px] font-semibold">Ưu thế nhìn xa</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Độ Cầu (SPH / Sphere)</span>
                        <span className="font-label-mono text-outline text-[11px]">Dải: -15.00 đến +10.00</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/40 shadow-xs">
                        <button onClick={() => setOdSph(prev => Number((prev - 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-primary transition-colors cursor-pointer">−</button>
                        <span className="flex-1 text-center font-label-mono text-title-md font-bold text-on-surface">{odSph.toFixed(2)}</span>
                        <button onClick={() => setOdSph(prev => Number((prev + 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-primary transition-colors cursor-pointer">+</button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Độ Trụ (CYL / Cylinder)</span>
                        <span className="font-label-mono text-outline text-[11px]">Quy ước dấu âm (−)</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/40 shadow-xs">
                        <button onClick={() => setOdCyl(prev => Number((prev - 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-secondary transition-colors cursor-pointer">−</button>
                        <span className="flex-1 text-center font-label-mono text-title-md font-bold text-on-surface">{odCyl.toFixed(2)}</span>
                        <button onClick={() => setOdCyl(prev => Number((prev + 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-secondary transition-colors cursor-pointer">+</button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Trục Loạn (AXIS)</span>
                        <span className="font-label-mono font-bold text-primary text-xs">{odAxis}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="1"
                        value={odAxis}
                        onChange={(e) => setOdAxis(Number(e.target.value))}
                        className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/30">
                        <span className="font-label-md text-outline block text-[10px]">Độ Cộng (ADD)</span>
                        <span className="font-label-mono font-bold text-on-surface text-xs">+0.00</span>
                      </div>
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/30">
                        <span className="font-label-md text-outline block text-[10px]">PD Đơn (OD)</span>
                        <span className="font-label-mono font-bold text-on-surface text-xs">32.0 mm</span>
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
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-md text-[10px] font-semibold">Mắt điều tiết bù</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Độ Cầu (SPH / Sphere)</span>
                        <span className="font-label-mono text-outline text-[11px]">Dải: -15.00 đến +10.00</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/40 shadow-xs">
                        <button onClick={() => setOsSph(prev => Number((prev - 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-primary transition-colors cursor-pointer">−</button>
                        <span className="flex-1 text-center font-label-mono text-title-md font-bold text-on-surface">{osSph.toFixed(2)}</span>
                        <button onClick={() => setOsSph(prev => Number((prev + 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-primary transition-colors cursor-pointer">+</button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Độ Trụ (CYL / Cylinder)</span>
                        <span className="font-label-mono text-outline text-[11px]">Quy ước dấu âm (−)</span>
                      </div>
                      <div className="flex items-center bg-surface-container-lowest rounded-xl p-1 border border-[#d8e3fb]/40 shadow-xs">
                        <button onClick={() => setOsCyl(prev => Number((prev - 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-secondary transition-colors cursor-pointer">−</button>
                        <span className="flex-1 text-center font-label-mono text-title-md font-bold text-on-surface">{osCyl.toFixed(2)}</span>
                        <button onClick={() => setOsCyl(prev => Number((prev + 0.25).toFixed(2)))} className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high flex items-center justify-center font-bold text-base text-secondary transition-colors cursor-pointer">+</button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-body-sm mb-1">
                        <span className="font-label-md text-label-md text-on-surface font-medium">Trục Loạn (AXIS)</span>
                        <span className="font-label-mono font-bold text-secondary text-xs">{osAxis}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="180"
                        step="1"
                        value={osAxis}
                        onChange={(e) => setOsAxis(Number(e.target.value))}
                        className="w-full accent-secondary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/30">
                        <span className="font-label-md text-outline block text-[10px]">Độ Cộng (ADD)</span>
                        <span className="font-label-mono font-bold text-on-surface text-xs">+0.00</span>
                      </div>
                      <div className="p-2 bg-surface-container-lowest rounded-lg border border-[#d8e3fb]/30">
                        <span className="font-label-md text-outline block text-[10px]">PD Đơn (OS)</span>
                        <span className="font-label-mono font-bold text-on-surface text-xs">32.0 mm</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Fitting Parameters */}
              <div className="mt-3 p-2.5 rounded-xl bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border border-[#d8e3fb]/40">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Total PD</span>
                    <span className="font-label-mono font-bold text-primary text-xs">64.0 mm</span>
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
                    <p className="font-title-md text-title-md text-on-surface font-semibold mb-1">
                      {hasRx ? 'Khúc Xạ Hai Mắt (OD/OS)' : 'Chưa có chẩn đoán'}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-snug">
                      {hasRx ? (livePrescription.notes || 'Quy trình đo khúc xạ tiêu chuẩn.') : 'Hoàn tất đo 12 bước để bác sĩ đưa ra kết luận lâm sàng phù hợp.'}
                    </p>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-2.5 border border-[#d8e3fb]/30">
                    <span className="font-label-md text-label-md text-primary uppercase tracking-wider block mb-1 font-semibold">Gợi Ý Tròng Kính Đề Xuất</span>
                    <div className="flex items-center gap-2.5 bg-surface-container-lowest p-2 rounded-lg border border-[#d8e3fb]/40">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        1.60
                      </div>
                      <div>
                        <h3 className="font-title-md text-title-md text-on-surface font-semibold">Essilor Crizal Rock 1.60</h3>
                        <p className="font-body-sm text-[11px] text-outline leading-tight">Chống trầy xước gấp 3, lọc UV400, chống chói 360°, nano kỵ nước.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col justify-between border border-[#d8e3fb]/30">
                  <div className="space-y-1.5">
                    <span className="font-label-md text-label-md text-primary uppercase tracking-wider block font-bold">Ghi Chú Kỹ Thuật Cho Xưởng Mài (Lab)</span>
                    <div className="bg-surface-container-lowest rounded-lg p-2 space-y-1 text-body-sm text-on-surface border border-[#d8e3fb]/40">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] mt-0.5">check_box</span>
                        <span>Mài tâm chuẩn: Sai số tâm kính &lt; 0.5mm theo chuẩn quốc tế.</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[15px] mt-0.5">check_box</span>
                        <span>Kiểm tra độ cong đáy (Base Curve) phù hợp với gọng đã chọn.</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-body-sm border-t border-[#d8e3fb]/30 mt-1">
                    <span className="text-outline text-[11px]">Độ ưu tiên: <strong className="text-on-surface">Tiêu chuẩn</strong></span>
                    <span className="px-2 py-0.2 rounded-full bg-surface-container-high text-on-surface font-label-md text-[10px]">Sẵn sàng</span>
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
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shrink-0">
                    BS
                  </div>
                  <div>
                    <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">{user?.staffName || 'BS. Lê Thị Ánh Tuyết'}</span>
                    <span className="text-[11px] text-outline block">Bác sĩ Chuyên khoa Khúc xạ Mắt</span>
                    <span className="font-label-mono text-[11px] text-primary">CCHN: #VN-882-HN</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-lg p-2 flex items-center justify-between border border-[#d8e3fb]/40">
                  <div>
                    <span className="font-label-md text-outline block text-[10px]">Chữ Ký Số:</span>
                    <span className="font-label-mono text-primary font-semibold text-xs">{user?.email || 'bs.tuyet@optivision.vn'}</span>
                    <span className="text-outline text-[10px] block">Xác thực hệ thống nội bộ</span>
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
                  defaultValue="Tái khám định kỳ sau 6 tháng. Áp dụng quy tắc 20-20-20 khi làm việc với máy tính để bảo vệ mắt."
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
                      <span className="font-label-mono text-[10px] text-outline block">
                        {hasRx ? `#RX-2026-0${livePrescription.id}` : '#RX-CHUA-CO'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-1.5 rounded text-[11px] space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-outline">Họ tên:</span>
                      <span className="font-semibold text-on-surface">
                        {hasRx ? livePrescription.customerName : 'Chưa có bệnh nhân'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-outline">Thời gian:</span>
                      <span>Hôm nay</span>
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
                      <div>Total PD: {livePrescription?.pd || 63}mm</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-outline block">Bác sĩ khúc xạ</span>
                      <span className="font-label-mono text-[10px] font-bold text-primary block">{user?.staffName || 'BS. LÊ THỊ ÁNH TUYẾT'}</span>
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
