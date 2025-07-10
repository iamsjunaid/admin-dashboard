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
export const listings: Listing[] = [];

// loop through the listings and create mock data
for (let i = 1; i <= 20; i++) {
  listings.push({
    id: i.toString(),
    title: `Listing ${i}`,
    price: Math.floor(Math.random() * 10000) + 1000,
    status: i % 3 === 0 ? "approved" : i % 3 === 1 ? "pending" : "rejected",
    submittedBy: `user${i}`,
  });
}

// Mock data for audit logs
export const auditLogs: AuditLog[] = [];
