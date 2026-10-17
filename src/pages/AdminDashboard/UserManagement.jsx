import { useState } from 'react'
import { Badge, SectionHeading } from '../../components/common'
import { adminUsers as initialUsers } from '../../data/adminData'

function UserManagement() {
  const [users, setUsers] = useState(initialUsers)

  const toggleUserStatus = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                user.status === 'Active'
                  ? 'Suspended'
                  : 'Active',
            }
          : user,
      ),
    )
  }

  return (
    <div>
      <SectionHeading
        align="left"
        eyebrow="Customer Accounts"
        title="User Management"
        description="Review mock customer accounts and account status."
      />

      <div className="overflow-x-auto rounded-2xl border border-brand-secondary/15 bg-brand-surface shadow-sm">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-brand-background text-brand-muted">
            <tr>
              <th className="px-5 py-4 font-semibold">
                Name
              </th>
              <th className="px-5 py-4 font-semibold">
                Email
              </th>
              <th className="px-5 py-4 font-semibold">
                Role
              </th>
              <th className="px-5 py-4 font-semibold">
                Joined
              </th>
              <th className="px-5 py-4 font-semibold">
                Status
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-brand-secondary/10"
              >
                <td className="px-5 py-4 font-semibold text-brand-primary">
                  {user.name}
                </td>

                <td className="px-5 py-4 text-brand-muted">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <Badge
                    variant={
                      user.role === 'Admin'
                        ? 'primary'
                        : 'neutral'
                    }
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="px-5 py-4 text-brand-muted">
                  {user.joinedAt}
                </td>

                <td className="px-5 py-4">
                  <Badge
                    variant={
                      user.status === 'Active'
                        ? 'success'
                        : 'danger'
                    }
                  >
                    {user.status}
                  </Badge>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => toggleUserStatus(user.id)}
                    className="text-sm font-semibold text-brand-secondary hover:text-brand-primary"
                  >
                    {user.status === 'Active'
                      ? 'Suspend'
                      : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
