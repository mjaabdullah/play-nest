import BookingDeleteDialog from "@/components/facilityDetails/BookingDeleteDialog";
import { deleteBooking } from "@/lib/action";
import { auth } from "@/lib/auth";
import { getBookingData } from "@/lib/data";
import { Table } from "@heroui/react";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { data } = await getBookingData(session?.user?.id);

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-2xl md:text-4xl">My Bookings</h1>
      <span className="text-lg text-gray-700">
        Manage your upcoming and past court reservations.
      </span>
      <div className="flex flex-col items-center my-10 w-full px-4">
        {data.length <= 0 ? (
          <h1 className="text-4xl text-gray-500">No Booking Found!</h1>
        ) : (
          <>
            {/* Desktop View - Table */}
            <div className="hidden md:block w-full max-w-6xl">
              <Table variant="secondary">
                <Table.ScrollContainer>
                  <Table.Content>
                    <Table.Header>
                      <Table.Column isRowHeader>Facility Name</Table.Column>
                      <Table.Column>Booking Date</Table.Column>
                      <Table.Column>Time Slot</Table.Column>
                      <Table.Column>Price</Table.Column>
                      <Table.Column>Status</Table.Column>
                      <Table.Column>Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {data.map((item) => (
                        <Table.Row key={item._id}>
                          <Table.Cell>{item.facility_name}</Table.Cell>
                          <Table.Cell>{item.booking_date}</Table.Cell>
                          <Table.Cell>{item.time_slot}</Table.Cell>
                          <Table.Cell>{item.total_price}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                          <Table.Cell>
                            <BookingDeleteDialog
                              facility={item}
                              handleDelete={deleteBooking}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden w-full space-y-3 px-2 ">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-[#1A2235] rounded-xl shadow-sm border border-gray-100 dark:border-white/8 overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#1A2235] border-b border-gray-100 dark:border-white/8">
                    <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 truncate pr-2">
                      {item.facility_name}
                    </h3>
                    <span
                      className={`shrink-0 inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gray-400">📅</span>
                      <span className="font-medium text-gray-500">Date:</span>
                      <span className="text-gray-800 dark:text-gray-300">
                        {item.booking_date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gray-400">🕐</span>
                      <span className="font-medium text-gray-500">Time:</span>
                      <span className="text-gray-800 dark:text-gray-300">
                        {item.time_slot}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-gray-400">💰</span>
                      <span className="font-medium text-gray-500">Price:</span>
                      <span className="font-bold text-gray-900 dark:text-gray-300">
                        $ {item.total_price}
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-2 border-t border-gray-100 dark:border-white/8 flex justify-end">
                    <BookingDeleteDialog
                      facility={item}
                      handleDelete={deleteBooking}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;
