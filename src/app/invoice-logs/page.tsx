// app/invoice-logs/page.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchInvoiceLogs } from "@/lib/api";

export default function InvoiceLogsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchInvoiceLogs({ limit: 10 })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Invoice Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Run Status</th>
              <th className="border px-2 py-1">Start Time</th>
              <th className="border px-2 py-1">Attachments</th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr key={log.transaction_id}>
                <td className="border px-2 py-1">{log.transaction_id}</td>
                <td className="border px-2 py-1">{log.subject}</td>
                <td className="border px-2 py-1">{log.run_status}</td>
                <td className="border px-2 py-1">{log.run_start_time}</td>
                <td className="border px-2 py-1">
                  {log.total_attachments_in_run}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
