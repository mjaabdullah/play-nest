import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const avatarLinks = [
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/add-facility", label: "Add Facility" },
  { href: "/manage-facilities", label: "Manage My Facilities" },
];

const AvatarMenu = ({ image }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setOpen(false);
        },
      },
    });
  };
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
      {/* <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-[#00C853] text-white font-semibold flex items-center justify-center cursor-pointer hover:bg-[#00B14F] transition-colors"
      >
        <Image width={10} height={10} alt="U" src={image} />
      </button> */}
      <Avatar
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar.Image alt="John Doe" src={image} />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

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
            onClick={handleLogOut}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-[#111827] transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
