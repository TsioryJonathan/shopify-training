// app/products/layout.tsx
import Sidebar from "@/components/products/Sidebar";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20">
      {/* Grille: sidebar + contenu */}
      <div className="grid grid-cols-1 md:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
