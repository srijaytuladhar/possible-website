"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown, Heart } from "lucide-react";

interface SubmenuItem {
  name: string;
  href: string;
  tabKey: string;
}

interface NavItem {
  name: string;
  href: string;
  submenu?: SubmenuItem[];
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    {
      name: "Publications",
      href: "/publications/impact-reports",
      submenu: [
        { name: "Impact Reports", href: "/publications/impact-reports", tabKey: "impact-reports" },
        { name: "Research Papers", href: "/publications/research-papers", tabKey: "research-papers" },
        { name: "Research Briefs", href: "/publications/research-briefs", tabKey: "research-briefs" },
        { name: "Financials", href: "/publications/financials", tabKey: "financials" },
      ],
    },
    {
      name: "Get Involved",
      href: "/get-involved/our-team",
      submenu: [
        { name: "Team Members", href: "/get-involved/our-team?tab=team-members", tabKey: "team-members" },
        { name: "Possible Board - US", href: "/get-involved/our-team?tab=us-board", tabKey: "us-board" },
        { name: "Shambhav (Possible) Board - Nepal", href: "/get-involved/our-team?tab=nepal-board", tabKey: "nepal-board" },
        { name: "Work with us", href: "/get-involved/work-with-us", tabKey: "work-with-us" },
        { name: "Collaborators & Partners", href: "/get-involved/collaborators-partners", tabKey: "collaborators-partners" },
      ],
    },
    { name: "News", href: "/news" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm backdrop-blur-md/90">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="Possible Logo" width={150} height={40} className="object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
              onMouseLeave={() => item.submenu && setActiveDropdown(null)}
            >
              {item.submenu ? (
                <button
                  className={`flex items-center gap-1 font-equip font-medium text-[15px] md:text-[16px] py-2 transition-colors cursor-pointer ${
                    pathname === item.href
                      ? "text-primary-pink"
                      : "text-body-gray hover:text-primary-pink"
                  }`}
                >
                  {item.name}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`font-equip font-medium text-[15px] md:text-[16px] py-2 transition-colors ${
                    pathname === item.href
                      ? "text-primary-pink"
                      : "text-body-gray hover:text-primary-pink"
                  }`}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.submenu && activeDropdown === item.name && (
                <div className="absolute left-0 mt-0 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                  {item.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="block rounded-lg px-4 py-2.5 font-equip text-[14px] text-body-gray hover:bg-zinc-50 hover:text-primary-pink transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button: Donate */}
        <div className="hidden md:flex items-center">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-6 py-2.5 font-equip font-medium text-[14px] md:text-[15px] text-white shadow-lg shadow-primary-pink/25 transition-all duration-300 hover:bg-primary-pink/90 hover:shadow-primary-pink/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="h-4 w-4 fill-white" />
            <span>Donate</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink px-4 py-2 font-equip font-medium text-[13px] text-white shadow-md shadow-primary-pink/20 transition-all hover:bg-primary-pink/90"
          >
            <Heart className="h-3.5 w-3.5 fill-white" />
            <span>Donate</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-body-gray hover:bg-zinc-50 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4 px-6 py-6 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col space-y-2">
                {item.submenu ? (
                  <>
                    <div className="font-equip font-medium text-[16px] text-black pb-1 border-b border-zinc-100">
                      {item.name}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 font-equip text-[14px] text-body-gray hover:text-primary-pink"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-equip font-medium text-[16px] py-1 transition-colors ${
                      pathname === item.href
                        ? "text-primary-pink"
                        : "text-body-gray hover:text-primary-pink"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
