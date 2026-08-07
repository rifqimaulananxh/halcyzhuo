"use client";

import { useId, useState } from "react";

export type ValueItem = {
  num: string;
  title: string;
  desc: string;
};

export function ValuesAccordion({
  items,
}: {
  items: readonly ValueItem[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const id = useId();

  return (
    <div className="about-values__list">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;

        return (
          <div className={`about-value ${isOpen ? "is-open" : ""}`} key={item.num}>
            <button
              type="button"
              className="about-value__trigger"
              aria-expanded={isOpen}
              aria-controls={`${id}-value-${index}`}
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <span className="about-value__num">{item.num}</span>
              <span className="about-value__title">{item.title}</span>
              <span className="about-value__icon" aria-hidden="true">
                +
              </span>
            </button>
            <div
              id={`${id}-value-${index}`}
              className="about-value__details"
              aria-hidden={!isOpen}
            >
              <div>
                <p>{item.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
