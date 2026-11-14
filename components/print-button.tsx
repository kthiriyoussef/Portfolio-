"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return <button className="button-primary" onClick={() => window.print()} type="button"><Printer size={14} /> Print / Save as PDF</button>;
}
