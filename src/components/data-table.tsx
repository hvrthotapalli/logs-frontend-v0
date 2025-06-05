"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { z } from "zod";
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconMinus,
  IconDotsVertical,
} from "@tabler/icons-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const fileProcessedSchema = z.object({
  id: z.string(),
  file_name: z.string(),
  bod_id: z.string().nullable(),
  bod_status: z.string().nullable(),
  doc_added_to_idm: z.boolean(),
  notification_sent: z.boolean(),
  idp_status: z.string().nullable(),
  idp_response_code: z.union([z.string(), z.number()]).nullable(),
  fields: z.record(z.string(), z.any()).nullable(),
  items: z.array(z.record(z.string(), z.any())),
  file_status: z.string(),
  raw_content_snippet: z.string().optional(),
  errors: z.array(z.string()),
});

export const invoiceDataSchema = z.object({
  transaction_id: z.string(),
  source_log_file: z.string(),
  run_start_time: z.string(),
  run_end_time: z.string().nullable(),
  email_response_status_code: z.string().nullable(),
  total_email_count: z.string().nullable(),
  subject: z.string(),
  files_processed: z.array(fileProcessedSchema),
  total_attachments_in_run: z.number(),
  files_successfully_processed: z.number(),
  files_failed_processing: z.number(),
  run_status: z.string(),
  applied_rules: z
    .array(
      z.object({
        rule_id: z.string().optional(),
        rule_name: z.string().optional(),
        action: z.string().optional(),
        matched_field: z.string().optional(),
        matched_value: z.string().optional(),
        context: z.string().optional(),
      })
    )
    .optional(),
});

export type InvoiceData = z.infer<typeof invoiceDataSchema>;

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-300 text-black";
  let Icon = IconMinus;
  if (status === "Completed") {
    color = "bg-green-500 text-white";
    Icon = IconCheck;
  } else if (status.includes("Failed")) {
    color = "bg-red-500 text-white";
    Icon = IconX;
  } else if (status === "Partial Success") {
    color = "bg-amber-500 text-white";
    Icon = IconAlertTriangle;
  }
  return (
    <Badge className={color} variant="default">
      <Icon className="mr-1 size-4" /> {status}
    </Badge>
  );
}

function TransactionDrawer({ item }: { item: InvoiceData }) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="px-0 text-left">
          {item.transaction_id}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>
            Transaction Details - ID: {item.transaction_id}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div>
            <span className="font-medium">Subject:</span> {item.subject}
          </div>
          <div>
            <span className="font-medium">Run Status:</span> {item.run_status}
          </div>
          <div>
            <span className="font-medium">Run Start Time:</span>{" "}
            {new Date(item.run_start_time).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Run End Time:</span>{" "}
            {item.run_end_time
              ? new Date(item.run_end_time).toLocaleString()
              : "N/A"}
          </div>
          <div>
            <span className="font-medium">Email Response Status Code:</span>{" "}
            {item.email_response_status_code || "N/A"}
          </div>
          <div>
            <span className="font-medium">Total Email Count:</span>{" "}
            {item.total_email_count || "N/A"}
          </div>
          <div>
            <span className="font-medium">Source Log File:</span>{" "}
            {item.source_log_file}
          </div>
          <div>
            <span className="font-medium">Total Attachments in Run:</span>{" "}
            {item.total_attachments_in_run}
          </div>
          <div>
            <span className="font-medium">Files Successfully Processed:</span>{" "}
            {item.files_successfully_processed}
          </div>
          <div>
            <span className="font-medium">Files Failed Processing:</span>{" "}
            {item.files_failed_processing}
          </div>
          {item.applied_rules && item.applied_rules.length > 0 && (
            <div className="space-y-2">
              <Separator />
              <div className="font-medium">Applied Rules</div>
              {item.applied_rules.map((rule, idx) => (
                <div key={idx} className="pl-2">
                  <div>
                    <span className="font-medium">Rule:</span> {rule.rule_name}
                  </div>
                  {rule.action && (
                    <div>
                      <span className="font-medium">Action:</span> {rule.action}
                    </div>
                  )}
                  {rule.context && (
                    <div>
                      <span className="font-medium">Context:</span> {rule.context}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {item.files_processed.length > 0 && (
            <div className="space-y-2">
              <Separator />
              <div className="font-medium">Files Processed</div>
              {item.files_processed.map((file) => (
                <div key={file.id} className="border p-2 rounded-md space-y-1">
                  <div className="font-medium">{file.file_name}</div>
                  <div>
                    <span className="font-medium">File Status:</span> {file.file_status}
                  </div>
                  <div>
                    <span className="font-medium">BOD ID:</span>{" "}
                    {file.bod_id || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">BOD Status:</span>{" "}
                    {file.bod_status || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">IDP Status:</span> {file.idp_status || "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Doc Added to IDM:</span>{" "}
                    {file.doc_added_to_idm ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-medium">Notification Sent:</span>{" "}
                    {file.notification_sent ? "Yes" : "No"}
                  </div>
                  {file.fields && (
                    <div>
                      <span className="font-medium">Fields:</span>
                      <pre className="whitespace-pre-wrap text-xs">
{JSON.stringify(file.fields, null, 2)}
</pre>
                    </div>
                  )}
                  {file.items.length > 0 && (
                    <div>
                      <span className="font-medium">Items:</span>
                      <pre className="whitespace-pre-wrap text-xs">
{JSON.stringify(file.items, null, 2)}
</pre>
                    </div>
                  )}
                  {file.errors.length > 0 && (
                    <div>
                      <span className="font-medium">Errors:</span>
                      <ul className="list-disc pl-4">
                        {file.errors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <DrawerFooter>
          <Button onClick={() => console.log("view", item.transaction_id)}>
            View Details
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const columns: ColumnDef<InvoiceData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "transaction_id",
    header: "Transaction ID",
    cell: ({ row }) => <TransactionDrawer item={row.original} />,
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "run_status",
    header: "Run Status",
    cell: ({ row }) => <StatusBadge status={row.original.run_status} />,
  },
  {
    accessorKey: "total_attachments_in_run",
    header: () => <div className="text-center">Total Attachments</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.total_attachments_in_run}
      </div>
    ),
  },
  {
    accessorKey: "files_successfully_processed",
    header: () => <div className="text-center">Success</div>,
    cell: ({ row }) => (
      <div className="text-green-600 text-center">
        {row.original.files_successfully_processed}
      </div>
    ),
  },
  {
    accessorKey: "files_failed_processing",
    header: () => <div className="text-center">Failed</div>,
    cell: ({ row }) => (
      <div className="text-red-600 text-center">
        {row.original.files_failed_processing}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <Button variant="ghost" size="icon">
        <IconDotsVertical />
      </Button>
    ),
  },
];

export function DataTable({ data }: { data: InvoiceData[] }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, sorting },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function DataTableSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="h-8 w-full animate-pulse rounded-lg bg-muted" />
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {Array.from({ length: 7 }).map((_, index) => (
                <TableHead key={index} className="h-8 w-32" />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 7 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex} className="h-8 w-32" />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
