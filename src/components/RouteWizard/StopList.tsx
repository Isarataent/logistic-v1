import { useState } from "react";
import { MapPin, Clock, Package, ArrowUpDown, Trash2, GripVertical, Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Stop, Customer } from "./types";

interface StopListProps {
  stops: Stop[];
  customers: Customer[];
  onUpdate: (stops: Stop[]) => void;
}

function SortableStopItem({ stop, index, onDelete }: { stop: Stop; index: number; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border p-4 transition-shadow ${
        isDragging ? "border-indigo-300 shadow-lg" : "border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs font-bold">
            {index + 1}
          </div>
          <button
            {...attributes}
            {...listeners}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
          >
            <GripVertical size={16} />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              stop.type === "pick-up" ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700"
            }`}>
              {stop.type === "pick-up" ? "รับ" : "ส่ง"}
            </span>
            <span className="text-sm font-medium text-slate-900 truncate">{stop.customerName}</span>
          </div>
          <p className="text-xs text-slate-500 mb-1">{stop.address}</p>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {stop.lat}, {stop.lng}
            </span>
            {stop.appointmentTime && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {stop.appointmentTime}
              </span>
            )}
          </div>
          {stop.note && <p className="text-xs text-slate-400 mt-1">{stop.note}</p>}
        </div>

        <button
          onClick={() => onDelete(stop.id)}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default function StopList({ stops, customers, onUpdate }: StopListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [stopType, setStopType] = useState<"pick-up" | "drop-off">("drop-off");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [note, setNote] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = stops.findIndex((s) => s.id === active.id);
      const newIndex = stops.findIndex((s) => s.id === over.id);
      onUpdate(arrayMove(stops, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (!customer) return;

    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      customerId: customer.id,
      customerName: customer.name,
      address: customer.address,
      lat: customer.lat,
      lng: customer.lng,
      type: stopType,
      appointmentTime,
      note,
    };

    onUpdate([...stops, newStop]);
    setShowAddForm(false);
    setSelectedCustomer("");
    setAppointmentTime("");
    setNote("");
  };

  const handleDelete = (id: string) => {
    onUpdate(stops.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700">จุดแวะ ({stops.length})</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors"
        >
          <Plus size={14} />
          เพิ่มจุดแวะ
        </button>
      </div>

      {showAddForm && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">เลือกลูกค้า</label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">เลือกจากฐานข้อมูล</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} - {c.address}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">ประเภท</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setStopType("pick-up")}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    stopType === "pick-up"
                      ? "bg-sky-50 border-sky-300 text-sky-700"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  รับสินค้า
                </button>
                <button
                  onClick={() => setStopType("drop-off")}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                    stopType === "drop-off"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  ส่งสินค้า
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600">เวลานัด</label>
              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-600">หมายเหตุ</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="เช่น ติดต่อคุณ..."
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!selectedCustomer}
              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              เพิ่มจุดแวะ
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      )}

      {stops.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Package size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">ยังไม่มีจุดแวะ</p>
          <p className="text-xs text-slate-400">กด "เพิ่มจุดแวะ" เพื่อเริ่มสร้างเส้นทาง</p>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={stops.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {stops.map((stop, index) => (
                <SortableStopItem
                  key={stop.id}
                  stop={stop}
                  index={index}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
