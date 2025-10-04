import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

export default function CustomAccordion({ accordionContent = [], ...props }) {
  return (
    <Accordion {...props}>
      {accordionContent.map((content) => (
        <AccordionItem
          key={content.id}
          aria-label={content.title}
          title={content.title}
        >
          {content.text}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
