// lib/apiService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || "http://localhost:8000";
const API_KEY = process.env.NEXT_PUBLIC_LNIP_API_KEY; // Set in your .env.local

export async function fetchInvoiceLogs(params: Record<string, any> = {}) {
  const url = new URL(`${API_BASE_URL}/api/invoice-logs`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.append(key, value);
  });

  const res = await fetch(url.toString(), {
    headers: {
      "X-API-KEY": API_KEY || "",
    },
    cache: 'no-store', // disables caching
  });

  if (!res.ok) {
    throw new Error(`Error fetching invoice logs: ${res.statusText}`);
  }
  return res.json();
}
export async function fetchInvoiceLogById(id: string) {
  const url = `${API_BASE_URL}/api/invoice-logs/${id}`;
  const res = await fetch(url, {
    headers: {
      "X-API-KEY": API_KEY || "",
    },
    cache: 'no-store', // disables caching
  });

  if (!res.ok) {
    throw new Error(`Error fetching invoice log with ID ${id}: ${res.statusText}`);
  }
  return res.json();
}
