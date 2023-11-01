'use client'

import { Button, Modal } from "@mantine/core";

type ConfirmModalProps = {
    title: string;
    message: string;
    opened: boolean;
    onConfirm: () => void;
    close: () => void;
};

export default function ConfirmModal({
    title,
    message,
    onConfirm,
    opened,
    close
}: ConfirmModalProps) {

    const handleConfirm = () => {
        onConfirm();
        close();

    };

    const handleCancel = () => {
        close();
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title={title}
            size="sm"
            zIndex={100000}
        >
            <div>{message}</div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
                <Button variant="outline" onClick={handleCancel} style={{ marginRight: "1rem" }}>
                    Cancel
                </Button>
                <Button variant="filled" color="red" onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
