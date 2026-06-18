"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, ArrowRight, X, Mail, Sparkles, Clock } from "lucide-react";

interface Article {
  id: string;
  title: string;
  desc: string;
  content: string;
  category: "Field Updates" | "Announcements" | "Research";
  date: string;
  image: string;
  author: string;
  readTime: string;
}

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const articles: Article[] = [
    {
      id: "1",
      title: "Co-Designing Digital Health Systems with Municipal Leaders in Achham",
      desc: "Our data systems engineering team recently completed the deployment of custom clinical dashboards to three municipal health posts in Achham, improving healthcare outcomes.",
      content: `Our data systems engineering team recently completed the deployment of custom clinical dashboards to three municipal health posts in Achham. This tech-enabled community care pilot is already improving patient referral speeds.

      By co-designing these solutions directly with local administrators, we ensure that digital systems integrate smoothly into daily clinic workflows. Over the coming months, our team will continue tracking user adoption and clinical data quality metrics to refine the platform before national expansion.`,
      category: "Field Updates",
      date: "June 15, 2026, 9:00 AM",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&h=500&q=80",
      author: "Prakash Pant, Data Systems",
      readTime: "4 min read"
    },
    {
      id: "2",
      title: "New Funding to Support Mental Health Services Training",
      desc: "We are thrilled to announce a new grant supporting the expansion of our collaborative care model for depression and anxiety.",
      content: `We are thrilled to announce a new grant supporting the expansion of our collaborative care model for depression and anxiety. This funding will train 45 new community health workers in remote districts.

      Mental health support remains one of the most critical gaps in primary healthcare. Through this project, local health workers will gain specialized clinical skills to conduct home-based screenings and collaborative interventions, helping to reduce stigma and provide care to underserved populations.`,
      category: "Announcements",
      date: "May 20, 2026, 11:30 AM",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&h=400&q=80",
      author: "Bhubi Bista, People & Culture",
      readTime: "3 min read"
    },
    {
      id: "3",
      title: "Study on CHW Care Outcomes Published in The Lancet Global Health",
      desc: "Our clinical research partners have published a comprehensive evaluation of integrated maternal healthcare delivery, verifying substantial progress.",
      content: `Our clinical research partners have published a comprehensive evaluation of integrated maternal healthcare delivery, verifying substantial progress in prenatal care adherence.

      The study highlights how supervised, full-time community health workers significantly increase clinical contact points for pregnant women, leading to safer deliveries and better neonatal health outcomes. This evidence marks a critical step forward in validating our integrated care model at a global scientific level.`,
      category: "Research",
      date: "April 08, 2026, 4:15 PM",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=400&q=80",
      author: "Dr. Mina Shrestha, Science Board",
      readTime: "6 min read"
    },
    {
      id: "4",
      title: "Evaluating Dementia Care and Family Caregiver Support Guides",
      desc: "An outline of our home-based cognitive decline assistance tools and training guides released for regional districts.",
      content: `We have officially launched regional training modules designed to assist older adults facing dementia and cognitive decline. These guides provide family caregivers with practical behavioral strategies, coping methods, and referral directories.

      Integrating behavioral health support into standard home-based care protocols is a core focus of our team as the population over 60 increases in rural municipalities. Feedback surveys show a 92% satisfaction rate among primary caregivers utilizing our initial resource packages.`,
      category: "Research",
      date: "March 18, 2026, 10:00 AM",
      image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=600&h=400&q=80",
      author: "Kripa Sigdel, Mental Health Team",
      readTime: "5 min read"
    },
    {
      id: "5",
      title: "Collaborative Partnerships Expand to Central Nepal Districts",
      desc: "New agreements signed with central municipal offices to deploy localized integrated health post systems.",
      content: `Possible has formalised collaborative partnerships with three new central municipalities. The agreement establishes joint funding structures to support local health posts with pharmacy logistics, IT systems, and community health worker supervision support.

      Working in close coordination with government networks ensures that clinical workflows are scalable and sustainable under state guidelines. Training programs are scheduled to begin early next month.`,
      category: "Field Updates",
      date: "February 12, 2026, 2:45 PM",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=400&q=80",
      author: "Kumar Tamang, Operations",
      readTime: "3 min read"
    }
  ];

  const categories = ["All", "Field Updates", "Announcements", "Research"];

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(a => a.category === activeCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* News Landing Hero Section */}
      <div className="bg-zinc-50 border-b border-zinc-100 py-16 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-start relative">
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-body-gray hover:text-primary-pink transition-colors mb-8 w-fit group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-pink/10 px-3.5 py-1 text-[13px] font-semibold text-primary-pink uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Newsroom
            </span>
            <h1 className="h1-hero text-zinc-950 uppercase tracking-wide leading-tight">
              News & Announcements
            </h1>
            <p className="text-subheading text-body-gray font-light max-w-2xl leading-relaxed">
              Stay up to date with the latest from Possible, our clinical trials in Nepal, technology milestones, and global partnership initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs & Grid */}
      <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex-1">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-zinc-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-[13.5px] font-medium transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "bg-zinc-950 text-white border-zinc-950 shadow-sm"
                  : "bg-white text-body-gray border-zinc-200 hover:border-zinc-300 hover:text-zinc-950"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List / Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="flex flex-col bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                {/* Article Image Container */}
                <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-zinc-800 shadow-sm border border-zinc-200/50 backdrop-blur-sm">
                      <Tag className="h-3 w-3 text-primary-pink" />
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Info Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date.split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-[17px] sm:text-[19px] font-bold text-zinc-900 leading-snug group-hover:text-primary-pink transition-colors mb-3">
                    {article.title}
                  </h3>
                  
                  <p className="text-[13.5px] text-body-gray leading-relaxed font-light mb-6">
                    {article.desc}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-zinc-100 flex justify-between items-center text-xs font-semibold text-secondary-blue group-hover:underline">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50 max-w-lg mx-auto">
            <h3 className="h3-card text-zinc-800 mb-1 font-semibold">No news articles found</h3>
            <p className="text-body text-body-gray font-light">Try adjusting your filters to see more articles.</p>
          </div>
        )}
      </div>

      {/* Newsletter Signup Banner */}
      <div className="bg-zinc-950 py-16 px-6 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />
        <div className="mx-auto max-w-4xl text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
            Subscribe to our News & Updates
          </h2>
          <p className="text-[14px] sm:text-[15px] text-zinc-400 font-light max-w-xl mx-auto">
            Get monthly emails detailing our clinical findings, operational trial achievements, and community health progress in Nepal.
          </p>

          {subscribed ? (
            <div className="bg-primary-pink/10 border border-primary-pink/20 text-primary-pink p-4 rounded-2xl max-w-md mx-auto animate-in fade-in duration-300 font-medium">
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-primary-pink transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary-pink hover:bg-primary-pink/90 text-white font-semibold text-sm transition-all shadow-md shadow-primary-pink/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="h-4.5 w-4.5" />
                <span>Subscribe</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Article Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Clickable Backdrop overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setSelectedArticle(null)}
          />
          
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative border border-zinc-100 flex flex-col z-10">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-80 w-full bg-zinc-100 shrink-0">
              <Image
                src={selectedArticle.image}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-white/95 hover:bg-white text-zinc-900 rounded-full shadow-md transition-all hover:rotate-90 z-10 cursor-pointer"
                aria-label="Close article"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-pink text-white shadow-sm">
                  <Tag className="h-3 w-3" />
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold leading-tight">{selectedArticle.title}</h2>
              </div>
            </div>

            {/* Modal Body Scroll */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4 text-xs text-zinc-400 font-medium">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-700">By {selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-secondary-blue bg-secondary-blue/10 px-2 py-0.5 rounded">
                  {selectedArticle.readTime}
                </span>
              </div>

              <div className="text-zinc-800 leading-relaxed font-light text-[15px] sm:text-[16px] whitespace-pre-line space-y-4">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2 bg-zinc-900 hover:bg-zinc-850 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
