// src/lib/types.ts

export interface InvoiceItem {
    item_code?: string | null;
    description?: string | null;
    unit_price?: string | null;
    quantity?: string | null;
    subtotal?: string | null;
}

export interface InvoiceFields {
    invoice_number?: string | null;
    invoice_date?: string | null;
    purchase_order?: string | null;
    subtotal?: string | null;
    total?: string | null;
    currency?: string | null;
    vendor?: string | null;
    payment_terms?: string | null;
    vat_registration_number?: string | null;
    organisation_number?: string | null;
    iban?: string | null;
    discount?: string | null;
    packing_slip_number?: string | null;
    other_charges?: string | null;
    charges_descriptions?: string | null;
    invoice_type?: string | null;
    bban?: string | null;
    discount_description?: string | null;
}

export interface ProcessedFile {
    id: string;
    file_name: string;
    bod_id?: string | null;
    bod_status?: string | null;
    doc_added_to_idm?: boolean | null;
    notification_sent?: boolean | null;
    idp_status?: string | null;
    idp_response_code?: number | null;
    fields?: InvoiceFields | null;
    items: InvoiceItem[];
    file_status: string;
    raw_content_snippet?: string | null;
    errors: string[];
}

export interface TransactionRun {
    transaction_id: string;
    source_log_file: string;
    run_start_time?: string | null;
    run_end_time?: string | null;
    email_response_status_code?: string | null;
    total_email_count?: string | null;
    subject?: string | null;
    files_processed: ProcessedFile[];
    total_attachments_in_run: number;
    files_successfully_processed: number;
    files_failed_processing: number;
    run_status: string;
    applied_rules: any[]; // You can define a more specific type for rules
}

export interface Rule {
    rule_id: string;
    name: string;
    description?: string | null;
    target_entity: string;
    field_to_check: string;
    condition: string;
    value_to_match?: any | null;
    action: string;
    is_active: boolean;
}