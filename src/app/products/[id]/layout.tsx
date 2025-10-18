import React from "react";

export default function ProductIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-[136px] bg-white">{children}</div>;
}
