import React from "react";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/react";

export default function CustomDrawer({
  isOpen = false,
  onClose = () => {},
  title,
  children,
  footer,
  className = "",
  ...props
}) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} {...props} className={className}>
      {title && (
        <DrawerHeader className="font-bold text-lg p-4">{title}</DrawerHeader>
      )}
      <DrawerBody className="p-4">{children}</DrawerBody>
      {footer && <DrawerFooter className="p-4">{footer}</DrawerFooter>}
    </Drawer>
  );
}
