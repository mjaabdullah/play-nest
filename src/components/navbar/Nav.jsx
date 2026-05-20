"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-facilities", label: "All Facilities" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-facility", label: "Add Facility" },
  { href: "/manage-facilities", label: "Manage Facilities" },
];

const avatarLinks = [
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-facility", label: "Add Facility" },
  { href: "/manage-facilities", label: "Manage My Facilities" },
];

const NavLink = ({ href, label, onClick }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`block py-1 transition-colors ${
          isActive
            ? "text-[#00C853] border-b-2 border-[#00C853]"
            : "text-gray-700 dark:text-gray-300 hover:text-[#00C853]"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

// Avatar Dropdown
const AvatarMenu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-[#00C853] text-white font-semibold flex items-center justify-center cursor-pointer hover:bg-[#00B14F] transition-colors"
      >
        U
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1f2937] shadow-lg rounded-md py-1 z-50">
          {avatarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#111827] hover:text-[#00C853] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <hr className="my-1 border-gray-200 dark:border-gray-600" />
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-[#111827] transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = false;
  return (
    <header className="bg-white dark:bg-[#111827] shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
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
          <h1 className="text-2xl font-bold text-[#00C853]">PlayNest</h1>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <AvatarMenu />
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
        <div className="md:hidden bg-white dark:bg-[#111827] shadow-md px-4 pb-4">
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
