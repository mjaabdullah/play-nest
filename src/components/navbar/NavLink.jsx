"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }) => {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <li
      className={`pb-1 ${isActive ? " p-1 dark:bg-[#111827] bg md:border-b-2 md:border-[#00C853]" : ""}`}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};

export default NavLink;
