import React from "react";

export default function AdminInventoryPage() {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] p-8">
      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text drop-shadow-lg">
        Inventory Management
      </h1>
      <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mb-8">
        Monitor your organization’s inventory health in real time. Track stock levels, expiry dates, spoilage, and ethical sourcing tags. Upload and verify certifications (like Khadi or Govt. docs) to ensure compliance and transparency. Color-coded indicators help you quickly spot issues and take action for a more sustainable operation.
      </p>
      {/* Inventory Table/Module Placeholder */}
      <div className="rounded-xl bg-[var(--card)] border border-[var(--border)] p-8 shadow-lg flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-xl text-[var(--muted-foreground)]">Inventory table and controls coming soon...</span>
      </div>
    </div>
  );
} 