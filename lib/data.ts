// Mock data for the admin dashboard
export type Listing = {
  id: string;
  title: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
};

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
