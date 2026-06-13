"use client";

import { Truck, MapPin, Users, AlertTriangle, Settings, LayoutDashboard, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Truck, label: "Live Fleet", href: "/fleet" },
  { icon: MapPin, label: "Route Planning", href: "/planning" },
  { icon: Users, label: "HR & Documents", href: "/hr" },
  { icon: AlertTriangle, label: "Penalty Disputes", href: "/penalties" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar({ activePath }: { activePath: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 bg-white border border-slate-200 rounded-lg shadow-sm"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Truck size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-sm leading-tight">Logistic Pro</h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Fleet Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activePath === item.href
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-4 text-white">
          <p className="text-xs font-medium opacity-80 mb-1">Fleet Status</p>
          <p className="text-2xl font-bold">412</p>
          <p className="text-xs opacity-70">ยานพาหนะทั้งหมด</p>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
              <p className="text-sm font-bold">312</p>
              <p className="text-[10px] opacity-70">Active</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
              <p className="text-sm font-bold">58</p>
              <p className="text-[10px] opacity-70">Idle</p>
            </div>
            <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
              <p className="text-sm font-bold">42</p>
              <p className="text-[10px] opacity-70">Maint</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
