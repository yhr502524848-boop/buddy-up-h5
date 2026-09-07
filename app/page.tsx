'use client';

import { useState } from 'react';

const rewards = [
  {
    code: 'TB',
    title: 'Traffic Boost',
    text: 'Your first 2 posts with #buddyup receive official traffic support.',
    tone: 'coral',
  },
  {
    code: 'FR',
    title: 'Limited-edition Frame',
    text: 'Publish 3 posts with 200 viewers each, with most viewers joining the gameplay.',
    tone: 'mint',
  },
  {
    code: '1K',
    title: 'Up to 1000 Points',
    text: 'Create a trending post to earn up to 1000 points.',
    tone: 'yellow',
  },
  {
    code: '★',
    title: 'Official Spotlight',
    text: 'Outstanding posts may become Loopit Picks or be featured by the official account.',
    tone: 'purple',
  },
];

const steps = [
  { number: '1', title: 'Create', text: 'Create a two-player game', mark: '+  +', tone: 'purple' },
  { number: '2', title: 'Invite', text: 'Invite friends via Messages', mark: '•••', tone: 'mint' },
  { number: '3', title: 'Play', text: 'Play together and see your match', mark: '♥', tone: 'coral' },
];

const templates = [
  { label: 'Swipe: Like or Dislike', mark: '↔', tone: 'lavender' },
  { label: 'Hot or Not', mark: 'HOT', tone: 'coral' },
  { label: 'Yes or No', mark: 'YES / NO', tone: 'mint' },
  { label: 'Pick Your Winner', mark: '1ST', tone: 'purple' },
  { label: 'Slap or Hug', mark: 'HI 5', tone: 'orange' },
];

function ChatBubble({ color, className = '' }: { color: string; className?: string }) {
  return (
    <span className={`tiny-chat ${className}`} style={{ background: color }} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [joined, setJoined] = useState(false);

  const join = () => {
    document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setJoined(true);
    window.setTimeout(() => setJoined(false), 3500);
  };

  return (
    <main>
      <a className="skip-link" href="#content">Skip to content</a>

      <section className="hero" aria-labelledby="hero-title">
        <div className="confetti confetti-a" />
        <div className="confetti confetti-b" />
        <div className="announcement">
          <div className="mini-megaphone" aria-hidden="true"><span /></div>
          <div>
            <p>MESSAGES IS NOW LIVE!</p>
            <span>Go chat with your friends now!</span>
          </div>
          <div className="live-bubble" aria-hidden="true"><i /><i /><i /><b>LIVE</b></div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="chat chat-purple"><i /><i /><span>♥</span></div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="chat chat-yellow"><i /><i /><i /></div>
          <div className="puzzle puzzle-left">+</div>
          <div className="puzzle puzzle-right">+</div>
        </div>

        <div className="hero-copy">
          <h1 id="hero-title"><span>BUDDY</span><strong>UP!</strong></h1>
          <p>Make a game. Pick a buddy.<br />Play together.</p>
          <time dateTime="2026-09-11/2026-09-25">SEP.11 — SEP.25</time>
          <button className="primary-cta" type="button" onClick={join}>
            JOIN NOW <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <div id="content" className="event-shell">
        <section className="intro candy-card" aria-labelledby="intro-title">
          <div className="section-copy">
            <p className="eyebrow">活动介绍</p>
            <h2 id="intro-title">What is <span>Buddy Up?</span></h2>
            <p>Create a two-player game, invite your buddy via Messages, then play together to match—or see how well you match.</p>
          </div>
          <div className="buddy-scene" aria-hidden="true">
            <div className="phone phone-left"><span>♥</span></div>
            <div className="connector">···</div>
            <div className="phone phone-right"><span>♥</span></div>
            <ChatBubble color="#ff6547" className="scene-chat" />
          </div>
        </section>

        <div className="two-column">
          <section className="candy-card panel" aria-labelledby="join-title">
            <div className="ribbon purple-ribbon"><h2 id="join-title">How to Join</h2></div>
            <ol className="step-list">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className={`number-badge ${step.tone}`}>{step.number}</span>
                  <span className={`step-mark ${step.tone}`} aria-hidden="true">{step.mark}</span>
                  <span><b>{step.title}</b>{step.text}</span>
                </li>
              ))}
            </ol>
            <div className="reminder">
              <ChatBubble color="#fff" />
              <p>Don&apos;t forget to invite your friend via Messages to unlock rewards.</p>
            </div>
          </section>

          <section className="candy-card panel" aria-labelledby="rewards-title">
            <div className="ribbon mint-ribbon"><h2 id="rewards-title">Rewards</h2></div>
            <ul className="reward-list">
              {rewards.map((reward) => (
                <li key={reward.title}>
                  <span className={`reward-icon ${reward.tone}`} aria-hidden="true">{reward.code}</span>
                  <span><b>{reward.title}</b>{reward.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="showcase candy-card" aria-labelledby="showcase-title">
          <div className="ribbon purple-ribbon wide-ribbon"><h2 id="showcase-title">#buddyup Showcase</h2></div>
          <div className="showcase-grid">
            <article>
              <div className="showcase-art clues" aria-hidden="true"><span>?</span><i /><i /><i /></div>
              <h3>Solve It Together</h3>
            </article>
            <article>
              <div className="showcase-art machine" aria-hidden="true"><span>○</span><i /><i /><i /><i /></div>
              <h3>Gashapon Machine</h3>
            </article>
            <article>
              <div className="showcase-art same-vibe" aria-hidden="true"><span>♥</span><i /><i /></div>
              <h3>Same Vibe?</h3>
            </article>
          </div>
        </section>

        <section id="templates" className="templates candy-card" aria-labelledby="templates-title">
          <div className="ribbon mint-ribbon wide-ribbon"><h2 id="templates-title">Start With a Template</h2></div>
          <p className="template-hint">Choose a template to start your two-player game.</p>
          <div className="template-grid" role="list">
            {templates.map((template, index) => (
              <button
                key={template.label}
                type="button"
                className={`template-card ${template.tone} ${selectedTemplate === index ? 'selected' : ''}`}
                aria-pressed={selectedTemplate === index}
                onClick={() => setSelectedTemplate(index)}
              >
                <span aria-hidden="true">{template.mark}</span>
                <b>{template.label}</b>
              </button>
            ))}
          </div>
          <p className="selection" aria-live="polite">
            Selected: <strong>{templates[selectedTemplate].label}</strong>
          </p>
        </section>

        <section className="powers candy-card" aria-labelledby="powers-title">
          <div className="ribbon purple-ribbon"><h2 id="powers-title">Powers</h2></div>
          <div className="power-grid">
            <article className="invite-power">
              <ChatBubble color="#a94fef" />
              <div><span>邀请 Player 2</span><b>Invite Player 2</b></div>
              <span className="plus-badge" aria-hidden="true">+</span>
            </article>
            <article className="match-power">
              <span className="match-faces" aria-hidden="true"><i>♥</i><i>♥</i></span>
              <div><span>匹配结果</span><b>Match Result</b></div>
            </article>
          </div>
        </section>

        <section className="finale" aria-labelledby="final-title">
          <ChatBubble color="#a94fef" />
          <div>
            <p>Ready, buddy?</p>
            <h2 id="final-title">PLAY. MATCH. WIN.</h2>
          </div>
          <button className="primary-cta final-cta" type="button" onClick={join}>JOIN NOW</button>
        </section>
      </div>

      <div className="mobile-join">
        <button type="button" onClick={join}>JOIN NOW <span aria-hidden="true">→</span></button>
      </div>

      <div className={`toast ${joined ? 'show' : ''}`} role="status" aria-live="polite">
        <span aria-hidden="true">♥</span>
        Pick a template, invite a buddy, and start playing!
      </div>
    </main>
  );
}
