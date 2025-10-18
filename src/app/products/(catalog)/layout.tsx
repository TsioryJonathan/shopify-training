// app/products/layout.tsx
import Sidebar from "@/components/products/Sidebar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-[136px] bg-gray-50">
      {/* Container with max width */}
      <div className="mx-auto">
        {/* Grid: sidebar + content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
