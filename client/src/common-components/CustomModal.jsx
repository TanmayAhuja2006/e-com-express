import React from "react";
import { createPortal } from "react-dom";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import BackButton from "../../other/back-button";

// Get the modal portal root from index.html
const modalRoot = document.getElementById("modal-portal");

export default function CustomModal({
  children,
  allowBack = false,
  backAction = () => {},
  ...props
}) {
  if (!modalRoot) return null;

  return createPortal(
    <Modal
      {...props}
      title={props.title || ""}
      placement={props.placement || "center"}
      classNames={{ backdrop: ["!z-[999]"], wrapper: "!z-[999]" }}
    >
      <ModalContent className="p-5 flex flex-col justify-between items-stretch gap-2">
        {(onClose) => (
          <>
            <div className="flex gap-4 items-center mb-2">
              {allowBack && <BackButton onClick={backAction} />}
              {props.title && (
                <ModalHeader className="p-0">{props.title}</ModalHeader>
              )}
            </div>

            <ModalBody className="p-0">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>,
    modalRoot
  );
}
