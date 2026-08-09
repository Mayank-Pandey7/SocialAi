import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUsers, faRocket, faBuilding, faCode } from "@fortawesome/free-solid-svg-icons";

const STORIES = [
  {
    category: "Content Creator",
    title: "Scale from 1 to 5 platforms without burn out",
    desc: "Turn raw video notes or blog outlines into platform-native posts for X, LinkedIn, Instagram, and Threads in seconds.",
    icon: faUsers,
    stats: "3.5x More Weekly Posts",
    tag: "Solo Creators",
    bgGradient: "linear-gradient(135deg, rgba(109,93,251,0.12) 0%, rgba(59,130,246,0.08) 100%)",
  },
  {
    category: "Growing Startup",
    title: "Build in public and drive organic leads",
    desc: "Maintain a daily founder log, share product milestones, and analyze which feature launches drive the most reach.",
    icon: faRocket,
    stats: "+142% Organic Traffic",
    tag: "SaaS & Tech",
    bgGradient: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(16,185,129,0.08) 100%)",
  },
  {
    category: "Marketing Agency",
    title: "Manage multi-brand social calendars seamlessly",
    desc: "Draft content variations for distinct brand voices, organize post queues, and report engagement metrics to clients.",
    icon: faBuilding,
    stats: "15+ Hours Saved / Week",
    tag: "Agencies",
    bgGradient: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(234,179,8,0.08) 100%)",
  },
  {
    category: "Developer / Founder",
    title: "Transform code updates into viral dev hot takes",
    desc: "Convert commit logs, technical architectural decisions, and dev humor into engaging tech threads that attract top talent.",
    icon: faCode,
    stats: "98/100 Viral Index",
    tag: "Dev Founders",
    bgGradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(147,51,234,0.08) 100%)",
  },
];

export default function Stories() {
  return (
    <section className="sai-stories-section">
      <div className="sai-stories-container">
        <div className="sai-section-header">
          <span className="sai-eyebrow">Product Use Cases</span>
          <h2 className="sai-section-title">Built for creators, teams, and businesses like yours.</h2>
          <p className="sai-section-sub">
            Discover how NEYRIX AI simplifies content creation and audience growth across every industry.
          </p>
        </div>

        {/* Story Cards Grid */}
        <div className="sai-stories-grid">
          {STORIES.map((story) => (
            <div
              key={story.category}
              className="sai-story-card"
              style={{ background: story.bgGradient }}
            >
              <div className="story-card-top">
                <div className="story-icon">
                  <FontAwesomeIcon icon={story.icon} />
                </div>
                <span className="story-tag">{story.tag}</span>
              </div>

              <span className="story-category">{story.category}</span>
              <h3 className="story-title">{story.title}</h3>
              <p className="story-desc">{story.desc}</p>

              <div className="story-card-bottom">
                <span className="story-stats">⚡ {story.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
