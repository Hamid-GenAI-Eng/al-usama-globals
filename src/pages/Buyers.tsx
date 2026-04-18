import ContactsList, { Contact } from "@/components/crm/ContactsList";

const buyers: Contact[] = [
  { id: "BUY-2087", name: "Al-Usama Global Trading LLC", country: "United Arab Emirates", city: "Dubai", contact: "Captain Usama", email: "ops@al-usama.ae", taxId: "AE-100123456789003", totalVolume: "$3.2M", activeShipments: 4, paymentStatus: "PAID", tier: "PLATINUM" },
  { id: "BUY-2074", name: "London Premier Imports Ltd", country: "United Kingdom", city: "London", contact: "James Hartley", email: "j.hartley@lpi.co.uk", taxId: "GB-924871632", totalVolume: "$1.5M", activeShipments: 2, paymentStatus: "PAID", tier: "GOLD" },
  { id: "BUY-2061", name: "Singapore Trade Hub Pte", country: "Singapore", city: "Singapore", contact: "Lee Wei Ming", email: "lee@sgtradehub.sg", taxId: "SG-201938472K", totalVolume: "$980K", activeShipments: 1, paymentStatus: "PARTIAL", tier: "GOLD" },
  { id: "BUY-2048", name: "JFK Cargo Distributors", country: "United States", city: "New York", contact: "Sarah Jenkins", email: "sarah@jfkcargo.us", taxId: "US-86-1234567", totalVolume: "$720K", activeShipments: 1, paymentStatus: "PAID", tier: "SILVER" },
  { id: "BUY-2031", name: "Rotterdam Gateway BV", country: "Netherlands", city: "Rotterdam", contact: "Pieter de Vries", email: "p.devries@rgbv.nl", taxId: "NL-820394851B01", totalVolume: "$305K", activeShipments: 0, paymentStatus: "OVERDUE", tier: "STANDARD" },
];

const Buyers = () => <ContactsList kind="buyer" contacts={buyers} />;
export default Buyers;
