"use client";

import { DemoLayout } from "@/components/demo/DemoLayout";

export default function Home() {
  const licenseKey = process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY!;

  return <DemoLayout licenseKey={licenseKey} />;
}