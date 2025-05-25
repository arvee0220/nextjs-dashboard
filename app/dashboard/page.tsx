import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "../ui/fonts";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "@/app/lib/data";
import { Card } from "@/app/ui/dashboard/cards";

interface CardData {
    title: string;
    value: string | number;
    type: "collected" | "pending" | "invoices" | "customers";
}

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();

    const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData();

    const invoiceData: CardData[] = [
        {
            title: "Collected",
            value: totalPaidInvoices,
            type: "collected"
        },
        {
            title: "Pending",
            value: totalPendingInvoices,
            type: "pending"
        },
        {
            title: "Total Invoices",
            value: numberOfInvoices,
            type: "invoices"
        },
        {
            title: "Total Customers",
            value: numberOfCustomers,
            type: "customers"
        }
    ];

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {invoiceData.map(({ title, value, type }, idx) => (
                    <Card title={title} value={value} type={type} />
                ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue} />
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    );
}
