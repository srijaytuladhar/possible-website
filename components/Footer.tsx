import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-auto flex flex-col bg-[#3A023B] text-white">
      {/* Top Section: Description & Columns */}
      <div className="w-full py-12 md:py-16 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column 1: Description & Socials */}
          <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-[28px] font-bold tracking-tight text-white font-equip leading-none">
                possible
              </span>
              <svg viewBox="0 0 110 110" className="w-6 h-6 shrink-0 -mt-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 10,40 H 70 V 100 H 40 V 70 H 10 Z" fill="#ED2E84" />
                <path d="M 40,10 H 70 V 40 H 100 V 70 H 40 Z" fill="#00BBE2" />
                <rect x="40" y="40" width="30" height="30" fill="#782888" />
              </svg>
            </div>
            <p className="text-[14px] leading-relaxed text-white/80 font-light text-justify max-w-xl">
              Possible is a collaboration between two independent organizations: Sambhav (Possible), a Nepal-based non-governmental organization, and Possible, a U.S.-based nonprofit. While we operate independently, we maintain a mutually interdependent partnership with a shared mission to advance health innovation in Nepal.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/possiblehealth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path d="M14.65 12h-2.15v6.5h-2.7v-6.5h-1.5v-2.3h1.5v-1.5c0-2 1.22-3.1 3-3.1.86 0 1.59.06 1.8.09v2.1h-1.24c-1 0-1.16.48-1.16 1.14v1.37h2.4l-.3 2.3z" fill="white" />
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/possiblehealth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <radialGradient id="instaGrad" cx="30%" cy="107%" r="130%">
                      <stop offset="0" stopColor="#fdf497" />
                      <stop offset="0.05" stopColor="#fdf497" />
                      <stop offset="0.45" stopColor="#fd5949" />
                      <stop offset="0.6" stopColor="#d6249f" />
                      <stop offset="1" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill="url(#instaGrad)" />
                  <path d="M12 6.8c1.7 0 1.9 0 2.6.1.6.03.95.13 1.17.22.3.1.5.25.74.48.23.23.38.44.48.74.1.22.18.56.22 1.17.03.7.03.9.03 2.6s0 1.9-.1 2.6c-.03.6-.13.95-.22 1.17-.1.3-.25.5-.48.74-.23.23-.44.38-.74.48-.22.1-.56.18-1.17.22-.7.03-.9.03-2.6.03s-1.9 0-2.6-.1c-.6-.03-.95-.13-1.17-.22-.3-.1-.5-.25-.74-.48-.23-.23-.38-.44-.48-.74-.1-.22-.18-.56-.22-1.17-.03-.7-.03-.9-.03-2.6s0-1.9.1-2.6c.03-.6.13-.95.22-1.17.1-.3.25-.5.48-.74.23-.23.44-.38.74-.48.22-.1.56-.18 1.17-.22.7-.03.9-.03 2.6-.03zm0-1.2c-1.7 0-1.9 0-2.6.03-.7.03-1.2.14-1.63.3-.45.18-.83.42-1.2.8-.38.37-.62.75-.8 1.2-.17.43-.28.93-.3 1.63C5.4 9.1 5.4 9.3 5.4 11s0 1.9.03 2.6c.03.7.14 1.2.3 1.63.18.45.42.83.8 1.2.37.38.75.62 1.2.8.43.17.93.28 1.63.3.7.03.9.03 2.6.03s1.9 0 2.6-.03c.7-.03 1.2-.14 1.63-.3.45-.18.83-.42 1.2-.8.38-.37.62-.75.8-1.2.17-.43.28-.93.3-1.63.03-.7.03-.9.03-2.6s0-1.9-.03-2.6c-.03-.7-.14-1.2-.3-1.63-.18-.45-.42-.83-.8-1.2-.37-.38-.75-.62-1.2-.8-.43-.17-.93-.28-1.63-.3-.7-.03-.9-.03-2.6-.03z" fill="white" />
                  <path d="M12 8.7a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6zm0-1.2a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" fill="white" />
                  <circle cx="15.65" cy="8.35" r="0.55" fill="white" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/possible/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="4" fill="#0A66C2" />
                  <path d="M7.5 19H4.5V9.5H7.5V19ZM6 8.2c-.96 0-1.75-.78-1.75-1.75S5.04 4.7 6 4.7s1.75.78 1.75 1.75S6.96 8.2 6 8.2ZM19.5 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V9.5h3V11.2c1.4-2.58 7-2.77 7 2.47V19Z" fill="white" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a 
                href="https://x.com/possiblehealth" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="X"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="black" />
                  <path d="M17.02 5.5h2.15l-4.7 5.37 5.53 7.31h-4.33l-3.39-4.43-3.88 4.43H6.25l5.02-5.74L6 5.5h4.44l3.07 4.06L17.02 5.5zm-.75 11.39h1.19L10.02 6.72H8.74l7.53 10.17z" fill="white" />
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@PossibleHealthOrg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="YouTube"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="white" />
                  <path d="M17.5 9.2c-.15-.55-.58-.98-1.13-1.13C15.37 8 12 8 12 8s-3.37 0-4.37.07c-.55.15-.98.58-1.13 1.13C6.43 10.2 6.43 12 6.43 12s0 1.8.07 2.8c.15.55.58.98 1.13 1.13.99.07 4.37.07 4.37.07s3.38 0 4.37-.07c.55-.15.98-.58 1.13-1.13.07-1 .07-2.8.07-2.8s0-1.8-.07-2.8ZM10.86 14.15V9.85L14.64 12l-3.78 2.15Z" fill="#FF0000" />
                </svg>
              </a>

              {/* Wikipedia */}
              <a 
                href="https://en.wikipedia.org/wiki/Possible_(organization)" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                aria-label="Wikipedia"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#2B2B2B" />
                  <path d="M12.05 7.84c.16.53.31 1.05.47 1.57.41 1.37.82 2.74 1.23 4.11.23.77.46 1.54.69 2.31l.08.27.08-.27c.43-1.42.86-2.84 1.28-4.26.25-.83.5-1.66.75-2.49.07-.23.14-.46.21-.69h.82l-2.47 8.16H14.1l-1.39-4.66-1.38 4.66h-1.12L7.75 7.84h.83c.2.66.4 1.32.6 1.98.39 1.3.78 2.61 1.17 3.91.24.8.48 1.6.72 2.4l.09.28.08-.28c.25-.84.5-1.68.75-2.52.28-.93.56-1.86.84-2.79l.22-.72h.82z" fill="white" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Column 2: Organization Links */}
          <div className="md:col-span-3 lg:col-span-3 md:pl-8 flex flex-col gap-4">
            <h3 className="text-[16px] font-bold tracking-wider uppercase font-equip text-white">
              ORGANIZATION
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/get-involved/our-team" className="text-[15px] text-white/85 hover:text-white transition-colors font-light">
                  About
                </Link>
              </li>
              <li>
                <Link href="/solutions/innovate" className="text-[15px] text-white/85 hover:text-white transition-colors font-light">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-[15px] text-white/85 hover:text-white transition-colors font-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Accountability Links */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-[16px] font-bold tracking-wider uppercase font-equip text-white">
              ACCOUNTABILITY
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/publications/financials" className="text-[15px] text-white/85 hover:text-white transition-colors font-light">
                  Financials
                </Link>
              </li>
              <li>
                <Link href="/publications/financials" className="text-[15px] text-white/85 hover:text-white transition-colors font-light">
                  Conflict of Interest (COI)
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar: Policies & Copyright */}
      <div className="w-full bg-[#4A0C4E] py-6 px-6 sm:px-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 text-[14px]">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/privacy-policy" className="text-white/85 hover:text-white transition-colors font-light">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-white/85 hover:text-white transition-colors font-light">
              Terms of use
            </Link>
            <Link href="/sitemap" className="text-white/85 hover:text-white transition-colors font-light">
              Site Map
            </Link>
          </div>
          <div className="text-white/85 font-light">
            © Possible
          </div>
        </div>
      </div>
    </footer>
  );
}
