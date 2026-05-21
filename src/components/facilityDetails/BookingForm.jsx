"use client";
import { authClient } from "@/lib/auth-client";
import { bookingHandle } from "@/lib/data";
import { Clock } from "@gravity-ui/icons";
import { Calendar, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FiZap } from "react-icons/fi";

const BookingForm = ({ facility }) => {
  const router = useRouter();
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState("");
  const { data } = authClient.useSession();
  const userId = data?.user?.id;

  const totalPrice = useMemo(() => {
    const h = parseFloat(hours);
    if (!isNaN(h) && h > 0) {
      return (h * facility.price_per_hour).toFixed(2);
    }
    return null;
  }, [hours, facility.price_per_hour]);

  //
  const bookingPayload = {
    facility_id: facility._id,
    user_id: userId,
    facility_name: facility.name,
    booking_date: bookingDate,
    time_slot: timeSlot,
    hours: parseFloat(hours) || 0,
    price_per_hour: facility.price_per_hour,
    total_price: totalPrice ? parseFloat(totalPrice) : 0,
    status: "pending",
  };

  const handleConfirm = async () => {
    if (!bookingDate || !timeSlot || !hours) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await bookingHandle(bookingPayload);

      toast.success("Booking successfully completed!");
      setSelectedSlots([]);
      e.target.reset();
      router.push("/my-bookings");
    } catch (err) {
      toast.danger(err?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-400/20 border border-gray-200 dark:border-white/10 rounded-2xl p-5 shadow-md dark:shadow-2xl">
      <h2 className="text-gray-900 dark:text-white text-lg font-bold mb-5">
        Secure Your Slot
      </h2>

      <div className="space-y-4">
        {/* Facility Name */}
        <div>
          <label className="block text-gray-500 dark:text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Facility Name
          </label>
          <div className="w-full bg-gray-100 dark:bg-white/20 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-3 text-gray-700 dark:text-white/70 text-sm">
            {facility.name}
          </div>
        </div>

        {/* Booking Date */}
        <div>
          <label className="block text-gray-500 dark:text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Booking Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-3 text-gray-800 dark:text-white/70 text-sm appearance-none focus:outline-none focus:border-[#009708]/60 focus:ring-1 focus:ring-[#009708]/20 transition-all pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none" />
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-gray-500 dark:text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Available Time Slots
          </label>
          <div className="relative">
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-3 text-gray-800 dark:text-white/70 text-sm appearance-none focus:outline-none focus:border-[#009708]/60 focus:ring-1 focus:ring-[#009708]/20 transition-all pr-8"
            >
              <option value="" disabled>
                Select a slot
              </option>
              {facility.available_slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25 pointer-events-none" />
          </div>
        </div>

        {/* Hours */}
        <div>
          <label className="block text-gray-500 dark:text-white/50 text-xs font-semibold uppercase tracking-wider mb-1.5">
            Hours
          </label>
          <input
            type="number"
            min="1"
            placeholder="e.g. 2"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/8 rounded-xl px-4 py-3 text-gray-800 dark:text-white/70 text-sm focus:outline-none focus:border-[#009708]/60 focus:ring-1 focus:ring-[#009708]/20 transition-all"
          />
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-white/8">
          <div>
            <span className="text-gray-500 dark:text-white/55 text-sm font-medium">
              Total Price
            </span>
            <p className="text-xs text-gray-400 dark:text-white/30 mt-0.5">
              ${facility.price_per_hour}/hr × {hours || "—"} hr
            </p>
          </div>
          <span className="text-[#009708] text-2xl font-bold">
            {totalPrice ? `$${totalPrice}` : "$—"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          className="w-full bg-[#009708] hover:bg-[#007c07] active:scale-95 text-[#89ac8f] font-bold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#009708]/20"
        >
          <FiZap className="w-4 h-4" />
          Confirm Booking
        </button>

        <p className="text-center text-gray-400 dark:text-white/25 text-xs">
          No hidden fees. Instant confirmation.
        </p>
      </div>
    </div>
  );
};

export default BookingForm;
