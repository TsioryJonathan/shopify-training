"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function page() {
  const { id } = useParams();
  alert(id);
  return <div>page</div>;
}
