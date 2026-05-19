"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Building, Globe, Send, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const offices = [
    {
      country: "Nepal Office",
      entity: "Sambhav (Possible), Nepal",
      address: "Bhim Plaza, 1st Floor, Bhupi Sadak, Naxal 44600, Kathmandu, Nepal",
      phone: "9822999300",
      phoneRaw: "+9779822999300",
      icon: MapPin,
      badgeColor: "bg-primary-pink/10 text-primary-pink",
    },
    {
      country: "U.S. Office",
      entity: "Possible US",
      address: "99 Wall Street #4100, New York, NY 10005",
      phone: "None (Email preferred)",
      phoneRaw: "",
      icon: Building,
      badgeColor: "bg-secondary-blue/10 text-secondary-blue",
    },
  ];

  const emailGrid = [
    { label: "Questions & Inquiries", email: "answers@possiblehealth.org", desc: "For general inquiries, partnership questions, and academic collaborations." },
    { label: "Donation & Support", email: "donations@possiblehealth.org", desc: "For individual donations, wire instructions, tax receipts, and corporate sponsorship." },
    { label: "Media & Press", email: "media@possiblehealth.org", desc: "For press statements, editorial features, interviews, and media assets." },
    { label: "Research & Data", email: "research@possiblehealth.org", desc: "For clinical datasets, research partnerships, and policy brief inquiries." },
  ];

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Contact Us
        </h1>
        <p className="text-subheading text-body-gray font-light">
          Get in touch with our teams in Kathmandu and New York. Reach out to dedicated departments directly via email or submit a form query.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Office Details & Contact Grid */}
        <div className="lg:col-span-7 space-y-8">
          {/* Office Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {offices.map((office, idx) => {
              const Icon = office.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-zinc-200 hover:shadow-sm transition-all duration-300"
                >
                  <div className={`p-2.5 rounded-lg w-fit mb-4 ${office.badgeColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                    {office.country}
                  </span>
                  <h3 className="text-[18px] font-semibold text-zinc-900 mb-3">
                    {office.entity}
                  </h3>
                  <p className="text-[14px] text-body-gray leading-relaxed font-light mb-4 min-h-[50px]">
                    {office.address}
                  </p>
                  {office.phoneRaw ? (
                    <a
                      href={`tel:${office.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{office.phone}</span>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[14px] text-zinc-400">
                      <Phone className="h-4 w-4 text-zinc-300" />
                      <span>{office.phone}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Email Grid */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-semibold text-zinc-900 pb-2 border-b border-zinc-100">
              Departmental Emails
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {emailGrid.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="text-[14px] font-semibold text-zinc-950">{item.label}</h4>
                  <p className="text-[13px] text-body-gray font-light mb-1 leading-relaxed">{item.desc}</p>
                  <a
                    href={`mailto:${item.email}`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-secondary-blue hover:text-secondary-blue/80 transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{item.email}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-5 bg-zinc-50 border border-zinc-100 rounded-2xl p-8 shadow-sm">
          <h3 className="text-[20px] font-semibold text-zinc-950 mb-6">
            Send Us a Message
          </h3>
          
          {formSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-4 animate-in fade-in duration-300">
              <div className="p-3 bg-white text-emerald-600 rounded-full w-fit mx-auto shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-[16px] font-semibold text-emerald-950">Thank You!</h4>
              <p className="text-[13px] text-emerald-800 leading-relaxed font-light">
                Your message has been sent successfully. One of our team members will review your inquiry and get back to you shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="inline-block text-[13px] font-medium text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Sabina Shrestha"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary-pink"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sabina@example.org"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary-pink"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Research Partnership"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary-pink"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-primary-pink resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-pink px-6 py-3 font-equip font-medium text-[14px] text-white shadow-md shadow-primary-pink/15 hover:bg-primary-pink/90 transition-all cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
