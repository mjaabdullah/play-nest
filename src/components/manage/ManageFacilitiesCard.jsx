import { deleteFacility } from "@/lib/action";
import { MapPin, PencilToSquare } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import DeleteDialog from "./DeleteDialog";

const ManageFacilitiesCard = ({ facility }) => {
  const { _id, name, location, price_per_hour, image, available_slots } =
    facility || {};

  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-[#1f2937] shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-sm">
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
          <span className="text-lg text-gray-400">Hourly Rate</span>
          <span className="text-[#00C853] font-bold text-lg">
            ${price_per_hour}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 justify-center pt-3">
          <Link href={`/manage-facilities/edit/${_id}`}>
            <Button
              fullWidth
              className={`text-[#00C853] dark:bg-gray-200 rounded-lg`}
              variant="secondary"
            >
              <PencilToSquare />
              Edit
            </Button>
          </Link>
          <DeleteDialog facility={facility} handleDelete={deleteFacility} />
        </div>
      </div>
    </div>
  );
};

export default ManageFacilitiesCard;
