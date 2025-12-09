// @/app/(lang)/@left/(_ARTIFACT)/artifact/layout.tsx
import type { JSX, ReactNode } from "react";

type ArtifactLayoutProps = {
  children: ReactNode;
};

type ArtifactLayoutMode = "scroll" | "fixed";

const LAYOUT_MODE: ArtifactLayoutMode = "scroll";

export default function ArtifactLayout(
  props: ArtifactLayoutProps,
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
  )
}
