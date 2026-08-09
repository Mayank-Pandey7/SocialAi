import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FAQ_ITEMS = [
  {
    q: "What is NEYRIX AI?",
    a: "NEYRIX AI is an all-in-one AI platform engineered for creators, marketers, and founders. It combines multi-platform AI content generation, real-time trend discovery, virality score prediction, post scheduling, and performance analytics into one workspace.",
  },
  {
    q: "Which platforms does NEYRIX AI support?",
    a: "NEYRIX AI natively supports post formatting and distribution for LinkedIn, Twitter / X, Instagram, Threads, and Facebook. Each post is automatically adapted for line breaks, hashtag density, tone persona, and character limits.",
  },
  {
    q: "How does AI content generation work?",
    a: "Simply type a topic, blog summary, product launch detail, or dev hot take into NEYRIX AI. Choose your target platform and tone persona, and our AI engine synthesizes platform-ready posts with hooks and hashtags in under 5 seconds.",
  },
  {
    q: "Can I analyze my social performance?",
    a: "Yes! NEYRIX AI provides pre-publish Virality Index scores to test post readability before you publish, as well as an Analytics Workspace to track organic reach, engagement rates, and growth metrics over time.",
  },
  {
    q: "Can I schedule content in advance?",
    a: "Yes! The NEYRIX AI Queue Calendar allows you to plan, draft, and organize weekly post queues across all your connected platforms so your social brand remains consistently active.",
  },
  {
    q: "Is NEYRIX AI free to get started?",
    a: "Yes! You can start using NEYRIX AI 100% free with no credit card required. Test our live generator directly on this page or sign up for a free account to start creating.",
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggleIndex = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section id="faq" className="sai-faq-section">
      <div className="sai-faq-container">
        <div className="sai-section-header">

          <h2 className="sai-section-title">Got questions? We've got answers.</h2>
          <p className="sai-section-sub">
            Everything you need to know about NEYRIX AI content generation, analytics, and plans.
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={item.q}
                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                onClick={() => toggleIndex(idx)}
              >
                <div className="faq-item-header">
                  <h3 className="faq-question">{item.q}</h3>
                  <button className="faq-toggle-icon" aria-label="Toggle answer">
                    <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
                  </button>
                </div>

                {isOpen && (
                  <div className="faq-item-body">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
