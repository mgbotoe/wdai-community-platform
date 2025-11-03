export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-h1 font-bold text-wdai-pink">
          Women Defining AI
        </h1>
        <p className="text-body-lg text-wdai-text-light max-w-2xl mx-auto">
          A community platform empowering women and non-binary individuals in AI
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <div className="px-6 py-3 bg-wdai-pink rounded-lg text-button text-white">
            Join Now
          </div>
          <div className="px-6 py-3 border border-wdai-border-light rounded-lg text-button text-wdai-text-light">
            Learn More
          </div>
        </div>
      </div>
    </main>
  )
}
