import { Truck, MapPin, Navigation, Clock, Fuel, CheckCircle2, AlertTriangle, Users, MoreHorizontal, ArrowRight, Phone, Mail, Route, Wrench } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const fleetData = [
  { id: "VH-102", driver: "สมชาย ใจดี", status: "in-transit", location: "ถนนวิภาวดี", progress: 65, eta: "14:30", type: "6-ล้อ", speed: "45 km/h" },
  { id: "VH-089", driver: "มานะ รักษ์ดี", status: "available", location: "คลังสินค้า บางนา", progress: 0, eta: "-", type: "4-ล้อ", speed: "0 km/h" },
  { id: "VH-205", driver: "ประเสริฐ เก่งกาจ", status: "maintenance", location: "อู่ซ่อม รามอินทรา", progress: 0, eta: "พรุ่งนี้", type: "10-ล้อ", speed: "0 km/h" },
  { id: "VH-156", driver: "วิชัย ขับดี", status: "in-transit", location: "ทางด่วนศรีรัช", progress: 40, eta: "15:45", type: "6-ล้อ", speed: "62 km/h" },
  { id: "VH-078", driver: "สุดา รอดตาย", status: "available", location: "คลังสินค้า บางนา", progress: 0, eta: "-", type: "4-ล้อ", speed: "0 km/h" },
  { id: "VH-311", driver: "เฉลิมชัย กล้าหาญ", status: "offline", location: "ไม่ทราบตำแหน่ง", progress: 0, eta: "-", type: "6-ล้อ", speed: "-" },
  { id: "VH-145", driver: "ประทีป สว่าง", status: "in-transit", location: "ถนนบางนา-ตราด", progress: 78, eta: "13:20", type: "10-ล้อ", speed: "55 km/h" },
  { id: "VH-267", driver: "สมหญิง รักงาน", status: "available", location: "คลังสินค้า บางนา", progress: 0, eta: "-", type: "4-ล้อ", speed: "0 km/h" },
];

function KPICard({ title, value, subtitle, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    sky: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
  };
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colorMap[color] || colorMap.emerald}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm font-medium text-slate-600 mt-0.5">{title}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}

export default function FleetPage() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/fleet" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Live Fleet</h1>
              <p className="text-sm text-slate-500 mt-1">ติดตามยานพาหนะทั้งหมดแบบเรียลไทม์</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                รีเฟรชข้อมูล
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                ส่งรายงาน
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard title="กำลังวิ่ง" value="142" subtitle="จาก 412 คัน" icon={Truck} color="amber" />
            <KPICard title="ว่าง" value="58" subtitle="พร้อมรับงาน" icon={CheckCircle2} color="emerald" />
            <KPICard title="ซ่อมบำรุง" value="42" subtitle="อยู่ในอู่" icon={Wrench} color="sky" />
            <KPICard title="ออฟไลน์" value="12" subtitle="ไม่ส่งสัญญาณ" icon={AlertTriangle} color="rose" />
          </div>

          {/* Map + Fleet List */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                      <path d="M0,100 Q100,50 200,100 T400,100" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                      <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M50,0 Q50,100 100,200" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M150,0 Q150,80 200,200" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M250,0 Q250,120 300,200" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                      <path d="M350,0 Q350,60 380,200" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="text-center z-10">
                    <MapPin size={32} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-600">Live Interactive Map</p>
                    <p className="text-xs text-slate-400">Google Maps / Mapbox Integration</p>
                  </div>
                  <div className="absolute top-8 left-16 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute top-12 left-20 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-20 right-24 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute bottom-16 left-32 w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute top-16 right-16 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute bottom-24 right-32 w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute top-24 left-48 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">รถที่ต้องติดตาม</h2>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-amber-50 to-rose-50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">3 รถที่ต้องติดตาม</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {fleetData.filter(v => v.status === "offline" || v.status === "maintenance").map((vehicle) => (
                    <div key={vehicle.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Truck size={18} className="text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 text-sm">{vehicle.id}</span>
                            <StatusBadge status={vehicle.status} />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{vehicle.driver}</p>
                          <p className="text-xs text-slate-400">{vehicle.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Fleet Table */}
          <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">รายการยานพาหนะทั้งหมด</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">ทั้งหมด</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">กำลังวิ่ง</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">ว่าง</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">ซ่อม</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รถ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">คนขับ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ตำแหน่ง</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ความเร็ว</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ETA</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {fleetData.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Truck size={14} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{vehicle.id}</p>
                            <p className="text-xs text-slate-400">{vehicle.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.driver}</td>
                      <td className="px-4 py-3"><StatusBadge status={vehicle.status} /></td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.location}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.speed}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.eta}</td>
                      <td className="px-4 py-3">
                        {vehicle.status === "in-transit" ? (
                          <div className="w-24">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>{vehicle.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${vehicle.progress}%` }} />
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
