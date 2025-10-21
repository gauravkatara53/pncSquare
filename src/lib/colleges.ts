export interface College {
  id: string;
  name: string;
  location: string;
  type: string; // e.g., "Public Technical"
  rank: string; // string to allow "1", "2", etc.
  rating: number; // e.g., 4.8
  reviews: number; // e.g., 1250
  fees: string; // e.g., "₹2.5 L"
  placement: string; // e.g., "₹19.2 L"
  cutoff: string; // e.g., "JEE Adv 63"
  image: string; // cover image
  route: string; // link to details page
}

export const colleges: College[] = [
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    type: "Public Technical",
    rank: "2",
    rating: 4.8,
    reviews: 1250,
    fees: "₹9.14 L",
    placement: "₹17.5 L",
    cutoff: "JEE Adv 126(cse)",
    image:
      "https://www.pncsquare.in/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fak2ol9uti%2FPNC-MANUL%2Fimage.png%3Fik-obj-version%3DEcw1DgzBUSwLUALC94nr4GCWqdCYwVVG%26updatedAt%3D1756747616064&w=1920&q=75",
    route: "/college/iit-delhi",
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    type: "Public Medical",
    rank: "1",
    rating: 4.9,
    reviews: 980,
    fees: "₹1.4 L",
    placement: "₹12.5 L",
    cutoff: "NEET 720",
    image:
      "https://static.theprint.in/wp-content/uploads/2020/07/AIIMS-2-696x410.jpg?compress=true&quality=80&w=800&dpr=2",
    route: "/college/aiims-delhi",
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management ",
    location: "Ahmedabad, Gujarat",
    type: "Public Management",
    rank: "1",
    rating: 4.7,
    reviews: 850,
    fees: "₹25 L",
    placement: "₹34.3 L",
    cutoff: "CAT 99.5%",
    image:
      "https://static.theprint.in/wp-content/uploads/2023/07/Untitled-design-2023-07-03T191-696x392.png?compress=true&quality=80&w=800&dpr=20",
    route: "/college/iim-ahmedabad",
  },
];
