"use client";

import { AlertDialog, Button } from "@heroui/react";

export default function DeleteDialog({ name }) {
  return (
    <AlertDialog>
      <Button
        fullWidth
        className="bg-danger-soft dark:bg-danger text-danger-soft-foreground dark:text-white rounded-lg"
      >
        Delete Facility
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete your facility?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{name}</strong> and all of
                its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button slot="close" variant="danger">
                Delete Facility
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
