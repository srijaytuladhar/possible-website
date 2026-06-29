"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Building, Send, CheckCircle2, MessageSquare, X } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoveredOffice, setHoveredOffice] = useState<number | null>(null);

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
      address: "Ward No 1, Bhim Plaza, Bhupi Sadak, Narayanchour, Naxal, Kathmandu, NPL",
      phone: "9822999300",
      phoneRaw: "+9779822999300",
      icon: MapPin,
      badgeColor: "bg-primary-pink/10 text-primary-pink",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.186638069502!2d85.3283281762557!3d27.711545625026938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190bb4663df7%3A0xe510b64d1f2e247!2sBhim%20Plaza!5e0!3m2!1sen!2snp!4v1719638421832!5m2!1sen!2snp",
      mapsLink: "https://maps.google.com/?q=Bhim+Plaza+Naxal+Kathmandu+Nepal",
      hours: "Mon–Fri, 9:00 AM – 5:00 PM (except public holidays)"
    },
    {
      country: "U.S. Office",
      entity: "Possible US",
      address: "99 Wall Street #4100,New York \n NY 10005",
      phone: "None (Email preferred)",
      phoneRaw: "",
      icon: Building,
      badgeColor: "bg-secondary-blue/10 text-secondary-blue",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.4750953930815!2d-74.01111972343864!3d40.70642923789456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a16fa8a75e3%3A0x6b8bc6d3d9e875bd!2s99%20Wall%20St%20%234100%2C%20New%20York%2C%20NY%2010005!5e0!3m2!1sen!2sus!4v1719638487213!5m2!1sen!2sus",
      mapsLink: "https://maps.google.com/?q=99+Wall+Street+New+York+NY+10005",
      hours: ""
    },
  ];

  const emailGrid = [
    { label: "General Inquiries", email: "answers@possiblehealth.org" },
    { label: "Donations & Support", email: "donation@possiblehealth.org", desc: "For donations, wire instructions, tax receipts, and sponsorships." },
    { label: "Research & Innovation", email: "research@possiblehealth.org", desc: "For clinical datasets, research partnerships, and research-related enquiries." },
  ];

  const closeFormModal = () => {
    setIsFormOpen(false);
    setFormSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-4xl w-full px-6 sm:px-8 py-16 flex flex-col flex-1 space-y-16 animate-in fade-in duration-300">

      {/* 1. Location Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
          <MapPin className="h-5 w-5 text-primary-pink" />
          <h2 className="text-xl font-semibold text-zinc-950 uppercase tracking-wider">Locations</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offices.map((office, idx) => {
            const Icon = office.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredOffice(idx)}
                onMouseLeave={() => setHoveredOffice(null)}
                className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl hover:border-zinc-200 transition-all duration-300 flex flex-col justify-between min-h-[260px] shadow-sm hover:shadow-md relative overflow-hidden"
              >
                {hoveredOffice === idx ? (
                  /* Full-card Google Map Preview on hover */
                  <div className="absolute inset-0 w-full h-full bg-zinc-100 animate-in fade-in duration-300">
                    <iframe
                      src={office.mapUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                ) : (
                  /* Info view when not hovered */
                  <div className="flex flex-col justify-between h-full w-full animate-in fade-in duration-200">
                    <div>
                      <div className={`p-2.5 rounded-xl w-fit mb-4 ${office.badgeColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                        {office.country}
                      </span>
                      <h3 className="text-[18px] font-semibold text-zinc-900 mb-3">
                        {office.entity}
                      </h3>
                      <p className="text-[14px] text-body-gray leading-relaxed font-light mb-4 whitespace-pre-line">
                        {office.address}
                      </p>
                    </div>

                    <div>
                      {office.phoneRaw ? (
                        <div className="space-y-1">
                          <a
                            href={`tel:${office.phoneRaw}`}
                            className="inline-flex items-center gap-1.5 text-[14px] font-medium text-primary-pink hover:text-primary-pink/80 transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            <span>{office.phone}</span>
                          </a>
                          {office.hours && (
                            <span className="block text-[11.5px] text-zinc-400 font-light italic mt-0.5">
                              ({office.hours})
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 text-[14px] text-zinc-400">
                          <Phone className="h-4 w-4 text-zinc-300" />
                          <span>{office.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Email Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
          <Mail className="h-5 w-5 text-secondary-blue" />
          <h2 className="text-xl font-semibold text-zinc-950 uppercase tracking-wider">Email Enquiries</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emailGrid.map((item, idx) => (
            <div key={idx} className="p-5 border border-zinc-100 bg-zinc-50/50 rounded-xl space-y-2">
              <h4 className="text-[14px] font-semibold text-zinc-950">{item.label}</h4>
              <p className="text-[13px] text-body-gray font-light leading-relaxed min-h-[50px]">{item.desc}</p>
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
      </section>

      {/* 3. Send Us a Message Button */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-4">
        <div className="h-px w-24 bg-zinc-200" />
        <button
          onClick={() => setIsFormOpen(true)}
          className="inline-flex items-center gap-2.5 rounded-full bg-primary-pink px-10 py-4.5 font-equip font-semibold text-[15px] text-white shadow-xl shadow-primary-pink/25 hover:bg-primary-pink/90 hover:shadow-primary-pink/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
        >
          <MessageSquare className="h-5 w-5 fill-white" />
          <span>Send Us a Message</span>
        </button>
      </div>

      {/* 4. Form Modal Popup */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Clickable Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-200"
            onClick={closeFormModal}
          />

          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative border border-zinc-100 flex flex-col z-10">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm">
              <h3 className="text-[17px] font-semibold text-zinc-900 uppercase tracking-wider">
                Send Us a Message
              </h3>
              <button
                onClick={closeFormModal}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors duration-200 hover:rotate-90 cursor-pointer"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                  <div className="p-3 bg-white text-emerald-600 rounded-full w-fit mx-auto shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-[16px] font-semibold text-emerald-950">Thank You!</h4>
                  <p className="text-[13px] text-emerald-800 leading-relaxed font-light">
                    Your message has been sent successfully. One of our team members will review your inquiry and get back to you shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={closeFormModal}
                      className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-pink px-6 py-3.5 font-equip font-semibold text-[14px] text-white shadow-md shadow-primary-pink/15 hover:bg-primary-pink/90 transition-all cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
