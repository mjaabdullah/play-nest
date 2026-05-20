import { Envelope, Handset, LocationArrow } from "@gravity-ui/icons";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#111827] shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[#00C853] mb-2">PlayNest</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Book your favorite sports facilities easily and quickly.
            </p>
          </div>

          <div>
            <h3 className="text-gray-800 dark:text-white font-semibold mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Envelope /> support@playnest.com
              </li>
              <li className="flex items-center gap-2">
                {" "}
                <Handset /> +880 1700-000000
              </li>
              <li className="flex items-center gap-2">
                {" "}
                <LocationArrow /> Dhaka, Bangladesh
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 dark:text-white font-semibold mb-3">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com/playnest"
                target="_blank"
                className="text-gray-500 dark:text-gray-400 hover:text-[#00C853] transition-colors text-sm"
              >
                Facebook
              </Link>
              <Link
                href="https://twitter.com/playnest"
                target="_blank"
                className="text-gray-500 dark:text-gray-400 hover:text-[#00C853] transition-colors text-sm"
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com/playnest"
                target="_blank"
                className="text-gray-500 dark:text-gray-400 hover:text-[#00C853] transition-colors text-sm"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <p className="text-center text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} PlayNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
