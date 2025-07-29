import React from "react";
import { LoaderOne } from "@/components/ui/loader";

// In your loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderOne />
    </div>
  );
}
