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
            <div className="md:hidden w-full space-y-4">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.facility_name}
                      </h3>
                      <BookingDeleteDialog
                        facility={item}
                        handleDelete={deleteBooking}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 font-medium">
                          Booking Date
                        </p>
                        <p className="text-gray-800">{item.booking_date}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 font-medium">Time Slot</p>
                        <p className="text-gray-800">{item.time_slot}</p>
                      </div>

                      <div>
                        <p className="text-gray-500 font-medium">Price</p>
                        <p className="text-gray-800 font-semibold">
                          {item.total_price}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 font-medium">Status</p>
                        <p className="text-gray-800">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              item.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : item.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </p>
                      </div>
                    </div>
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
