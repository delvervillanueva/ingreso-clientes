export interface CustomerSearchPayload {
  dni: string;
  branchId: string;
}

export interface CustomerSearchResult {
  found: boolean;
  customerName?: string;
  creditApproved?: boolean;
}
