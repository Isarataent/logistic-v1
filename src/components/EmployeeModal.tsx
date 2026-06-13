"use client";

import { useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  Briefcase,
  Car,
  CreditCard,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Shield,
  Building2,
  Banknote,
  Save,
  UserPlus,
} from "lucide-react";

interface EmployeeFormData {
  // Personal
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  // Employment
  employeeId: string;
  employmentType: "in-house" | "outsource";
  role: string;
  assignedVehicle: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  // Documents
  licenseNumber: string;
  licenseType: string;
  licenseIssueDate: string;
  licenseExpiryDate: string;
  idCardUploaded: boolean;
  backgroundCheckUploaded: boolean;
}

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeFormData) => void;
}

const tabs = [
  { id: 1, label: "ข้อมูลส่วนตัว", icon: User },
  { id: 2, label: "ข้อมูลงาน", icon: Briefcase },
  { id: 3, label: "เอกสาร", icon: FileText },
];

const roles = [
  { id: "driver", label: "คนขับรถ" },
  { id: "admin", label: "แอดมิน" },
  { id: "accountant", label: "ฝ่ายบัญชี" },
  { id: "manager", label: "ผู้จัดการ" },
];

const vehicles = [
  { id: "", label: "ยังไม่กำหนด" },
  { id: "VH-089", label: "VH-089 (4-ล้อ)" },
  { id: "VH-078", label: "VH-078 (4-ล้อ)" },
];

const banks = [
  "กรุงเทพ",
  "กสิกรไทย",
  "กรุงไทย",
  "ไทยพาณิชย์",
  "ทหารไทย",
  "ออมสิน",
];

function getEmployeePrefix(role: string): string {
  const map: Record<string, string> = {
    driver: "DRV",
    admin: "ADM",
    accountant: "ACC",
    manager: "MGR",
  };
  return map[role] || "EMP";
}

function generateEmployeeId(role: string): string {
  const prefix = getEmployeePrefix(role);
  return `${prefix}-${String(Math.floor(Math.random() * 900) + 100)}`;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
}

function getLicenseStatus(expiryDate: string): {
  status: "normal" | "warning" | "critical";
  daysLeft: number;
} {
  if (!expiryDate) return { status: "normal", daysLeft: 999 };
  const today = new Date("2026-06-13");
  const expiry = new Date(expiryDate);
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { status: "critical", daysLeft: diff };
  if (diff <= 30) return { status: "warning", daysLeft: diff };
  return { status: "normal", daysLeft: diff };
}

export default function EmployeeModal({ isOpen, onClose, onSave }: EmployeeModalProps) {
  const [tab, setTab] = useState(1);
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    employeeId: generateEmployeeId("driver"),
    employmentType: "in-house",
    role: "driver",
    assignedVehicle: "",
    bankName: "",
    bankAccount: "",
    bankAccountName: "",
    licenseNumber: "",
    licenseType: "รถยนต์",
    licenseIssueDate: "",
    licenseExpiryDate: "",
    idCardUploaded: false,
    backgroundCheckUploaded: false,
  });

  const update = (updates: Partial<EmployeeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const updateRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      role,
      employeeId: generateEmployeeId(role),
    }));
  };

  const licenseStatus = getLicenseStatus(formData.licenseExpiryDate);

  const isTab1Valid =
    formData.firstName && formData.lastName && formData.phone;
  const isTab2Valid =
    formData.employeeId && formData.role && formData.bankName && formData.bankAccount;
  const isTab3Valid = formData.licenseNumber && formData.licenseExpiryDate;

  const tabValidation = [isTab1Valid, isTab2Valid, isTab3Valid];

  const handleSave = () => {
    onSave(formData);
    setTab(1);
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      employeeId: generateEmployeeId("driver"),
      employmentType: "in-house",
      role: "driver",
      assignedVehicle: "",
      bankName: "",
      bankAccount: "",
      bankAccountName: "",
      licenseNumber: "",
      licenseType: "รถยนต์",
      licenseIssueDate: "",
      licenseExpiryDate: "",
      idCardUploaded: false,
      backgroundCheckUploaded: false,
    });
    onClose();
  };

  const canProceed = (currentTab: number) => {
    if (currentTab === 1) return isTab1Valid;
    if (currentTab === 2) return isTab2Valid;
    return true;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">เพิ่มพนักงานใหม่</h2>
              <p className="text-xs text-slate-500">
                ขั้นตอน {tab} จาก {tabs.length}
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

        {/* Tab Indicator */}
        <div className="px-6 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            {tabs.map((t, index) => (
              <button
                key={t.id}
                onClick={() => {
                  // Allow clicking to previous tabs or next if current is valid
                  if (t.id < tab || (t.id === tab + 1 && canProceed(tab))) {
                    setTab(t.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  tab === t.id
                    ? "bg-indigo-50 text-indigo-700"
                    : t.id < tab
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-50 text-slate-400"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    tab === t.id
                      ? "bg-indigo-600 text-white"
                      : t.id < tab
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-300 text-white"
                  }`}
                >
                  {t.id < tab ? "✓" : t.id}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tab 1: Personal */}
          {tab === 1 && (
            <div className="space-y-5">
              {/* Profile Photo Placeholder */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center border-2 border-dashed border-indigo-300">
                  <User size={32} className="text-indigo-400" />
                </div>
                <div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                    <Upload size={16} />
                    อัปโหลดรูปโปรไฟล์
                  </button>
                  <p className="text-xs text-slate-400 mt-1">
                    รองรับ JPG, PNG ขนาดไม่เกิน 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    ชื่อ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => update({ firstName: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="ชื่อ"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    นามสกุล <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => update({ lastName: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="นามสกุล"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  เบอร์โทรศัพท์ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => update({ phone: formatPhone(e.target.value) })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="08X-XXX-XXXX"
                />
                {!formData.phone && (
                  <p className="text-xs text-rose-500">จำเป็นต้องกรอก</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update({ email: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>

              {/* Emergency Contact */}
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-amber-600" />
                  <h3 className="text-sm font-semibold text-amber-800">
                    ผู้ติดต่อฉุกเฉิน
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      ชื่อผู้ติดต่อ
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactName}
                      onChange={(e) => update({ emergencyContactName: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="ชื่อ-นามสกุล"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      เบอร์โทร
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        update({ emergencyContactPhone: formatPhone(e.target.value) })
                      }
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="08X-XXX-XXXX"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Employment */}
          {tab === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  รหัสพนักงาน <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => update({ employeeId: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  readOnly
                />
                <p className="text-xs text-slate-400">
                  ระบบสร้างอัตโนมัติ
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  ประเภทพนักงาน <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => update({ employmentType: "in-house" })}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                      formData.employmentType === "in-house"
                        ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Building2
                        size={18}
                        className={
                          formData.employmentType === "in-house"
                            ? "text-indigo-600"
                            : "text-slate-400"
                        }
                      />
                      <span className="font-semibold">พนักงานประจำ</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      รับเงินเดือน + สวัสดิการ
                    </p>
                  </button>
                  <button
                    onClick={() => update({ employmentType: "outsource" })}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                      formData.employmentType === "outsource"
                        ? "border-violet-500 bg-violet-50 ring-1 ring-violet-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Car
                        size={18}
                        className={
                          formData.employmentType === "outsource"
                            ? "text-violet-600"
                            : "text-slate-400"
                        }
                      />
                      <span className="font-semibold">พาร์ทเนอร์ / รถร่วม</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      รับค่าเที่ยวต่องาน
                    </p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  ตำแหน่ง <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updateRole(role.id)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        formData.role === role.id
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.role === "driver" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    รถประจำ
                  </label>
                  <select
                    value={formData.assignedVehicle}
                    onChange={(e) => update({ assignedVehicle: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Bank Details */}
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <Banknote size={16} className="text-emerald-600" />
                  <h3 className="text-sm font-semibold text-emerald-800">
                    ข้อมูลบัญชีธนาคาร
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      ธนาคาร <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.bankName}
                      onChange={(e) => update({ bankName: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">เลือกธนาคาร</option>
                      {banks.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        เลขที่บัญชี <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) =>
                          update({
                            bankAccount: e.target.value.replace(/\D/g, "").slice(0, 15),
                          })
                        }
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="เลขบัญชี"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        ชื่อบัญชี
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccountName}
                        onChange={(e) => update({ bankAccountName: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="ชื่อตามบัญชี"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Documents */}
          {tab === 3 && (
            <div className="space-y-5">
              {/* License */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-semibold text-slate-800">
                    ใบขับขี่
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      เลขใบขับขี่ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => update({ licenseNumber: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="เลขใบขับขี่"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      ประเภท
                    </label>
                    <select
                      value={formData.licenseType}
                      onChange={(e) => update({ licenseType: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="รถยนต์">รถยนต์</option>
                      <option value="รถบรรทุก">รถบรรทุก</option>
                      <option value="รถจักรยานยนต์">รถจักรยานยนต์</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      วันออกบัตร
                    </label>
                    <input
                      type="date"
                      value={formData.licenseIssueDate}
                      onChange={(e) => update({ licenseIssueDate: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      วันหมดอายุ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.licenseExpiryDate}
                      onChange={(e) => update({ licenseExpiryDate: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* License Status */}
                {formData.licenseExpiryDate && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-xl ${
                      licenseStatus.status === "normal"
                        ? "bg-emerald-50 border border-emerald-200"
                        : licenseStatus.status === "warning"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-rose-50 border border-rose-200"
                    }`}
                  >
                    {licenseStatus.status === "normal" ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <AlertTriangle
                        size={16}
                        className={
                          licenseStatus.status === "warning"
                            ? "text-amber-600"
                            : "text-rose-600"
                        }
                      />
                    )}
                    <p
                      className={`text-sm font-medium ${
                        licenseStatus.status === "normal"
                          ? "text-emerald-700"
                          : licenseStatus.status === "warning"
                          ? "text-amber-700"
                          : "text-rose-700"
                      }`}
                    >
                      {licenseStatus.status === "normal"
                        ? `ใบขับขี่ใช้งานได้ (เหลือ ${licenseStatus.daysLeft} วัน)`
                        : licenseStatus.status === "warning"
                        ? `ใบขับขี่ใกล้หมดอายุ (เหลือ ${licenseStatus.daysLeft} วัน) - จะแจ้งเตือนใน Alert Center`
                        : `ใบขับขี่หมดอายุแล้ว (${Math.abs(licenseStatus.daysLeft)} วัน) - สถานะจะถูกตั้งเป็น "รอเอกสาร/ห้ามวิ่งงาน"`}
                    </p>
                  </div>
                )}
              </div>

              {/* Document Uploads */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  เอกสารประกอบ
                </h3>

                <button
                  onClick={() => update({ idCardUploaded: !formData.idCardUploaded })}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    formData.idCardUploaded
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      formData.idCardUploaded
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900">
                      สำเนาบัตรประชาชน
                    </p>
                    <p className="text-xs text-slate-500">
                      แบรนด์ใหญ่บังคับให้มีก่อนเริ่มงาน
                    </p>
                  </div>
                  {formData.idCardUploaded ? (
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  ) : (
                    <Upload size={18} className="text-slate-400" />
                  )}
                </button>

                <button
                  onClick={() =>
                    update({
                      backgroundCheckUploaded: !formData.backgroundCheckUploaded,
                    })
                  }
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    formData.backgroundCheckUploaded
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      formData.backgroundCheckUploaded
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Shield size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900">
                      ใบแจ้งผลตรวจประวัติอาชญากรรม
                    </p>
                    <p className="text-xs text-slate-500">
                      Shopee / Makro บังคับใช้
                    </p>
                  </div>
                  {formData.backgroundCheckUploaded ? (
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  ) : (
                    <Upload size={18} className="text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {tab > 1 ? (
            <button
              onClick={() => setTab(tab - 1)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              <ChevronLeft size={16} />
              กลับ
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              ยกเลิก
            </button>
          )}

          {tab < 3 ? (
            <button
              onClick={() => canProceed(tab) && setTab(tab + 1)}
              disabled={!canProceed(tab)}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ถัดไป
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={!isTab3Valid}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              บันทึก
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
