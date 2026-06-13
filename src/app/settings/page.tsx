import { Settings, Bell, Shield, Database, Palette, Globe, ChevronRight, User, Mail } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const settingGroups = [
  {
    title: "บัญชีผู้ใช้",
    items: [
      { icon: User, label: "โปรไฟล์", description: "แก้ไขข้อมูลส่วนตัว", value: "ผู้จัดการ" },
      { icon: Mail, label: "การแจ้งเตือน", description: "ตั้งค่าการแจ้งเตือน", value: "เปิด" },
    ],
  },
  {
    title: "ระบบ",
    items: [
      { icon: Bell, label: "แจ้งเตือน", description: "ตั้งค่าการแจ้งเตือนอัตโนมัติ", value: "5 รายการ" },
      { icon: Shield, label: "ความปลอดภัย", description: "ตั้งค่ารหัสผ่านและ 2FA", value: "ปกติ" },
      { icon: Database, label: "ฐานข้อมูล", description: "สำรองและกู้คืนข้อมูล", value: "สำรองล่าสุด: วันนี้" },
    ],
  },
  {
    title: "การแสดงผล",
    items: [
      { icon: Palette, label: "ธีม", description: "เลือกธีมการแสดงผล", value: "Light" },
      { icon: Globe, label: "ภาษา", description: "เลือกภาษา", value: "ไทย" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/settings" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
              <p className="text-sm text-slate-500 mt-1">ตั้งค่าระบบและการใช้งาน</p>
            </div>
          </div>

          <div className="max-w-2xl space-y-6">
            {settingGroups.map((group) => (
              <div key={group.title} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">{group.title}</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {group.items.map((item) => (
                    <button key={item.label} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <item.icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{item.label}</p>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                      <span className="text-sm text-slate-600">{item.value}</span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
