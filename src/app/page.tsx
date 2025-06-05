import AppSidebar from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import invoiceData from "./invoice-data.json";
import { ChartBarInteractive } from "@/components/chart-bar-interactive";

export default function Page() {
  const totalSuccess = invoiceData.filter(
    (t) => t.run_status === "Completed"
  ).length;
  const totalFailed = invoiceData.filter((t) =>
    t.run_status.includes("Failed")
  ).length;
  const partialSuccess = invoiceData.filter(
    (t) => t.run_status === "Partial Success"
  ).length;
  const overallFiles = invoiceData.reduce(
    (sum, item) => sum + item.total_attachments_in_run,
    0
  );

  const chartData = invoiceData
    .slice()
    .sort(
      (a, b) =>
        new Date(a.run_start_time).getTime() -
        new Date(b.run_start_time).getTime()
    )
    .map((item) => ({
      date: item.run_start_time,
      Success: item.files_successfully_processed,
      Failed: item.files_failed_processing,
      "Partial Success":
        item.run_status === "Partial Success"
          ? item.total_attachments_in_run -
            (item.files_successfully_processed + item.files_failed_processing)
          : 0,
    }));

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards
                totalSuccess={totalSuccess}
                totalFailed={totalFailed}
                partialSuccess={partialSuccess}
                overallFiles={overallFiles}
              />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={chartData} />
                <ChartBarInteractive data={chartData} />
              </div>
              <DataTable data={invoiceData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
