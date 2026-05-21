import { MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const FacilityCard = ({ facility }) => {
  const { _id, name, location, price_per_hour, image, available_slots } =
    facility || {};

  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#1f2937] shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
      <Link href={`/facility/${_id}`}>
        <div className="relative h-44 w-full">
          <Image src={image} alt={name} fill className="object-cover" />

          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              available_slots.length > 0
                ? "bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40"
                : "bg-red-500/20 text-red-400 border border-red-400/40"
            }`}
          >
            {available_slots.length > 0 ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {name}
          </h3>
          <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin size={13} className="text-[#00C853]" />
            {location}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-[#00C853] font-bold text-lg">
              ${price_per_hour}
              <span className="text-sm font-normal text-gray-400">/hr</span>
            </span>
            <Link href={`/facility/${_id}`}>
              <button
                disabled={!available_slots.length}
                className="px-4 py-1.5 bg-[#00C853] text-white text-sm rounded-lg hover:bg-[#00B14F] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FacilityCard;
