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

export const listings: Listing[] = [];

for (let i = 1; i <= 20; i++) {
  listings.push({
    id: i.toString(),
    title: `Listing ${i}`,
    price: Math.floor(Math.random() * 10000) + 1000,
    status: i % 3 === 0 ? "approved" : i % 3 === 1 ? "pending" : "rejected",
    submittedBy: `user${i}`,
  });
}
