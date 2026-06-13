import { AlertTriangle, FileText, Clock, CheckCircle2, XCircle, ChevronRight, Filter, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const penalties = [
  { id: "PEN-001", jobId: "JOB-48291", customer: "ลูกค้า A", driver: "สมชาย ใจดี", vehicle: "VH-102", reason: "ส่งสินค้าช้า", amount: "฿2,500", date: "2026-05-20", status: "pending", evidence: "มี" },
  { id: "PEN-002", jobId: "JOB-48295", customer: "ลูกค้า B", driver: "วิชัย ขับดี", vehicle: "VH-156", reason: "สแกนยอดผิด", amount: "฿1,800", date: "2026-05-18", status: "disputed", evidence: "รอ" },
  { id: "PEN-003", jobId: "JOB-48301", customer: "ลูกค้า C", driver: "มานะ รักษ์ดี", vehicle: "VH-089", reason: "สินค้าเสียหาย", amount: "฿5,000", date: "2026-05-15", status: "confirmed", evidence: "มี" },
  { id: "PEN-004", jobId: "JOB-48310", customer: "ลูกค้า D", driver: "ประทีป สว่าง", vehicle: "VH-145", reason: "ส่งผิดพื้นที่", amount: "฿3,200", date: "2026-05-12", status: "resolved", evidence: "มี" },
  { id: "PEN-005", jobId: "JOB-48315", customer: "ลูกค้า A", driver: "สุดา รอดตาย", vehicle: "VH-078", reason: "ส่งช้า", amount: "฿1,500", date: "2026-05-10", status: "pending", evidence: "ไม่มี" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    disputed: "bg-sky-50 text-sky-700 border-sky-200",
    confirmed: "bg-rose-50 text-rose-700 border-rose-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const labels: Record<string, string> = {
    pending: "รอตรวจสอบ",
    disputed: "โต้แย้ง",
    confirmed: "ยืนยัน",
    resolved: "เคลียร์แล้ว",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "pending" ? "bg-amber-500" : status === "disputed" ? "bg-sky-500" : status === "confirmed" ? "bg-rose-500" : "bg-emerald-500"}`} />
      {labels[status] || status}
    </span>
  );
}

export default function PenaltiesPage() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/penalties" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Penalty Disputes</h1>
              <p className="text-sm text-slate-500 mt-1">จัดการค่าปรับและการโต้แย้งจากลูกค้า</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                + แจ้งค่าปรับใหม่
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">รอตรวจสอบ</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-xs text-slate-400">รายการ</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">โต้แย้ง</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">1</p>
              <p className="text-xs text-slate-400">รายการ</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                  <XCircle size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">ยืนยัน</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">1</p>
              <p className="text-xs text-slate-400">รายการ</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">เคลียร์แล้ว</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">1</p>
              <p className="text-xs text-slate-400">รายการ</p>
            </div>
          </div>

          {/* Penalties Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">รายการค่าปรับ</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">ทั้งหมด</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">รอตรวจสอบ</button>
                <button className="px-3 py-1.5 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-medium">โต้แย้ง</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รหัส</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">งาน</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ลูกค้า</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">คนขับ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รถ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">เหตุผล</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">จำนวน</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">วันที่</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">หลักฐาน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {penalties.map((penalty) => (
                    <tr key={penalty.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">{penalty.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.jobId}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.customer}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.driver}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.vehicle}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.reason}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-rose-600">{penalty.amount}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{penalty.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={penalty.status} /></td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${penalty.evidence === "มี" ? "text-emerald-600" : "text-amber-600"}`}>
                          {penalty.evidence}
                        </span>
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
