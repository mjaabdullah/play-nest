"use client";

import { authClient } from "@/lib/auth-client";
import { postFacility } from "@/lib/data";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const facilityTypes = ["Football", "Badminton", "Swimming", "Tennis"];

const timeSlots = [
  "06:00 AM - 08:00 AM",
  "08:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 02:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
  "08:00 PM - 10:00 PM",
];

const AddFacilityForm = () => {
  const router = useRouter();
  const session = authClient.useSession();
  const ownerEmail = session?.data?.user?.email || "";

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [slotsError, setSlotsError] = useState("");

  const toggleSlot = (slot) => {
    setSlotsError("");
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (selectedSlots.length === 0) {
      setSlotsError("Please select at least one time slot");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const facilityData = {};

    formData.forEach((value, key) => {
      facilityData[key] = value.toString();
    });

    const payload = {
      ...facilityData,
      price_per_hour: Number(facilityData.price_per_hour),
      capacity: Number(facilityData.capacity),
      available_slots: selectedSlots,
      owner_email: ownerEmail,
      booking_count: 0,
    };

    try {
      const res = await postFacility(payload);
      console.log(res, "res");
      if (!res.ok) throw new Error("Failed to add facility");

      toast.success("Facility added successfully!");
      setSelectedSlots([]);
      e.target.reset();
      router.push("/all-facilities");
    } catch (err) {
      toast.warning(`Something went wrong: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#0D1117] flex items-center justify-center px-4 py-12">
      <Form
        className="w-full max-w-2xl flex flex-col gap-5 bg-white dark:bg-[#161D27] border border-gray-200 dark:border-[#1C2A3A] rounded-2xl p-7 shadow-lg dark:shadow-black/30"
        onSubmit={onSubmit}
      >
        {/* Heading */}
        <div className="mb-2">
          <h1 className="text-gray-800 dark:text-[#E8F0ED] text-2xl font-bold tracking-tight">
            Add New Facility
          </h1>
          <p className="text-gray-500 dark:text-[#8BA3A0] text-sm mt-1">
            Fill in the details to list your sports facility
          </p>
        </div>

        {/* Facility Name */}
        <TextField isRequired name="name">
          <Label>Facility Name</Label>
          <Input placeholder="e.g. Green Turf Arena" />
          <FieldError />
        </TextField>

        {/* Facility Type */}
        <TextField
          isRequired
          name="facility_type"
          validate={(value) => {
            if (!facilityTypes.includes(value)) {
              return "Please select a valid facility type";
            }
            return null;
          }}
        >
          <Label>Facility Type</Label>
          <select
            name="facility_type"
            required
            className="w-full h-10 px-3 rounded-xl text-sm bg-white dark:bg-[#1A2235] border border-gray-200 dark:border-[#1C2A3A] text-gray-800 dark:text-[#E8F0ED] focus:outline-none focus:border-[#00D68F]"
          >
            <option value="">Select a sport type</option>
            {facilityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </TextField>

        {/* Image URL */}
        <TextField
          isRequired
          name="image"
          validate={(value) => {
            if (!/^https?:\/\/.+/i.test(value)) {
              return "Please enter a valid image URL (from imgbb or postimage)";
            }
            return null;
          }}
        >
          <Label>Image URL</Label>
          <Input placeholder="https://i.ibb.co/your-image.jpg" />
          <FieldError />
        </TextField>

        {/* Location */}
        <TextField isRequired name="location">
          <Label>Location</Label>
          <Input placeholder="e.g. Mirpur, Dhaka" />
          <FieldError />
        </TextField>

        {/* Price & Capacity — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            isRequired
            name="price_per_hour"
            validate={(value) => {
              if (!value || Number(value) <= 0) {
                return "Enter a valid price";
              }
              return null;
            }}
          >
            <Label>Price Per Hour ($)</Label>
            <Input type="number" placeholder="e.g. 800" min={1} />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="capacity"
            validate={(value) => {
              if (!value || Number(value) <= 0) {
                return "Enter a valid capacity";
              }
              return null;
            }}
          >
            <Label>Capacity (players)</Label>
            <Input type="number" placeholder="e.g. 22" min={1} />
            <FieldError />
          </TextField>
        </div>

        {/* Available Time Slots */}
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-gray-700 dark:text-[#8BA3A0]">
            Available Time Slots
          </Label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150
                    ${
                      isSelected
                        ? "bg-[#00D68F] border-[#00D68F] text-[#0D1117]"
                        : "bg-transparent border-gray-300 dark:border-[#1C2A3A] text-gray-600 dark:text-[#8BA3A0] hover:border-[#00D68F] hover:text-[#00D68F]"
                    }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          {slotsError && (
            <p className="text-danger text-xs mt-1">{slotsError}</p>
          )}
          {selectedSlots.length > 0 && (
            <p className="text-[#00D68F] text-xs">
              {selectedSlots.length} slot{selectedSlots.length > 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </div>

        {/* Description */}
        <TextField
          isRequired
          name="description"
          validate={(value) => {
            if (value.trim().length < 20) {
              return "Description must be at least 20 characters";
            }
            return null;
          }}
        >
          <Label>Description</Label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Describe your facility — features, rules, amenities..."
            className="w-full px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-[#1A2235] border border-gray-200 dark:border-[#1C2A3A] text-gray-800 dark:text-[#E8F0ED] placeholder:text-gray-400 dark:placeholder:text-[#3D5260] focus:outline-none focus:border-[#00D68F] resize-none"
          />
        </TextField>

        {/* Owner Email — read only */}
        <TextField name="owner_email">
          <Label>Owner Email</Label>
          <Input
            value={ownerEmail}
            readOnly
            className="opacity-60 cursor-not-allowed"
          />
        </TextField>

        {/* Submit */}
        <Button
          className="bg-[#00D68F] text-[#0D1117] font-semibold w-full mt-1 rounded-xl"
          fullWidth
          type="submit"
        >
          Add Facility
        </Button>
      </Form>
    </div>
  );
};

export default AddFacilityForm;
