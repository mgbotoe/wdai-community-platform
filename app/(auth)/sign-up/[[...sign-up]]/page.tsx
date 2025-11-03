import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wdai-navy">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-wdai-navy-medium shadow-card-hover',
              headerTitle: 'text-wdai-text-white',
              headerSubtitle: 'text-wdai-text-light',
              socialButtonsBlockButton: 'bg-wdai-navy-light text-wdai-text-white border-wdai-border-light hover:bg-wdai-pink',
              formButtonPrimary: 'bg-wdai-pink hover:bg-wdai-pink-hover',
              formFieldLabel: 'text-wdai-text-light',
              formFieldInput: 'bg-wdai-navy-light border-wdai-border-light text-wdai-text-white',
              footerActionLink: 'text-wdai-pink hover:text-wdai-pink-light',
            },
          }}
        />
      </div>
    </div>
  )
}
