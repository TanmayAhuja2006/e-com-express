import React from "react";
import CustomCard from "../common-components/CustomCard";

export default function CardWrapper({ title, cards = [], className = "" }) {
  return (
    <section className={`px-4 py-8 max-w-7xl mx-auto ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, index) => (
          <CustomCard
            key={index}
            cardHeader={card.cardHeader}
            cardBody={card.cardBody}
            cardFooter={card.cardFooter}
            className="hover:shadow-xl transition-shadow duration-300"
          />
        ))}
      </div>
    </section>
  );
}
