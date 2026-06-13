import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activePath="/" />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
}
