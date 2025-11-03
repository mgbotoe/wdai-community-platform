import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <div className="min-h-screen bg-wdai-navy p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-h1 font-bold text-wdai-pink mb-2">
              Welcome, {user?.firstName || 'Member'}!
            </h1>
            <p className="text-body text-wdai-text-light">
              Member Dashboard
            </p>
          </div>
          <Link href="/">
            <button className="px-4 py-2 text-button text-wdai-text-light hover:text-wdai-pink">
              ← Back to Home
            </button>
          </Link>
        </header>

        {/* User Info Card */}
        <div className="bg-wdai-navy-medium rounded-card p-6 shadow-card mb-6">
          <h2 className="text-h3 font-semibold text-wdai-text-white mb-4">
            Your Profile
          </h2>
          <div className="space-y-2 text-body text-wdai-text-light">
            <p><span className="font-semibold">Email:</span> {user?.emailAddresses[0]?.emailAddress}</p>
            <p><span className="font-semibold">User ID:</span> {user?.id}</p>
            <p><span className="font-semibold">Account Created:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-wdai-navy-medium rounded-card p-6 shadow-card hover:shadow-card-hover transition-card">
            <h3 className="text-label text-wdai-text-white mb-2">Member Directory</h3>
            <p className="text-body-sm text-wdai-text-light mb-4">
              Browse our community members
            </p>
            <button className="text-button-sm text-wdai-pink hover:text-wdai-pink-light">
              Coming Soon →
            </button>
          </div>

          <div className="bg-wdai-navy-medium rounded-card p-6 shadow-card hover:shadow-card-hover transition-card">
            <h3 className="text-label text-wdai-text-white mb-2">Resources</h3>
            <p className="text-body-sm text-wdai-text-light mb-4">
              Access exclusive content
            </p>
            <button className="text-button-sm text-wdai-pink hover:text-wdai-pink-light">
              Coming Soon →
            </button>
          </div>

          <div className="bg-wdai-navy-medium rounded-card p-6 shadow-card hover:shadow-card-hover transition-card">
            <h3 className="text-label text-wdai-text-white mb-2">Events</h3>
            <p className="text-body-sm text-wdai-text-light mb-4">
              RSVP to upcoming events
            </p>
            <button className="text-button-sm text-wdai-pink hover:text-wdai-pink-light">
              Coming Soon →
            </button>
          </div>
        </div>

        {/* Authentication Status */}
        <div className="mt-8 p-4 bg-wdai-turquoise-dark rounded-card">
          <p className="text-body-sm text-wdai-text-white">
            ✅ <span className="font-semibold">Authentication Working!</span> You're seeing this protected page because you're signed in.
          </p>
        </div>
      </div>
    </div>
  )
}
