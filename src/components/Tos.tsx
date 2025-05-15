// app/terms/page.tsx
export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-lg mt-16 mb-28 text-gray-900 scroll-smooth">
      <h1 className="text-6xl font-extrabold text-orange-600 mb-10 text-center tracking-tight">
        Terms of Service
      </h1>

      <section className="mb-12 text-lg leading-relaxed space-y-6">
        <p>
          Welcome to <strong>Sign Sneaky</strong>, a snake game developed by <strong>Athex Web3</strong>.
          By accessing or using our game, you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          1. Eligibility
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          This game is open to users of all ages. However, users under the applicable legal age should
          get parental or guardian consent before using this game.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          2. Account & Authentication
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          We use <strong>Clerk</strong> for authentication. By signing in with Google,
          you agree to Clerk's terms and Google's authentication policies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          3. Game Usage
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Sign Sneaky is a free game. There are no advertisements, in-app purchases, or premium features.
          Your game score (gamePoints) is recorded using Clerk’s unsafe metadata and displayed on the leaderboard.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          4. Leaderboard API
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-3">
          We provide leaderboard data through our backend API at:
        </p>
        <code className="block bg-gray-100 p-4 rounded-md text-orange-600 font-mono break-words mb-4 select-all">
          https://sign-sneaky.onrender.com/api/leaderboard
        </code>
        <p className="text-gray-600 text-sm italic">
          This data is public and based on authenticated user profiles.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          5. Termination
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          We reserve the right to suspend or terminate access if any misuse or suspicious activity is detected.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 border-l-4 border-orange-400 pl-4">
          6. Contact
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 space-y-2">
          For support or questions, contact us at:
          <br />
          📧{' '}
          <a
            href="mailto:athexgamingbd@gmail.com"
            className="text-orange-600 hover:text-orange-700 hover:underline transition"
          >
            athexgamingbd@gmail.com
          </a>
          <br />
          🐦{' '}
          <a
            href="https://x.com/athex_web3"
            target="_blank"
            rel="noreferrer"
            className="text-orange-600 hover:text-orange-700 hover:underline transition"
          >
            @athex_web3
          </a>
        </p>
      </section>

      <footer className="mt-20 text-center text-sm text-gray-400 select-none">
        Last updated: May 15, 2025
      </footer>
    </main>
  );
}
