"use client";

import { AlertDialog, Button } from "@heroui/react";

export default function BookingDeleteDialog({ facility, handleDelete }) {
  return (
    <AlertDialog>
      <Button
        fullWidth
        className="bg-danger-soft dark:bg-danger text-danger-soft-foreground dark:text-white rounded-lg"
      >
        Delete Booking
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-640">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete your Booking?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{facility?.facility_name}</strong> and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                onClick={() => {
                  handleDelete(facility?._id, facility?.user_id);
                }}
                slot="close"
                variant="danger"
              >
                Delete Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
