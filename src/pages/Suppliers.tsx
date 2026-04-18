import ContactsList, { Contact } from "@/components/crm/ContactsList";

const suppliers: Contact[] = [
  { id: "SUP-1042", name: "Shanghai Heavy Industries Co. Ltd", country: "China", city: "Shanghai", contact: "Mr. Wang Liu", email: "wang.liu@shi-china.com", taxId: "CN-91310115MA1H", totalVolume: "$2.4M", activeShipments: 3, paymentStatus: "PAID", tier: "PLATINUM" },
  { id: "SUP-1038", name: "Bavaria Steelworks GmbH", country: "Germany", city: "Munich", contact: "Hans Müller", email: "h.muller@bavaria-steel.de", taxId: "DE-815947231", totalVolume: "$1.8M", activeShipments: 2, paymentStatus: "PAID", tier: "GOLD" },
  { id: "SUP-1029", name: "Karachi Textile Mills Ltd", country: "Pakistan", city: "Karachi", contact: "Imran Sheikh", email: "imran@ktm.com.pk", taxId: "PK-3421-9876", totalVolume: "$640K", activeShipments: 1, paymentStatus: "PARTIAL", tier: "SILVER" },
  { id: "SUP-1015", name: "Vietnam Coffee Exporters", country: "Vietnam", city: "Ho Chi Minh", contact: "Nguyen Van Anh", email: "nva@vncoffee.vn", taxId: "VN-0312456789", totalVolume: "$420K", activeShipments: 0, paymentStatus: "PAID", tier: "STANDARD" },
  { id: "SUP-1003", name: "Mumbai Spice Traders", country: "India", city: "Mumbai", contact: "Rajesh Patel", email: "r.patel@mumbaispice.in", taxId: "IN-AABCM2837F", totalVolume: "$185K", activeShipments: 1, paymentStatus: "OVERDUE", tier: "STANDARD" },
];

const Suppliers = () => <ContactsList kind="supplier" contacts={suppliers} />;
export default Suppliers;
