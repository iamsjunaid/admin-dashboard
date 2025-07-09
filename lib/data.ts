export type Listing = {
  id: string;
  title: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
};

export type AuditLog = {
  id: string;
  admin: string;
  action: "approved" | "rejected" | "edited";
  listingId: string;
  timestamp: string;
};

// Mock data for listings
export const listings: Listing[] = [
  {
    id: "1",
    title: "Hyundai i20",
    price: 3500,
    status: "pending",
    submittedBy: "user123",
  },
  {
    id: "2",
    title: "Maruti Swift",
    price: 3000,
    status: "approved",
    submittedBy: "user456",
  },
  {
    id: "3",
    title: "Honda City",
    price: 4500,
    status: "rejected",
    submittedBy: "user789",
  },
];

// Mock data for audit logs
export const auditLogs: AuditLog[] = [];
