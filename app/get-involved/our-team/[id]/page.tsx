import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User } from "lucide-react";
import { allTeamMembers } from "@/components/teamData";

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const resolvedParams = await params;
  const member = allTeamMembers.find((m) => m.id === resolvedParams.id);

  if (!member) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-6">
        <h1 className="text-2xl font-bold text-zinc-950 mb-2">Team Member Not Found</h1>
        <p className="text-zinc-600 mb-6 font-light">The requested team member profile could not be located.</p>
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-pink hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Our Team
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 sm:py-16 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/get-involved/our-team"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950 mb-10 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Our Team
        </Link>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-md shrink-0">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                <User className="w-16 h-16" />
              </div>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950">
                {member.name}
              </h1>
              <p className="text-base sm:text-lg text-primary-pink font-medium mt-1">
                {member.role}
              </p>
            </div>

            {member.linkedin && (
              <div className="pt-1">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-[#0A66C2] text-zinc-700 hover:text-white text-xs font-semibold transition-all duration-200"
                  aria-label={`${member.name}'s LinkedIn Profile`}
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Visit on LinkedIn</span>
                </a>
              </div>
            )}

            <div className="pt-4 border-t border-zinc-100">
              <p className="text-zinc-700 font-light leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {member.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}