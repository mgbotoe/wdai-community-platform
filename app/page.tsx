import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header with Auth */}
      <header className="p-4 flex justify-between items-center">
        <h2 className="text-h3 font-bold text-wdai-pink">WDAI</h2>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-button text-wdai-text-light hover:text-wdai-pink">
                Sign In
              </button>
            </SignInButton>
            <Link href="/sign-up">
              <button className="px-6 py-3 bg-wdai-pink rounded-lg text-button text-white hover:bg-wdai-pink-hover">
                Join Now
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <button className="px-4 py-2 text-button text-wdai-text-light hover:text-wdai-pink">
                Dashboard
              </button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-h1 font-bold text-wdai-pink">
            Women Defining AI
          </h1>
          <p className="text-body-lg text-wdai-text-light max-w-2xl mx-auto">
            A community platform empowering women and non-binary individuals in AI
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <SignedOut>
              <Link href="/sign-up">
                <button className="px-6 py-3 bg-wdai-pink rounded-lg text-button text-white hover:bg-wdai-pink-hover">
                  Join Now
                </button>
              </Link>
              <Link href="/pricing">
                <button className="px-6 py-3 border border-wdai-border-light rounded-lg text-button text-wdai-text-light hover:border-wdai-pink hover:text-wdai-pink">
                  Learn More
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <button className="px-6 py-3 bg-wdai-pink rounded-lg text-button text-white hover:bg-wdai-pink-hover">
                  Go to Dashboard
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </main>
  )
}
