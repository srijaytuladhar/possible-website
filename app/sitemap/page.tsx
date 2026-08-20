export default function SitemapPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-extralight uppercase tracking-wide text-zinc-900 sm:text-4xl">
          Site Map <span className="font-semibold text-primary-pink">coming soon</span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-pink to-secondary-blue rounded-full mx-auto" />
        <p className="text-body-gray font-light text-sm sm:text-base leading-relaxed pt-2">
          We are currently updating our site map to improve navigation. Please check back later.
        </p>
      </div>
    </div>
  );
}
