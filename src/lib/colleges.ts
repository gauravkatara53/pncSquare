export interface College {
  id: string;
  name: string;
  location: string;
  ranking: number;
  description: string;
  courses: string[];
  coverImage: string;
  logo: string;
}

export const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi, Delhi",
    rating: 4.8,
    reviews: 1250,
    image:
      "https://images.unsplash.com/photo-1658133134704-121129a67c73?auto=format&fit=crop&w=1080&q=80",
    type: "Public Technical",
    fees: "₹2.5 L",
    placement: "₹19.2 L",
    cutoff: "JEE Adv 63",
    rank: "1",
  },
  {
    name: "All India Institute of Medical Sciences",
    location: "New Delhi, Delhi",
    rating: 4.9,
    reviews: 980,
    image:
      "https://images.unsplash.com/photo-1658133134704-121129a67c73?auto=format&fit=crop&w=1080&q=80",
    type: "Public Medical",
    fees: "₹1.4 L",
    placement: "₹12.5 L",
    cutoff: "NEET 720",
    rank: "1",
  },
  {
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    rating: 4.7,
    reviews: 850,
    image:
      "https://images.unsplash.com/photo-1658133134704-121129a67c73?auto=format&fit=crop&w=1080&q=80",
    type: "Public Management",
    fees: "₹25 L",
    placement: "₹34.3 L",
    cutoff: "CAT 99.5%",
    rank: "1",
  },
];
