import {
  AlertTriangle,
  BarChart3,
  ClipboardList,
  DollarSign,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../../components/common'
import { adminStats, monthlySales } from '../../data/adminData'

function SalesChart() {
  const maximumSales = Math.max(
    ...monthlySales.map((item) => item.sales),
  )

  return (
    <div className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-brand-primary">
            Monthly Sales
          </h2>

          <p className="mt-1 text-sm text-brand-muted">
            Demonstration sales data
          </p>
        </div>

        <BarChart3
          size={24}
          className="text-brand-secondary"
          aria-hidden="true"
        />
      </div>

      <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
        {monthlySales.map((item) => {
          const height = Math.max(
            8,
            (item.sales / maximumSales) * 100,
          )

          return (
            <div
              key={item.month}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <span className="text-[10px] text-brand-muted sm:text-xs">
                ৳{Math.round(item.sales / 1000)}k
              </span>

              <div className="flex h-48 w-full items-end rounded-t-lg bg-brand-background">
                <div
                  className="w-full rounded-t-lg bg-brand-primary transition hover:bg-brand-secondary"
                  style={{ height: `${height}%` }}
                  title={`${item.month}: ৳${item.sales}`}
                />
              </div>

              <span className="text-xs font-semibold text-brand-muted">
                {item.month}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AdminOverview() {
  const statCards = [
    {
      label: 'Total Revenue',
      value: `৳${adminStats.totalRevenue.toLocaleString('en-BD')}`,
      icon: DollarSign,
      path: '/admin/orders',
    },
    {
      label: 'Total Orders',
      value: adminStats.totalOrders,
      icon: ClipboardList,
      path: '/admin/orders',
    },
    {
      label: 'Total Customers',
      value: adminStats.totalCustomers,
      icon: Users,
      path: '/admin/users',
    },
    {
      label: 'Low Stock Products',
      value: adminStats.lowStockProducts,
      icon: AlertTriangle,
      path: '/admin/products',
    },
  ]

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Dashboard Overview"
        title="Store Performance"
        description="Monitor key store statistics and recent activity."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon

          return (
            <Link
              key={stat.label}
              to={stat.path}
              className="rounded-2xl border border-brand-secondary/15 bg-brand-surface p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-xl bg-brand-primary/10 p-3 text-brand-primary">
                  <Icon size={21} aria-hidden="true" />
                </div>

                <p className="text-2xl font-bold text-brand-primary">
                  {stat.value}
                </p>
              </div>

              <p className="mt-5 text-sm font-semibold text-brand-text">
                {stat.label}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-6">
        <SalesChart />
      </div>

      <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
        <p className="font-semibold text-yellow-800">
          Frontend-only admin notice
        </p>

        <p className="mt-2 text-sm leading-6 text-yellow-700">
          These statistics and management actions are local demonstrations. A production backend must verify Firebase ID tokens and enforce admin permissions server-side.
        </p>
      </div>
    </div>
  )
}

export default AdminOverview
