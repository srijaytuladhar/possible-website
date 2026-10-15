"use client";

import { useState } from "react";
import {
  Heart,
  Landmark,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Mail,
} from "lucide-react";

export default function DonatePage() {
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "annual">("monthly");
  const [selectedAmount, setSelectedAmount] = useState<number | string>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    country: "United States",
    hearAbout: "",
    hearAboutOther: "",
  });

  const amounts = [25, 50, 100, 250, 500];

  const faqs = [
    {
      question: "Is my donation tax-deductible?",
      answer:
        "Yes, your donation is tax-deductible. Our tax ID is 20-3055055. Nyaya Health, doing business as Possible, a 501(c)(3) not-for-profit organization, has not provided any goods or services, in whole or in part, to you in consideration for this voluntary cash contribution.",
    },
    {
      question: "Can I send a check?",
      answer: (
        <span>
          Yes, you can. Please make the check payable to <strong>“Possible”</strong> and send to:
          <br />
          <span className="mt-1 block font-medium text-zinc-800">
            99 Wall Street #4100
            <br />
            New York, NY 10005
          </span>
        </span>
      ),
    },
    {
      question: "Can I give through stock or wire transfer?",
      answer: (
        <span>
          Yes, you can. For wire transfers and gifts of stock, please write us at{" "}
          <a
            href="mailto:donations@possiblehealth.org"
            className="text-primary-pink font-medium hover:underline"
          >
            donations@possiblehealth.org
          </a>
          .
        </span>
      ),
    },
    {
      question: "Can I make a recurring donation?",
      answer:
        "Yes, you can. Monthly gifts are some of our most important contributions, because they support us to sustain throughout the year. To set up, please go to the donate page and click monthly or annual donation.",
    },
    {
      question: "Can I give through a donor-advised fund?",
      answer: (
        <span>
          Yes, you can. If you have a donor-advised fund with Fidelity Charitable, Schwab Charitable, Vanguard, National Philanthropic Trust, or Benevity, please use the DAF Direct link to automatically submit a recommendation to your advisor. Otherwise, please contact your financial institution to make a recommendation or please write us at{" "}
          <a
            href="mailto:donations@possiblehealth.org"
            className="text-primary-pink font-medium hover:underline"
          >
            donations@possiblehealth.org
          </a>{" "}
          to help you support the process.
        </span>
      ),
    },
    {
      question: "Can I make a gift through small, family-funded foundations?",
      answer: (
        <span>
          Yes. Please write us at{" "}
          <a
            href="mailto:donations@possiblehealth.org"
            className="text-primary-pink font-medium hover:underline"
          >
            donations@possiblehealth.org
          </a>{" "}
          to discuss the plan and process.
        </span>
      ),
    },
    {
      question: "Can I make a gift through my employer’s giving program?",
      answer: (
        <span>
          Yes. You could double your impact through a matching gift from your employer. Contact your company’s Human Resources office to add Possible to your employee giving platform or please write us at{" "}
          <a
            href="mailto:donations@possiblehealth.org"
            className="text-primary-pink font-medium hover:underline"
          >
            donations@possiblehealth.org
          </a>
          .
        </span>
      ),
    },
    {
      question: "Can I participate in planned giving?",
      answer: (
        <span>
          Yes. Thank you for considering a legacy gift, which helps ensure your support to Possible goes long into the future, and has a lasting impact.
          <br />
          <br />
          A legacy gift typically refers to a gift that requires estate and/or financial planning. You can update your estate or financial plans to include us as a beneficiary of your will, trust, retirement plan, or life insurance plan, among other options that can be tailored to fit your needs. To discuss more, please write us at{" "}
          <a
            href="mailto:donations@possiblehealth.org"
            className="text-primary-pink font-medium hover:underline"
          >
            donations@possiblehealth.org
          </a>
          .
        </span>
      ),
    },
  ];

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount("custom");
  };

  const handleAmountSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (donorInfo.firstName && donorInfo.lastName && donorInfo.email) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const activeAmount = selectedAmount === "custom" ? Number(customAmount) || 0 : selectedAmount;

  const frequencyLabel =
    frequency === "monthly"
      ? "/ Month"
      : frequency === "annual"
      ? "/ Year"
      : "";

  return (
    <div className="mx-auto max-w-7xl w-full px-6 sm:px-8 py-12 flex flex-col flex-1">
      {/* Page Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
          Support Our Solutions
        </h1>
      </div>

      <div className="grid m-4">
        {/* Support Statement & Transparency */}
        <div className="lg:col-span-5 space-y-6" hidden>
          <div className="bg-zinc-950 text-white rounded-2xl p-8 border border-zinc-800 space-y-6">
            <h3 className="h3-card text-white font-medium">How Your Donation Helps</h3>
            <ul className="space-y-4 text-[14px] text-zinc-400 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <div className="p-1 bg-primary-pink/15 text-primary-pink rounded-md shrink-0 mt-0.5">
                  <Heart className="h-3.5 w-3.5 fill-primary-pink" />
                </div>
                <span>
                  <strong>Clinical Model Testing:</strong> Supports our team in designing, co-creating, and implementing trials for initiatives like MILAP (intimate partner violence) and Collaborative Care (mental health).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-secondary-blue/15 text-secondary-blue rounded-md shrink-0 mt-0.5">
                  <Heart className="h-3.5 w-3.5 fill-secondary-blue" />
                </div>
                <span>
                  <strong>Technology Scaling:</strong> Finances the ongoing development and deployment of Community Health Information Systems (CHIS) for digitizing patient records and improving care.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 bg-accent-purple/15 text-accent-purple rounded-md shrink-0 mt-0.5">
                  <Heart className="h-3.5 w-3.5 fill-accent-purple" />
                </div>
                <span>
                  <strong>Local Capacity Building:</strong> Enables traineeship programs providing a small stipend and mentorship to aspiring health innovators in Nepal for up to one year postings.
                </span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-zinc-50 border border-zinc-150 rounded-2xl space-y-4">
            <h4 className="text-[15px] font-semibold text-zinc-900 flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-secondary-blue" />
              <span>Tax Deductibility & Transparency</span>
            </h4>
            <p className="text-[13px] text-body-gray leading-relaxed font-light">
              Possible-US is a registered 501(c)(3) tax-exempt organization in the United States. Donations are tax-deductible to the full extent of the law. Audited financial statements and IRS Form 990 filings are openly accessible under our Publications.
            </p>
            <p className="text-[13px] text-body-gray leading-relaxed font-light">
              Donations destined directly to Nepal operations can also be routed through Sambhav (Possible-Nepal), complying with all Social Welfare Council (SWC) and national regulations.
            </p>
          </div>
        </div>

        {/* Donation Interactive Form Widget */}
        <div className="lg:col-span-7 bg-zinc-50 border border-zinc-100 rounded-2xl p-8 shadow-sm">
          {submitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-5 animate-in fade-in duration-300">
              <div className="p-3 bg-white text-emerald-600 rounded-full w-fit mx-auto shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="h3-card text-emerald-950 font-semibold">Thank You for Your Generosity!</h3>
              <p className="text-[14px] text-emerald-800 leading-relaxed font-light">
                Your donation of <strong>${activeAmount} {frequencyLabel}</strong> has been simulated successfully. In a production environment, this would process securely via our payment gateway.
              </p>
              <p className="text-[13px] text-emerald-700/80 font-light">
                A receipt will be sent to <strong>{donorInfo.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedAmount(100);
                  setCustomAmount("");
                }}
                className="inline-block bg-white border border-emerald-250 hover:bg-emerald-100/50 px-6 py-2.5 rounded-full text-[13px] font-semibold text-emerald-800 transition-colors cursor-pointer"
              >
                Make Another Donation
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="space-y-6">
              {/* Frequency Selector Toolbar with Email Link Tab */}
              <div className="flex flex-wrap items-center gap-2 p-1 bg-zinc-200/60 rounded-xl w-fit">
                <button
                  type="button"
                  onClick={() => setFrequency("one-time")}
                  className={`px-4 py-2 rounded-lg font-equip text-[13px] font-medium transition-all cursor-pointer ${
                    frequency === "one-time"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  One-time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`px-4 py-2 rounded-lg font-equip text-[13px] font-medium transition-all cursor-pointer ${
                    frequency === "monthly"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Monthly Gift
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("annual")}
                  className={`px-4 py-2 rounded-lg font-equip text-[13px] font-medium transition-all cursor-pointer ${
                    frequency === "annual"
                      ? "bg-white text-zinc-950 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-950"
                  }`}
                >
                  Annual Gift
                </button>

                {/* Email Tab linking directly to donations@possiblehealth.org */}
                <a
                  href="mailto:donations@possiblehealth.org"
                  className="px-4 py-2 rounded-lg font-equip text-[13px] font-medium text-zinc-700 hover:text-primary-pink hover:bg-white/80 transition-all cursor-pointer inline-flex items-center gap-1.5"
                  title="Email donations@possiblehealth.org"
                >
                  <Mail className="h-3.5 w-3.5 text-primary-pink" />
                  <span>Email</span>
                </a>
              </div>

              {/* Amount Grid */}
              <div className="space-y-3">
                <label className="block text-[13px] font-semibold text-zinc-700">
                  Select Donation Amount (USD)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`py-3.5 rounded-xl border text-[14px] font-semibold transition-all cursor-pointer ${
                        selectedAmount === amt
                          ? "bg-primary-pink border-primary-pink text-white shadow-md shadow-primary-pink/15"
                          : "bg-white border-zinc-200 text-zinc-800 hover:border-primary-pink/40"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <div className="col-span-3 sm:col-span-6 mt-1 flex items-center gap-2 rounded-xl bg-white border border-zinc-200 px-3 py-1.5 focus-within:border-primary-pink transition-colors">
                    <span className="text-[14px] text-zinc-400 font-semibold">$</span>
                    <input
                      type="number"
                      placeholder="Other Amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full bg-transparent text-[14px] outline-none text-zinc-800 font-semibold"
                      min={1}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="block text-[13px] font-semibold text-zinc-700">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`py-3 rounded-xl border text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-white border-zinc-950 text-zinc-950 shadow-sm"
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`py-3 rounded-xl border text-[13px] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "bank"
                        ? "bg-white border-zinc-950 text-zinc-950 shadow-sm"
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    <Landmark className="h-4 w-4" />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {/* Donor Details Form */}
              <div className="space-y-4 pt-2 border-t border-zinc-200/50">
                <h4 className="text-[14px] font-semibold text-zinc-900">
                  Your Information
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[12px] font-semibold text-zinc-600 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={donorInfo.firstName}
                      onChange={(e) => setDonorInfo({ ...donorInfo, firstName: e.target.value })}
                      className="w-full rounded-lg border border-zinc-250 bg-white px-3 py-2 text-[13.5px] outline-none focus:border-primary-pink"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[12px] font-semibold text-zinc-600 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={donorInfo.lastName}
                      onChange={(e) => setDonorInfo({ ...donorInfo, lastName: e.target.value })}
                      className="w-full rounded-lg border border-zinc-250 bg-white px-3 py-2 text-[13.5px] outline-none focus:border-primary-pink"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="donorEmail" className="block text-[12px] font-semibold text-zinc-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="donorEmail"
                    required
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                    className="w-full rounded-lg border border-zinc-250 bg-white px-3 py-2 text-[13.5px] outline-none focus:border-primary-pink"
                  />
                </div>

                {/* How did you hear about Possible? */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="hearAbout" className="block text-[12px] font-semibold text-zinc-600 mb-1">
                      How did you hear about Possible? <span className="font-normal text-zinc-400">(optional)</span>
                    </label>
                    <select
                      id="hearAbout"
                      value={donorInfo.hearAbout}
                      onChange={(e) => setDonorInfo({ ...donorInfo, hearAbout: e.target.value })}
                      className="w-full rounded-lg border border-zinc-250 bg-white px-3 py-2 text-[13.5px] outline-none focus:border-primary-pink text-zinc-800"
                    >
                      <option value="">Select an option...</option>
                      <option value="Staff">Staff</option>
                      <option value="Board">Board</option>
                      <option value="The Life You Can Save">The Life You Can Save</option>
                      <option value="Friend">Friend</option>
                      <option value="London Marathon">London Marathon</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {donorInfo.hearAbout === "Other" && (
                    <div className="animate-in fade-in duration-200">
                      <label htmlFor="hearAboutOther" className="block text-[12px] font-semibold text-zinc-600 mb-1">
                        Please specify
                      </label>
                      <input
                        type="text"
                        id="hearAboutOther"
                        placeholder="How did you hear about us?"
                        value={donorInfo.hearAboutOther}
                        onChange={(e) => setDonorInfo({ ...donorInfo, hearAboutOther: e.target.value })}
                        className="w-full rounded-lg border border-zinc-250 bg-white px-3 py-2 text-[13.5px] outline-none focus:border-primary-pink"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-pink px-6 py-4 font-equip font-semibold text-[15px] text-white shadow-lg shadow-primary-pink/20 hover:bg-primary-pink/90 hover:shadow-primary-pink/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <span>Donate ${activeAmount} {frequencyLabel}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <section className="mt-16 pt-12 border-t border-zinc-200/80 max-w-4xl mx-auto w-full">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h2 className="h1-hero text-zinc-950 mb-3 uppercase tracking-wide">
            Donation FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-50 border border-zinc-200/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-[15px] text-zinc-900 hover:text-primary-pink transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary-pink" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-[14px] text-body-gray font-light leading-relaxed border-t border-zinc-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}