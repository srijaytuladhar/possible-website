import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#7B2B88] text-white/90 py-12 px-6 sm:px-8 mt-auto">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top bar: Brand Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/20">
          <div className="w-fit">
            <Image src="/logo.png" alt="Possible Logo" width={150} height={40} className="object-contain brightness-0 invert" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-white/90 font-medium">Follow us:</span>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/possiblehealth" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 hover:scale-105 transition-all duration-300" aria-label="Follow us on Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>
              <a href="https://x.com/possiblehealth" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#000000] text-white hover:opacity-90 hover:scale-105 transition-all duration-300" aria-label="Follow us on X">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/possible/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#0A66C2] text-white hover:opacity-90 hover:scale-105 transition-all duration-300" aria-label="Follow us on LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@PossibleHealthOrg" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#FF0000] text-white hover:opacity-90 hover:scale-105 transition-all duration-300" aria-label="Follow us on YouTube">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Full-width Collaborative Statement */}
        <div className="w-full flex flex-col items-center gap-1.5">
          <p className="text-[14px] leading-relaxed text-white/80 font-light text-justify [text-align-last:justify] max-w-5xl w-full">
            Possible is a collaboration between two independent organizations: Sambhav (Possible-Nepal), a Nepal-based non-governmental organization, and Possible-US, a U.S.-based nonprofit.
          </p>
          <p className="text-[14px] leading-relaxed text-white/80 font-light text-justify [text-align-last:justify] max-w-5xl w-full">
            While we operate independently, we maintain a mutually interdependent partnership with a shared mission to advance health innovation in Nepal.
          </p>
        </div>

        {/* Bottom Area: Links and Copyright below the collaborative statement */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/10 gap-4 text-[13px] text-white/70">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
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
          <span>Copyright@www.possiblehealth.org</span>
        </div>
      </div>
    </footer>
  );
}
