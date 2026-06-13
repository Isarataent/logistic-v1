import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Route, Save, Send, Loader2 } from "lucide-react";
import { FormData, Brand, Customer, Driver, Vehicle, Stop } from "./types";
import VehicleSelector from "./VehicleSelector";
import StopList from "./StopList";

interface RouteWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  brands: Brand[];
  customers: Customer[];
  drivers: Driver[];
  vehicles: Vehicle[];
}

export default function RouteWizardModal({
  isOpen,
  onClose,
  onSave,
  brands,
  customers,
  drivers,
  vehicles,
}: RouteWizardModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: `RT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-001`,
    brandId: "",
    date: "",
    driverId: "",
    vehicleId: "",
    isPartnerVehicle: false,
    stops: [],
  });

  const isStep1Valid =
    formData.name &&
    formData.brandId &&
    formData.driverId &&
    formData.vehicleId &&
    formData.date;

  const selectedBrand = brands.find((b) => b.id === formData.brandId);
  const selectedDriver = drivers.find((d) => d.id === formData.driverId);
  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId);

  const updateForm = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      // Mock optimization: reverse stops
      setFormData((prev) => ({
        ...prev,
        stops: [...prev.stops].reverse(),
      }));
      setIsOptimizing(false);
    }, 1500);
  };

  const handleSave = (sendToDriver: boolean) => {
    onSave({ ...formData, name: formData.name });
    setStep(1);
    setFormData({
      name: `RT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-001`,
      brandId: "",
      date: "",
      driverId: "",
      vehicleId: "",
      isPartnerVehicle: false,
      stops: [],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Route size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">สร้างเส้นทางใหม่</h2>
              <p className="text-xs text-slate-500">
                ขั้นตอน {step} จาก 2
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                step === 1
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 1
                    ? "bg-indigo-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                {step > 1 ? "✓" : "1"}
              </span>
              ข้อมูลพื้นฐาน
            </div>
            <ChevronRight size={14} className="text-slate-300" />
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                step === 2
                  ? "bg-indigo-50 text-indigo-700"
                  : "bg-slate-50 text-slate-400"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === 2
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-300 text-white"
                }`}
              >
                2
              </span>
              จัดการจุดแวะ
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Route Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  ชื่อเส้นทาง
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  แบรนด์ / ลูกค้า
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {brands.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => updateForm({ brandId: brand.id })}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        formData.brandId === brand.id
                          ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          brand.color === "orange"
                            ? "bg-orange-500"
                            : brand.color === "blue"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      />
                      {brand.name}
                      <p className="text-[10px] text-slate-400 mt-1">
                        {brand.penaltyRules}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  วันที่และเวลาเริ่มงาน
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => updateForm({ date: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Driver */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  คนขับ
                </label>
                <select
                  value={formData.driverId}
                  onChange={(e) => updateForm({ driverId: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">เลือกคนขับ</option>
                  {drivers.map((driver) => {
                    const licenseWarning =
                      new Date(driver.licenseExpiry) <=
                      new Date("2026-07-13");
                    return (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                        {licenseWarning ? " (ใบขับขี่ใกล้หมด)" : ""}
                      </option>
                    );
                  })}
                </select>
                {selectedDriver &&
                  new Date(selectedDriver.licenseExpiry) <=
                    new Date("2026-07-13") && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                      <span className="text-amber-600 text-sm">⚠️</span>
                      <p className="text-sm text-amber-700">
                        ใบขับขี่หมดอายุ {selectedDriver.licenseExpiry}
                      </p>
                    </div>
                  )}
              </div>

              {/* Vehicle */}
              <VehicleSelector
                vehicles={vehicles}
                selectedId={formData.vehicleId}
                onSelect={(vehicleId, isPartner) =>
                  updateForm({ vehicleId, isPartnerVehicle: isPartner })
                }
              />

              {/* Assignment Conflict */}
              {selectedVehicle && selectedVehicle.status === "in-use" && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <span className="text-rose-600 text-sm">⚠️</span>
                  <p className="text-sm text-rose-700">
                    รถ {selectedVehicle.id} ถูกใช้งานในเส้นทาง RT-001
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <StopList
                stops={formData.stops}
                customers={customers}
                onUpdate={(stops) => updateForm({ stops })}
              />

              {/* Optimization */}
              {formData.stops.length > 1 && (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-medium text-slate-700">
                        จัดลำดับเส้นทาง
                      </h3>
                      <p className="text-xs text-slate-500">
                        ระบบจะคำนวณเส้นทางที่ประหยัดน้ำมันที่สุด
                      </p>
                    </div>
                    <button
                      onClick={handleOptimize}
                      disabled={isOptimizing}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      {isOptimizing ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          กำลังประมวลผล...
                        </>
                      ) : (
                        <>
                          <Route size={16} />
                          จัดลำดับอัตโนมัติ
                        </>
                      )}
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">ระยะทางโดยประมาณ</p>
                      <p className="text-lg font-bold text-slate-900">
                        {formData.stops.length * 12} km
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">เวลาโดยประมาณ</p>
                      <p className="text-lg font-bold text-slate-900">
                        {formData.stops.length * 45} นาที
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">น้ำมันโดยประมาณ</p>
                      <p className="text-lg font-bold text-slate-900">
                        {formData.stops.length * 3}L
                      </p>
                      <p className="text-xs text-emerald-600">
                        ประหยัดกว่าปกติ 15%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              {formData.stops.length > 0 && (
                <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4">
                  <h3 className="text-sm font-semibold text-indigo-900 mb-3">
                    สรุปเส้นทาง
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">ชื่อเส้นทาง</span>
                      <span className="font-medium text-slate-900">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">แบรนด์</span>
                      <span className="font-medium text-slate-900">
                        {selectedBrand?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">คนขับ</span>
                      <span className="font-medium text-slate-900">
                        {selectedDriver?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">รถ</span>
                      <span className="font-medium text-slate-900">
                        {selectedVehicle?.id}
                        {selectedVehicle?.isPartner && (
                          <span className="ml-1 text-xs text-violet-600">
                            (รถร่วม)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">จำนวนจุดแวะ</span>
                      <span className="font-medium text-slate-900">
                        {formData.stops.length} จุด
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {step === 1 ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ถัดไป
                <ChevronRight size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
              >
                <ChevronLeft size={16} />
                กลับ
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSave(false)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <Save size={16} />
                  บันทึก
                </button>
                <button
                  onClick={() => handleSave(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <Send size={16} />
                  บันทึกและส่งให้คนขับ
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
