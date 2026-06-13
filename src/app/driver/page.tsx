"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Camera,
  Phone,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Navigation,
  Package,
  User,
  ClipboardList,
  History,
  Settings,
  QrCode,
  Truck,
  Shield,
  X,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────

const driverData = {
  name: "สมชาย ใจดี",
  id: "DRV-001",
  vehicle: "VH-102",
  plate: "1กข 1234",
  status: "on-duty",
};

const currentJob = {
  id: "JOB-48291",
  type: "drop-off",
  customer: "ลูกค้า A - บริษัท ขนส่งดี",
  address: "123 ถนนวิภาวดีรังสิต, ดินแดง, กรุงเทพฯ",
  contact: "081-234-5678",
  eta: "14:30",
  items: "กล่องสินค้า 15 กล่อง",
  note: "ติดต่อคุณสมศักดิ์ ฝ่ายรับสินค้า",
};

const jobHistory = [
  { id: "JOB-48290", type: "drop-off", customer: "ลูกค้า B", time: "10:15", status: "completed", location: "คลังสินค้า บางนา" },
  { id: "JOB-48289", type: "pick-up", customer: "ลูกค้า C", time: "08:30", status: "completed", location: "โรงงาน ลาดกระบัง" },
  { id: "JOB-48288", type: "drop-off", customer: "ลูกค้า D", time: "เมื่อวาน", status: "completed", location: "ร้านค้า รามอินทรา" },
];

// ─── Components ────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "on-duty": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "off-duty": "bg-slate-100 text-slate-600 border-slate-200",
    "break": "bg-amber-50 text-amber-700 border-amber-200",
  };
  const labels: Record<string, string> = {
    "on-duty": "กำลังปฏิบัติงาน",
    "off-duty": "เลิกงาน",
    "break": "พัก",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles["off-duty"]}`}>
      <span className={`w-2 h-2 rounded-full ${status === "on-duty" ? "bg-emerald-500 animate-pulse" : status === "break" ? "bg-amber-500" : "bg-slate-400"}`} />
      {labels[status] || status}
    </span>
  );
}

export default function DriverApp() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [checkInState, setCheckInState] = useState<"idle" | "capturing" | "confirming" | "done">("idle");
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [issueNote, setIssueNote] = useState("");

  const mockGPS = { lat: "13.7563", lng: "100.5018" };
  const mockTimestamp = new Date().toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCheckIn = () => {
    if (checkInState === "idle") {
      setCheckInState("capturing");
      setTimeout(() => setCheckInState("confirming"), 1500);
    } else if (checkInState === "confirming") {
      setCheckInState("done");
    }
  };

  const resetCheckIn = () => {
    setCheckInState("idle");
  };

  const submitIssue = () => {
    setShowIssueModal(false);
    setIssueType("");
    setIssueNote("");
    alert("ส่งรายงานปัญหาเรียบร้อย");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-full max-w-md h-[800px] bg-white rounded-[2rem] shadow-2xl border-4 border-gray-900 overflow-hidden flex flex-col relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-50" />

        {/* ─── Header ─────────────────────────────────────── */}
        <header className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white pt-8 pb-4 px-5 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">{driverData.name}</p>
                <p className="text-xs opacity-70">{driverData.id}</p>
              </div>
            </div>
            <StatusBadge status={driverData.status} />
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <Truck size={18} className="text-white/80" />
            <div className="flex-1">
              <p className="text-xs opacity-70">ยานพาหนะที่ได้รับมอบหมาย</p>
              <p className="text-sm font-semibold">{driverData.vehicle} · {driverData.plate}</p>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <QrCode size={16} className="text-white" />
            </div>
          </div>
        </header>

        {/* ─── Scrollable Content ─────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "tasks" && (
            <div className="p-4 space-y-4">
              {/* Current Job Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={16} className="text-amber-600" />
                    <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">งานปัจจุบัน</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900">{currentJob.customer}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{currentJob.id}</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin size={16} className="text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{currentJob.address}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{currentJob.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock size={16} className="text-sky-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">กำหนดเวลา {currentJob.eta}</p>
                      <p className="text-xs text-slate-400">{currentJob.items}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{currentJob.contact}</p>
                      <p className="text-xs text-slate-400">ติดต่อผู้รับสินค้า</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check-in Action Area */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-slate-900">ยืนยันการถึงจุด</h3>
                  <p className="text-sm text-slate-500">ถ่ายรูป + GPS เพื่อเป็นหลักฐาน</p>
                </div>

                {checkInState === "idle" && (
                  <button
                    onClick={handleCheckIn}
                    className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 active:scale-95 transition-transform flex items-center justify-center gap-3"
                  >
                    <Camera size={28} />
                    Check-in
                  </button>
                )}

                {checkInState === "capturing" && (
                  <div className="w-full py-5 bg-slate-100 rounded-2xl flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium text-slate-600">กำลังเปิดกล้อง...</span>
                  </div>
                )}

                {checkInState === "confirming" && (
                  <div className="space-y-4">
                    {/* Photo Preview Placeholder */}
                    <div className="aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
                      <Camera size={40} className="text-slate-400 mb-2" />
                      <p className="text-sm text-slate-500">ตัวอย่างรูปถ่าย</p>
                      <p className="text-xs text-slate-400">กดปุ่มเพื่อถ่ายรูปจริง</p>
                    </div>

                    {/* GPS & Timestamp */}
                    <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-indigo-600" />
                        <span className="text-xs text-slate-600">GPS: {mockGPS.lat}, {mockGPS.lng}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-indigo-600" />
                        <span className="text-xs text-slate-600">{mockTimestamp}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckIn}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 active:scale-95 transition-transform flex items-center justify-center gap-3"
                    >
                      <CheckCircle2 size={24} />
                      ยืนยัน Check-in
                    </button>
                  </div>
                )}

                {checkInState === "done" && (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-700">Check-in สำเร็จ</p>
                      <p className="text-sm text-slate-500">{mockTimestamp}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-600">GPS: {mockGPS.lat}, {mockGPS.lng}</p>
                    </div>
                    <button
                      onClick={resetCheckIn}
                      className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium active:scale-95 transition-transform"
                    >
                      ทำรายการใหม่
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowIssueModal(true)}
                  className="py-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl font-medium active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={20} />
                  แจ้งปัญหา
                </button>
                <button className="py-4 bg-sky-50 border border-sky-200 text-sky-700 rounded-2xl font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
                  <Phone size={20} />
                  โทรแจ้ง
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="p-4 space-y-3">
              <h2 className="text-lg font-bold text-slate-900 mb-2">ประวัติงาน</h2>
              {jobHistory.map((job) => (
                <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">{job.id}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${job.type === "pick-up" ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {job.type === "pick-up" ? "รับสินค้า" : "ส่งสินค้า"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-900">{job.customer}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                    <Clock size={12} />
                    <span>{job.time}</span>
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="p-4 space-y-4">
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User size={36} className="text-white" />
                </div>
                <p className="text-xl font-bold text-slate-900">{driverData.name}</p>
                <p className="text-sm text-slate-500">{driverData.id}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">ข้อมูลส่วนตัว</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">ชื่อ-นามสกุล</span>
                    <span className="text-sm font-medium text-slate-900">{driverData.name}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">รหัสพนักงาน</span>
                    <span className="text-sm font-medium text-slate-900">{driverData.id}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">ใบขับขี่</span>
                    <span className="text-sm font-medium text-emerald-600">ใช้งานได้</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">หมดอายุ</span>
                    <span className="text-sm font-medium text-slate-900">28 พ.ค. 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">ยานพาหนะ</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">รหัสรถ</span>
                    <span className="text-sm font-medium text-slate-900">{driverData.vehicle}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">ทะเบียน</span>
                    <span className="text-sm font-medium text-slate-900">{driverData.plate}</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-slate-600">ประเภท</span>
                    <span className="text-sm font-medium text-slate-900">6-ล้อ</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
                <Settings size={18} />
                ตั้งค่า
              </button>
            </div>
          )}
        </div>

        {/* ─── Bottom Navigation ──────────────────────────── */}
        <nav className="bg-white border-t border-slate-200 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-around">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${activeTab === "tasks" ? "text-indigo-600 bg-indigo-50" : "text-slate-400"}`}
            >
              <ClipboardList size={22} />
              <span className="text-[10px] font-medium">งาน</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${activeTab === "history" ? "text-indigo-600 bg-indigo-50" : "text-slate-400"}`}
            >
              <History size={22} />
              <span className="text-[10px] font-medium">ประวัติ</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${activeTab === "profile" ? "text-indigo-600 bg-indigo-50" : "text-slate-400"}`}
            >
              <User size={22} />
              <span className="text-[10px] font-medium">โปรไฟล์</span>
            </button>
          </div>
        </nav>

        {/* ─── Issue Modal ────────────────────────────────── */}
        {showIssueModal && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-end">
            <div className="w-full bg-white rounded-t-3xl p-5 space-y-4 animate-in slide-in-from-bottom">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">แจ้งปัญหา</h3>
                <button onClick={() => setShowIssueModal(false)} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">ประเภทปัญหา</p>
                <div className="grid grid-cols-2 gap-2">
                  {["รถเสีย", "สินค้าเสียหาย", "ลูกค้าไม่อยู่", "อุบัติเหตุ", "อื่นๆ"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setIssueType(type)}
                      className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                        issueType === type
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">รายละเอียด</p>
                <textarea
                  value={issueNote}
                  onChange={(e) => setIssueNote(e.target.value)}
                  placeholder="อธิบายปัญหา..."
                  className="w-full h-24 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <button
                onClick={submitIssue}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 active:scale-95 transition-transform"
              >
                ส่งรายงาน
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
