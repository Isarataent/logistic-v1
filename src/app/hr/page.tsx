"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Phone,
  Mail,
  ChevronRight,
  Plus,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EmployeeModal from "@/components/EmployeeModal";

interface Employee {
  id: string;
  name: string;
  role: string;
  license: string;
  licenseExpiry: string;
  status: "active" | "warning" | "expired";
  phone: string;
  employmentType: "in-house" | "outsource";
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const initialEmployees: Employee[] = [
  { id: "EMP-001", name: "สมชาย ใจดี", role: "คนขับรถ", license: "1กข 1234", licenseExpiry: "2026-05-28", status: "active", phone: "081-234-5678", employmentType: "in-house", emergencyContactName: "นางสมหมาย", emergencyContactPhone: "081-111-1111" },
  { id: "EMP-002", name: "มานะ รักษ์ดี", role: "คนขับรถ", license: "2ขค 5678", licenseExpiry: "2026-08-15", status: "active", phone: "082-345-6789", employmentType: "in-house", emergencyContactName: "นายมานะ", emergencyContactPhone: "082-222-2222" },
  { id: "EMP-003", name: "ประเสริฐ เก่งกาจ", role: "คนขับรถ", license: "3คง 9012", licenseExpiry: "2026-03-10", status: "warning", phone: "083-456-7890", employmentType: "outsource", emergencyContactName: "นางประเสริฐ", emergencyContactPhone: "083-333-3333" },
  { id: "EMP-004", name: "วิชัย ขับดี", role: "คนขับรถ", license: "4งจ 3456", licenseExpiry: "2026-12-20", status: "active", phone: "084-567-8901", employmentType: "in-house", emergencyContactName: "นางวิชัย", emergencyContactPhone: "084-444-4444" },
  { id: "EMP-005", name: "สุดา รอดตาย", role: "คนขับรถ", license: "5ฉช 7890", licenseExpiry: "2026-06-05", status: "active", phone: "085-678-9012", employmentType: "outsource", emergencyContactName: "นายสุดา", emergencyContactPhone: "085-555-5555" },
];

const vehicles = [
  { id: "VH-102", type: "6-ล้อ", taxExpiry: "2026-07-15", insuranceExpiry: "2026-09-20", maintenanceDue: "2026-05-30", status: "active" },
  { id: "VH-089", type: "4-ล้อ", taxExpiry: "2026-08-01", insuranceExpiry: "2026-10-15", maintenanceDue: "2026-06-15", status: "active" },
  { id: "VH-205", type: "10-ล้อ", taxExpiry: "2026-05-25", insuranceExpiry: "2026-07-30", maintenanceDue: "2026-05-20", status: "warning" },
  { id: "VH-156", type: "6-ล้อ", taxExpiry: "2026-10-10", insuranceExpiry: "2026-12-05", maintenanceDue: "2026-07-01", status: "active" },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    expired: "bg-rose-50 text-rose-700 border-rose-200",
  };
  const labels: Record<string, string> = {
    active: "ปกติ",
    warning: "ใกล้หมดอายุ",
    expired: "หมดอายุ",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.active}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-emerald-500" : status === "warning" ? "bg-amber-500" : "bg-rose-500"}`} />
      {labels[status] || status}
    </span>
  );
}

function EmploymentBadge({ type }: { type: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
      type === "in-house"
        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
        : "bg-violet-50 text-violet-700 border-violet-200"
    }`}>
      {type === "in-house" ? "พนักงานประจำ" : "พาร์ทเนอร์"}
    </span>
  );
}

export default function HRPage() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleSaveEmployee = (data: any) => {
    const newEmployee: Employee = {
      id: data.employeeId,
      name: `${data.firstName} ${data.lastName}`,
      role: data.role === "driver" ? "คนขับรถ" : data.role === "admin" ? "แอดมิน" : data.role === "accountant" ? "ฝ่ายบัญชี" : "ผู้จัดการ",
      license: data.licenseNumber,
      licenseExpiry: data.licenseExpiryDate,
      status: getLicenseStatus(data.licenseExpiryDate),
      phone: data.phone,
      employmentType: data.employmentType,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
    };

    setEmployees([...employees, newEmployee]);
  };

  const getLicenseStatus = (expiryDate: string): "active" | "warning" | "expired" => {
    if (!expiryDate) return "active";
    const today = new Date("2026-06-13");
    const expiry = new Date(expiryDate);
    const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "expired";
    if (diff <= 30) return "warning";
    return "active";
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/hr" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">HR & Documents</h1>
              <p className="text-sm text-slate-500 mt-1">จัดการพนักงาน เอกสาร และข้อมูลยานพาหนะ</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Plus size={16} />
                เพิ่มพนักงาน
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Users size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">พนักงานทั้งหมด</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{employees.length}</p>
              <p className="text-xs text-slate-400">
                คนขับรถ {employees.filter(e => e.role === "คนขับรถ").length}, อื่นๆ {employees.filter(e => e.role !== "คนขับรถ").length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                  <Clock size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">ใบขับขี่ใกล้หมด</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{employees.filter(e => e.status === "warning").length}</p>
              <p className="text-xs text-slate-400">ต้องแจ้งเตือน</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">พรบ. ใกล้หมด</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-xs text-slate-400">ต้องต่ออายุ</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-lg">
                  <Calendar size={20} />
                </div>
                <span className="text-sm font-medium text-slate-600">เช็คระยะถัดไป</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">5</p>
              <p className="text-xs text-slate-400">ภายใน 30 วัน</p>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">รายชื่อพนักงาน</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รหัส</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ชื่อ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ประเภท</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ตำแหน่ง</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ใบขับขี่</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">หมดอายุ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ติดต่อ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">{emp.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.name}</td>
                      <td className="px-4 py-3"><EmploymentBadge type={emp.employmentType} /></td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.role}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.license}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{emp.licenseExpiry}</td>
                      <td className="px-4 py-3"><StatusBadge status={emp.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Phone size={14} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Mail size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vehicles Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">ข้อมูลยานพาหนะ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">รถ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ประเภท</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ภาษีหมด</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">ประกันหมด</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">เช็คระยะ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">{vehicle.id}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.type}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.taxExpiry}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.insuranceExpiry}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{vehicle.maintenanceDue}</td>
                      <td className="px-4 py-3"><StatusBadge status={vehicle.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <EmployeeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEmployee}
      />
    </div>
  );
}
