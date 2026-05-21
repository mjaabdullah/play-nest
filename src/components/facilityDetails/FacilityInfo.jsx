import { MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import { FiRefreshCw, FiZap } from "react-icons/fi";

const FacilityInfo = ({ facility }) => {
  return (
    <div>
      <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden">
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute " />

        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white/90 text-xs font-medium">
            {facility.capacity} Players Max
          </span>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-white tracking-tight leading-tight">
          {facility.name}
        </h1>
        <div className="flex items-center gap-1.5 mt-2 dark:text-white/60 p-4 rounded-lg font-semibold bg-gray-400/20">
          <MapPin className="w-4 h-4 text-[#009708] shrink-0" />
          <span className="text-sm">{facility.location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-5 p-4 rounded-xl bg-gray-400/20 border border-white/8">
          <div>
            <p className="dark:text-white/40 text-xs uppercase tracking-wider mb-0.5">
              Price per hour
            </p>
            <p className="text-[#009708] text-2xl font-bold">
              ${facility.price_per_hour}
            </p>
          </div>
          <div className="h-10 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 dark:text-white/65 text-sm">
              <FiZap className="w-3.5 h-3.5 text-[#009708]" />
              <span>Floodlights Included</span>
            </div>
            <div className="flex items-center gap-2 dark:text-white/65 text-sm">
              <FiRefreshCw className="w-3.5 h-3.5 text-[#009708]" />
              <span>Changing Rooms</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-bold dark:text-white mb-3">
          About this Facility
        </h2>
        <p className="dark:text-white/55 text-sm leading-relaxed">
          {facility.description}
        </p>
      </div>
    </div>
  );
};

export default FacilityInfo;
