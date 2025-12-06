// app/[lang]/@rightStatic/(_PRICE_LIST)/price-list/layout.tsx

import type { JSX, ReactNode } from "react";

type PriceListLayoutProps = {
  children: ReactNode;
};

type PriceListLayoutMode = "scroll" | "fixed";

const LAYOUT_MODE: PriceListLayoutMode = "scroll";

export default function PriceListLayout(
  props: PriceListLayoutProps,
): JSX.Element {
  const { children } = props;

  if (LAYOUT_MODE === "fixed") {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background">
        <main className="flex-1 min-h-0 overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <main className="flex-1 min-h-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
