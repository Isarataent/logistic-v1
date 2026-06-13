import { CheckCircle2, AlertTriangle, Wrench, FileText, Shield, Truck, BadgeCheck } from "lucide-react";
import { Vehicle } from "./types";

interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedId: string;
  onSelect: (vehicleId: string, isPartner: boolean) => void;
}

function ReadinessIndicator({ label, date, isWarning }: { label: string; date: string; isWarning: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      {isWarning ? (
        <AlertTriangle size={12} className="text-amber-500" />
      ) : (
        <CheckCircle2 size={12} className="text-emerald-500" />
      )}
      <span className={isWarning ? "text-amber-700" : "text-slate-500"}>
        {label}: {date}
      </span>
    </div>
  );
}

export default function VehicleSelector({ vehicles, selectedId, onSelect }: VehicleSelectorProps) {
  const today = new Date("2026-06-13");
  const warningDays = 30;

  const isDateWarning = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= warningDays;
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-700">เลือกรถ</label>
      <div className="space-y-2">
        {vehicles.map((vehicle) => {
          const isSelected = selectedId === vehicle.id;
          const isAvailable = vehicle.status === "available";
          const isReady = !isDateWarning(vehicle.maintenanceDue) && !isDateWarning(vehicle.taxExpiry) && !isDateWarning(vehicle.insuranceExpiry);
          const canSelect = isAvailable && isReady;

          return (
            <button
              key={vehicle.id}
              onClick={() => canSelect && onSelect(vehicle.id, vehicle.isPartner)}
              disabled={!canSelect}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                  : canSelect
                  ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  : "border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                    <Truck size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{vehicle.id}</p>
                    <p className="text-xs text-slate-500">{vehicle.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {vehicle.isPartner && (
                    <span className="px-2 py-0.5 bg-violet-50 text-violet-700 text-[10px] font-medium rounded-full border border-violet-200">
                      รถร่วม
                    </span>
                  )}
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                    isAvailable ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}>
                    {isAvailable ? "ว่าง" : "ไม่ว่าง"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <ReadinessIndicator
                  label="เช็คระยะ"
                  date={vehicle.maintenanceDue}
                  isWarning={isDateWarning(vehicle.maintenanceDue)}
                />
                <ReadinessIndicator
                  label="พรบ"
                  date={vehicle.taxExpiry}
                  isWarning={isDateWarning(vehicle.taxExpiry)}
                />
                <ReadinessIndicator
                  label="ประกัน"
                  date={vehicle.insuranceExpiry}
                  isWarning={isDateWarning(vehicle.insuranceExpiry)}
                />
              </div>

              {!canSelect && !isAvailable && (
                <p className="text-xs text-rose-600 mt-2">รถนี้ถูกใช้งานในเส้นทางอื่น</p>
              )}
              {!canSelect && isAvailable && !isReady && (
                <p className="text-xs text-amber-600 mt-2">รถไม่พร้อมใช้งาน - ตรวจสอบสถานะ</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
