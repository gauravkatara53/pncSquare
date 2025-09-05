export interface College {
  id: string;
  name: string;
  location: string;
  ranking: number;
  description: string;
  courses: string[];
  coverImage: string;
  logo: string;
  route: string;
}

export const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    rating: 4.8,
    reviews: 1250,
    image:
      "https://www.pncsquare.in/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Fak2ol9uti%2FPNC-MANUL%2Fimage.png%3Fik-obj-version%3DEcw1DgzBUSwLUALC94nr4GCWqdCYwVVG%26updatedAt%3D1756747616064&w=1920&q=75",
    type: "Public Technical",
    fees: "₹2.5 L",
    placement: "₹19.2 L",
    cutoff: "JEE Adv 63",
    rank: "1",
    route: "/college/iit-delhi",
  },
  {
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    rating: 4.9,
    reviews: 980,
    image:
      "https://static.theprint.in/wp-content/uploads/2020/07/AIIMS-2-696x410.jpg?compress=true&quality=80&w=800&dpr=2",
    type: "Public Medical",
    fees: "₹1.4 L",
    placement: "₹12.5 L",
    cutoff: "NEET 720",
    rank: "1",
    route: "/college/aiims-delhi",
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    rating: 4.7,
    reviews: 850,
    image:
      "https://static.theprint.in/wp-content/uploads/2023/07/Untitled-design-2023-07-03T191-696x392.png?compress=true&quality=80&w=800&dpr=20",
    type: "Public Management",
    fees: "₹25 L",
    placement: "₹34.3 L",
    cutoff: "CAT 99.5%",
    rank: "1",
    route: "/college/iim-ahmedabad",
  },
];
