"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(undefined);

  useEffect(() => {
    if (pathname !== "/admin/login") {
      // Sadece client'ta çalışır
      const hasToken = typeof window !== 'undefined' && document.cookie.split(';').some(c => c.trim().startsWith('admin_token='));
      setIsAuth(hasToken);
      if (!hasToken) {
        router.replace("/admin/login");
      }
    } else {
      setIsAuth(true);
    }
  }, [pathname, router]);

  if (isAuth === false) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
        <nav className="flex flex-col h-full py-8 px-4 gap-2">
          <Link href="/admin/about">
            <span className={`block px-4 py-2 rounded-lg font-semibold ${pathname === "/admin/about" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}>About</span>
          </Link>
          <Link href="/admin/experience">
            <span className={`block px-4 py-2 rounded-lg font-semibold ${pathname === "/admin/experience" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}>Experience</span>
          </Link>
          <Link href="/admin/certificate">
            <span className={`block px-4 py-2 rounded-lg font-semibold ${pathname === "/admin/certificate" ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}>Certificate</span>
          </Link>
        </nav>
      </aside>
      {/* Mobile Sidebar */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md flex md:hidden">
        <Link href="/admin/about" className={`flex-1 text-center py-3 font-semibold ${pathname === "/admin/about" ? "bg-blue-600 text-white" : ""}`}>About</Link>
        <Link href="/admin/experience" className={`flex-1 text-center py-3 font-semibold ${pathname === "/admin/experience" ? "bg-blue-600 text-white" : ""}`}>Experience</Link>
        <Link href="/admin/certificate" className={`flex-1 text-center py-3 font-semibold ${pathname === "/admin/certificate" ? "bg-blue-600 text-white" : ""}`}>Certificate</Link>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64">{children}</main>
    </div>
  );
} 