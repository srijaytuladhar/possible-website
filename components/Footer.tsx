import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 py-12 px-6 sm:px-8 border-t border-zinc-900 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-8 border-b border-zinc-900">
          {/* Brand & Note */}
          <div className="space-y-4">
            <span className="font-equip-thin text-xl tracking-[0.2em] font-extralight text-white">
              POSSIBLE
            </span>
            <p className="text-[13px] leading-relaxed text-zinc-500 max-w-xl">
              Possible is a collaboration between two independent organizations: Sambhav (Possible-Nepal), a Nepal-based non-governmental organization, and Possible-US, a U.S.-based nonprofit. While we operate independently, we maintain a mutually interdependent partnership with a shared mission to advance health innovation in Nepal.
            </p>
          </div>

          {/* Links & Socials */}
          <div className="flex flex-col md:items-end justify-between h-full space-y-6 md:space-y-0">
            {/* Navigation links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="/contact-us" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/PossibleHealth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-300"
                aria-label="Follow us on X"
              >
                {/* Custom SVG for X logo */}
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/possiblehealth"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-[13px] text-zinc-600">
          <span>Copyright@www.possiblehealth.org</span>
          <span className="mt-2 sm:mt-0">Advancing Health Innovation in Nepal</span>
        </div>
      </div>
    </footer>
  );
}
