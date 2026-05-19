export default function TermsOfUse() {
  return (
    <div className="mx-auto max-w-3xl w-full px-6 sm:px-8 py-16 flex flex-col justify-center flex-grow">
      <h1 className="h1-hero text-zinc-950 mb-6 uppercase tracking-wide">
        Terms of Use
      </h1>
      <div className="space-y-6 text-[15px] text-body-gray leading-relaxed font-light">
        <p className="font-medium text-zinc-900">
          Last updated: May 19, 2026
        </p>
        <p>
          Welcome to possiblehealth.org. By accessing or using our website, you agree to comply with and be bound by these Terms of Use.
        </p>
        <h2 className="text-[20px] font-semibold text-zinc-950 pt-4">1. Acceptable Use</h2>
        <p>
          You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
        </p>
        <h2 className="text-[20px] font-semibold text-zinc-950 pt-4">2. Intellectual Property</h2>
        <p>
          Unless otherwise stated, all content, design, and graphics displayed on this website are the intellectual property of Possible (including Sambhav and Possible-US) or our partners. You may read, print, or download publications for personal, educational, or non-commercial use, provided all copyright notices are preserved.
        </p>
        <h2 className="text-[20px] font-semibold text-zinc-950 pt-4">3. Disclaimers</h2>
        <p>
          The content on this website is provided for informational and educational purposes only. While we strive to present accurate, evidence-based research results, we make no representations or warranties of any kind regarding the completeness, accuracy, or reliability of the information.
        </p>
        <h2 className="text-[20px] font-semibold text-zinc-950 pt-4">4. Contact Us</h2>
        <p>
          If you have any questions about these Terms of Use, please contact us at{" "}
          <a href="mailto:answers@possiblehealth.org" className="text-secondary-blue hover:underline">
            answers@possiblehealth.org
          </a>.
        </p>
      </div>
    </div>
  );
}
