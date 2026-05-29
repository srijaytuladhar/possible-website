import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="flex flex-col flex-1 mx-auto max-w-7xl w-full px-6 sm:px-8 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-body-gray hover:text-primary-pink transition-colors mb-8 w-fit">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 bg-primary-pink/10 text-primary-pink text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Updates
        </span>
        <h1 className="h1-hero text-zinc-950 mb-6 uppercase tracking-wide">
          News & Announcements
        </h1>
        <p className="text-subheading text-body-gray font-light mb-12">
          Stay up to date with the latest from Possible, our programs in Nepal, and global partnerships.
        </p>
      </div>

      <div className="flex-1 min-h-[40vh] flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50 p-12 text-center">
        <h3 className="h3-card text-zinc-800 mb-2 font-medium">No news articles yet</h3>
        <p className="text-body text-body-gray font-light max-w-md">
          Check back later for updates, press releases, and announcements regarding our work.
        </p>
      </div>
    </div>
  );
}
