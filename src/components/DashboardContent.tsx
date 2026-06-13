import { Truck, MapPin, Navigation, Users, Clock, CheckCircle2, AlertTriangle, Fuel, Wrench, FileWarning, TrendingUp, TrendingDown, ArrowRight, Phone, Mail, Route } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const fleetData = [
  { id: "VH-102", driver: "สมชาย ใจดี", status: "in-transit", location: "ถนนวิภาวดี", progress: 65, eta: "14:30", type: "6-ล้อ" },
  { id: "VH-089", driver: "มานะ รักษ์ดี", status: "available", location: "คลังสินค้า บางนา", progress: 0, eta: "-", type: "4-ล้อ" },
  { id: "VH-205", driver: "ประเสริฐ เก่งกาจ", status: "maintenance", location: "อู่ซ่อม รามอินทรา", progress: 0, eta: "พรุ่งนี้", type: "10-ล้อ" },
  { id: "VH-156", driver: "วิชัย ขับดี", status: "in-transit", location: "ทางด่วนศรีรัช", progress: 40, eta: "15:45", type: "6-ล้อ" },
  { id: "VH-078", driver: "สุดา รอดตาย", status: "available", location: "คลังสินค้า บางนา", progress: 0, eta: "-", type: "4-ล้อ" },
  { id: "VH-311", driver: "เฉลิมชัย กล้าหาญ", status: "offline", location: "ไม่ทราบตำแหน่ง", progress: 0, eta: "-", type: "6-ล้อ" },
];

const alerts = [
  { id: 1, type: "license", severity: "critical", message: "ใบขับขี่ คุณสมชาย หมดอายุใน 3 วัน", action: "แจ้งเตือน", icon: FileWarning },
  { id: 2, type: "maintenance", severity: "warning", message: "รถ VH-102 ครบ 10,000 กม. ต้องเช็คระยะ", action: "นัดหมาย", icon: Wrench },
  { id: 3, type: "penalty", severity: "critical", message: "ลูกค้า A แจ้งค่าปรับส่งช้า งาน #48291", action: "ตรวจสอบ", icon: AlertTriangle },
  { id: 4, type: "insurance", severity: "warning", message: "พรบ. รถ VH-205 หมดอายุใน 7 วัน", action: "ต่อพรบ.", icon: Clock },
  { id: 5, type: "fuel", severity: "info", message: "ค่าน้ำมันเดือนนี้สูงกว่าเป้า 12%", action: "วิเคราะห์", icon: Fuel },
];

function KPICard({ title, value, subtitle, trend, trendUp, icon: Icon, color }: any) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    sky: "bg-sky-50 text-sky-600",
    violet: "bg-violet-50 text-violet-600",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${colorMap[color] || colorMap.emerald}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-rose-600"}`}>
            {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm font-medium text-slate-600 mt-0.5">{title}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}

export default function DashboardContent() {
  return (
    <div className="p-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="ยานพาหนะพร้อมใช้" value="312" subtitle="จาก 412 คัน" trend="+4%" trendUp={true} icon={Truck} color="emerald" />
        <KPICard title="งานวันนี้" value="186" subtitle="เสร็จแล้ว 142" trend="92%" trendUp={true} icon={CheckCircle2} color="sky" />
        <KPICard title="แจ้งเตือนสำคัญ" value="5" subtitle="ใบขับขี่ 2, ซ่อม 2, พรบ. 1" trend="-1" trendUp={false} icon={AlertTriangle} color="rose" />
        <KPICard title="ประหยัดน้ำมัน" value="฿24,500" subtitle="เทียบกับเดือนที่แล้ว" trend="-12%" trendUp={true} icon={Fuel} color="violet" />
      </div>

      {/* Main Body */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Live Fleet */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Live Fleet</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">ทั้งหมด</button>
              <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">กำลังวิ่ง</button>
              <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">ว่าง</button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
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
            </div>

            {/* Vehicle List */}
            <div className="divide-y divide-slate-100">
              {fleetData.map((vehicle) => (
                <div key={vehicle.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck size={18} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">{vehicle.id}</span>
                      <span className="text-xs text-slate-400">{vehicle.type}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-slate-600 flex items-center gap-1">
                        <Users size={12} />
                        {vehicle.driver}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Navigation size={12} />
                        {vehicle.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {vehicle.status === "in-transit" && (
                      <div className="w-24">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Progress</span>
                          <span>{vehicle.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${vehicle.progress}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="text-right">
                      <StatusBadge status={vehicle.status} />
                      {vehicle.eta !== "-" && <p className="text-xs text-slate-400 mt-1">ETA {vehicle.eta}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert Center */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Actionable Alerts</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-rose-50 to-amber-50">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-600" />
                <span className="text-sm font-semibold text-rose-800">5 แจ้งเตือนที่ต้องดำเนินการ</span>
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      alert.severity === "critical" ? "bg-rose-50 text-rose-600" :
                      alert.severity === "warning" ? "bg-amber-50 text-amber-600" :
                      "bg-sky-50 text-sky-600"
                    }`}>
                      <alert.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 leading-snug">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                          {alert.action}
                        </button>
                        <button className="px-3 py-1.5 text-slate-500 text-xs font-medium hover:bg-slate-100 rounded-lg transition-colors">
                          เลื่อน
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100">
              <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                ดูทั้งหมด
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                <Route size={16} />
                วางแผนเส้นทาง
              </button>
              <button className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                <Phone size={16} />
                ติดต่อคนขับ
              </button>
              <button className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                <Mail size={16} />
                ส่งรายงาน
              </button>
              <button className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg text-sm font-medium text-slate-600 transition-colors">
                <Wrench size={16} />
                นัดซ่อม
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
