"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import AvatarMenu from "./AvatarMenu";
import NavLink from "./NavLink";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data, error } = authClient.useSession();
  console.log(data);

  const isLoggedIn = data?.user;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-facilities", label: "All Facilities" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/add-facility", label: "Add Facility" },
    { href: "/manage-facilities", label: "Manage Facilities" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 dark:bg-[#111827] shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>

          {/* Logo */}
          <Link href={`/`}>
            <h1 className="text-2xl font-bold text-[#00C853]">PlayNest</h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoggedIn ? (
            <AvatarMenu image={data?.user?.image} />
          ) : (
            <Link href="/login">
              <button className="px-4 py-1 bg-[#00C853] text-white rounded hover:bg-[#00B14F] transition-colors cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#111827] shadow-md px-4 pb-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
