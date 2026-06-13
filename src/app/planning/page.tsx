"use client";

import { useState } from "react";
import {
  MapPin,
  Route,
  Clock,
  Fuel,
  Navigation,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Filter,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RouteWizardModal from "@/components/RouteWizard/RouteWizardModal";
import { FormData, Brand, Customer, Driver, Vehicle } from "@/components/RouteWizard/types";

// ─── Mock Data ─────────────────────────────────────────────

const brands: Brand[] = [
  { id: "shopee", name: "Shopee", color: "orange", penaltyRules: "ส่งช้า ฿500/ชม" },
  { id: "makro", name: "Makro", color: "blue", penaltyRules: "สแกนผิด ฿2,000" },
  { id: "express", name: "Express", color: "red", penaltyRules: "สูญหาย ฿5,000" },
];

const customers: Customer[] = [
  { id: "C-001", name: "คลังสินค้า บางนา", address: "123 ถนนบางนา-ตราด", lat: "13.6434", lng: "100.5957" },
  { id: "C-002", name: "ร้านค้า ลาดกระบัง", address: "456 ถนนฉลองกรุง", lat: "13.7234", lng: "100.7890" },
  { id: "C-003", name: "ศูนย์กระจายสินค้า รังสิต", address: "789 ถนนพหลโยธิน", lat: "13.9890", lng: "100.6177" },
  { id: "C-004", name: "ร้านค้า ปิ่นเกล้า", address: "321 ถนนบรมราชชนนี", lat: "13.7761", lng: "100.4762" },
];

const drivers: Driver[] = [
  { id: "DRV-001", name: "สมชาย ใจดี", licenseExpiry: "2026-05-28", status: "active" },
  { id: "DRV-002", name: "มานะ รักษ์ดี", licenseExpiry: "2026-08-15", status: "active" },
  { id: "DRV-003", name: "วิชัย ขับดี", licenseExpiry: "2026-12-20", status: "active" },
];

const vehicles: Vehicle[] = [
  { id: "VH-089", type: "4-ล้อ", status: "available", isPartner: false,
    maintenanceDue: "2026-07-15", taxExpiry: "2026-08-01", insuranceExpiry: "2026-10-15" },
  { id: "VH-102", type: "6-ล้อ", status: "in-use", isPartner: false,
    maintenanceDue: "2026-05-30", taxExpiry: "2026-07-15", insuranceExpiry: "2026-09-20" },
  { id: "VH-205", type: "10-ล้อ", status: "available", isPartner: true,
    maintenanceDue: "2026-05-20", taxExpiry: "2026-05-25", insuranceExpiry: "2026-07-30" },
  { id: "VH-078", type: "4-ล้อ", status: "available", isPartner: false,
    maintenanceDue: "2026-08-10", taxExpiry: "2026-09-01", insuranceExpiry: "2026-11-15" },
];

const initialRoutes = [
  { id: "RT-001", name: "เส้นทาง บางนา - ลาดกระบัง", driver: "สมชาย ใจดี", vehicle: "VH-102", brand: "shopee", stops: 8, distance: "45 km", eta: "2h 15m", status: "active", fuel: "12L", isPartner: false },
  { id: "RT-002", name: "เส้นทาง รามอินทรา - วิภาวดี", driver: "วิชัย ขับดี", vehicle: "VH-156", brand: "makro", stops: 5, distance: "32 km", eta: "1h 30m", status: "active", fuel: "8L", isPartner: false },
  { id: "RT-003", name: "เส้นทาง บางใหญ่ - ปิ่นเกล้า", driver: "มานะ รักษ์ดี", vehicle: "VH-089", brand: "express", stops: 6, distance: "28 km", eta: "1h 45m", status: "planned", fuel: "7L", isPartner: false },
  { id: "RT-004", name: "เส้นทาง ศรีนครินทร์ - สุขุมวิท", driver: "ประทีป สว่าง", vehicle: "VH-145", brand: "shopee", stops: 10, distance: "55 km", eta: "3h 00m", status: "completed", fuel: "15L", isPartner: false },
  { id: "RT-005", name: "เส้นทาง รังสิต - ดอนเมือง", driver: "สุดา รอดตาย", vehicle: "VH-078", brand: "makro", stops: 4, distance: "22 km", eta: "1h 10m", status: "planned", fuel: "6L", isPartner: false },
];

// ─── Components ────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-amber-50 text-amber-700 border-amber-200",
    planned: "bg-sky-50 text-sky-700 border-sky-200",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const labels: Record<string, string> = {
    active: "กำลังวิ่ง",
    planned: "วางแผนแล้ว",
    completed: "เสร็จสิ้น",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.planned}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-amber-500 animate-pulse" : status === "completed" ? "bg-emerald-500" : "bg-sky-500"}`} />
      {labels[status] || status}
    </span>
  );
}

function BrandBadge({ brandId }: { brandId: string }) {
  const brand = brands.find((b) => b.id === brandId);
  if (!brand) return null;

  const colorMap: Record<string, string> = {
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorMap[brand.color] || colorMap.orange}`}>
      {brand.name}
    </span>
  );
}

export default function PlanningPage() {
  const [showWizard, setShowWizard] = useState(false);
  const [routes, setRoutes] = useState(initialRoutes);
  const [brandFilter, setBrandFilter] = useState("");

  const handleSaveRoute = (data: FormData) => {
    const brand = brands.find((b) => b.id === data.brandId);
    const driver = drivers.find((d) => d.id === data.driverId);
    const vehicle = vehicles.find((v) => v.id === data.vehicleId);

    const newRoute = {
      id: `RT-${String(routes.length + 1).padStart(3, "0")}`,
      name: data.name,
      driver: driver?.name || "",
      vehicle: vehicle?.id || "",
      brand: data.brandId,
      stops: data.stops.length,
      distance: `${data.stops.length * 12} km`,
      eta: `${Math.ceil(data.stops.length * 45 / 60)}h ${(data.stops.length * 45) % 60}m`,
      status: "planned",
      fuel: `${data.stops.length * 3}L`,
      isPartner: data.isPartnerVehicle,
    };

    setRoutes([...routes, newRoute]);
  };

  const filteredRoutes = brandFilter
    ? routes.filter((r) => r.brand === brandFilter)
    : routes;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/planning" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Route Planning</h1>
              <p className="text-sm text-slate-500 mt-1">วางแผนและจัดการเส้นทางการขนส่ง</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                สร้างเส้นทางใหม่
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Route size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">กำลังวิ่ง</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{routes.filter((r) => r.status === "active").length}</p>
              <p className="text-xs text-slate-400">เส้นทาง</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg">
                  <Calendar size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">วางแผนแล้ว</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{routes.filter((r) => r.status === "planned").length}</p>
              <p className="text-xs text-slate-400">เส้นทาง</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">เสร็จสิ้น</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{routes.filter((r) => r.status === "completed").length}</p>
              <p className="text-xs text-slate-400">เส้นทาง</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-violet-50 text-violet-600 rounded-lg">
                  <Fuel size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">ประหยัดน้ำมัน</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">฿12,400</p>
              <p className="text-xs text-slate-400">เดือนนี้</p>
            </div>
          </div>

          {/* Routes Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">รายการเส้นทาง</h2>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-slate-400" />
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">ทุกแบรนด์</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">ทั้งหมด</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">กำลังวิ่ง</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">วางแผน</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">เส้นทาง</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">แบรนด์</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">คนขับ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รถ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ระยะทาง</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">จุดแวะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ETA</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">น้ำมัน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <MapPin size={14} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{route.id}</p>
                            <p className="text-xs text-slate-400">{route.name}</p>
                            {route.isPartner && (
                              <span className="inline-flex items-center px-1.5 py-0.5 bg-violet-50 text-violet-700 text-[10px] font-medium rounded border border-violet-200 mt-0.5">
                                รถร่วม
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><BrandBadge brandId={route.brand} /></td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.driver}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.vehicle}</td>
                      <td className="px-4 py-3"><StatusBadge status={route.status} /></td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.distance}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.stops} จุด</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.eta}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{route.fuel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Route Wizard Modal */}
      <RouteWizardModal
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
        onSave={handleSaveRoute}
        brands={brands}
        customers={customers}
        drivers={drivers}
        vehicles={vehicles}
      />
    </div>
  );
}
