export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl sm:max-w-[90%] mx-auto p-10 bg-white rounded-xl shadow-lg mt-16 mb-28 text-gray-900 scroll-smooth overflow-y-auto">

      <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-600 mb-12 text-center tracking-tight">
        Privacy Policy
      </h1>

      <section className="mb-12 text-lg sm:text-xl leading-relaxed space-y-6">
        <p>
          This Privacy Policy explains how <strong>Sign Sneaky</strong>, developed by <strong>Athex Web3</strong>, collects,
          uses, and protects user information.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          1. Information We Collect
        </h2>
        <p className="mb-6 text-gray-700">
          When you sign in with Google via Clerk, we collect the following public profile information:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Your display name</li>
          <li>Your profile image</li>
          <li>Your OpenID (Google identifier)</li>
          <li>Your game points (stored in Clerk's unsafe metadata)</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-6">
          The collected data is used to:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li>Display your name and score on the public leaderboard</li>
          <li>Personalize your experience</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          3. Cookies
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We do not directly set or manage cookies. However, <strong>Clerk</strong>, our authentication provider,
          uses secure cookies to manage user sessions. These cookies are essential for login functionality and session tracking.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          4. Data Storage
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We do not use any local storage, databases, or third-party analytics. Your game points are securely stored in your
          Clerk user profile metadata.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          5. Leaderboard API
        </h2>
        <p className="text-gray-700 mb-4">
          Leaderboard data is fetched via our backend API:
        </p>
        <code className="block bg-gray-100 p-4 rounded-md text-orange-600 font-mono break-words select-all">
          https://sign-sneaky.onrender.com/api/leaderboard
        </code>
        <p className="mt-3 text-gray-600 italic text-sm">
          This API retrieves public data from Clerk's metadata to render the leaderboard.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          6. Third-Party Services
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Clerk</strong> — for authentication and user metadata storage</li>
          <li><strong>Render</strong> — for hosting our backend API</li>
          <li><strong>Vercel</strong> — for hosting our frontend application</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          7. Children's Privacy
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Sign Sneaky is suitable for all ages. We do not knowingly collect any sensitive personal data, and all information is
          limited to public profile and in-game scores.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          8. Your Data Rights
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you would like to request deletion of your data or have any privacy-related questions, feel free to contact us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 border-l-4 border-orange-400 pl-4">
          9. Contact
        </h2>
        <p className="text-gray-700 space-y-2">
          📧 Email:{' '}
          <a
            href="mailto:athexgamingbd@gmail.com"
            className="text-orange-600 hover:text-orange-700 hover:underline transition"
          >
            athexgamingbd@gmail.com
          </a>
          <br />
          🐦 X (Twitter):{' '}
          <a
            href="https://x.com/athex_web3"
            className="text-orange-600 hover:text-orange-700 hover:underline transition"
            target="_blank"
            rel="noreferrer"
          >
            @athex_web3
          </a>
        </p>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-400 select-none">
        Last updated: May 15, 2025
      </footer>
    </main>
  );
}
