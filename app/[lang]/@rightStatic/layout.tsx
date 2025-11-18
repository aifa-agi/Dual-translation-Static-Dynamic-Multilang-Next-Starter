// app/[lang]/@rightStatic/layout.tsx

import React from "react";

interface RightLayoutProps {
  children: React.ReactNode;
}

export default async function RightStaticLayout({
  children,
}: RightLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}

