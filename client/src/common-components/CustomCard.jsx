import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

export default function CustomCard({
  cardHeader,
  cardBody,
  cardFooter,
  className = "",
  ...props
}) {
  return (
    <Card
      {...props}
      className={`p-7 flex flex-col justify-between items-stretch gap-2 shadow-custom ${className}`}
    >
      {cardHeader && (
        <CardHeader className="h-fit p-0">{cardHeader}</CardHeader>
      )}
      <CardBody className="p-0 scrollbar-hide">{cardBody}</CardBody>
      {cardFooter && <CardFooter className="p-0">{cardFooter}</CardFooter>}
    </Card>
  );
}
