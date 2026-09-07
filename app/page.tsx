'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';

const defaultSpacing = {
  heroX: 10,
  heroBottom: 32,
  heroCopyTop: 40,
  contentTop: 32,
  contentX: 16,
  contentBottom: 104,
  introTop: 24,
  introX: 16,
  introBottom: 20,
  introGap: 16,
  columnsTop: 24,
  columnsGap: 32,
  panelTop: 42,
  panelX: 16,
  panelBottom: 16,
  listGap: 12,
  showcaseTop: 32,
  showcasePadTop: 42,
  showcaseX: 12,
  showcaseBottom: 16,
  showcaseGap: 8,
  templateTop: 32,
  templatePadTop: 42,
  templateX: 12,
  templateBottom: 16,
  templateGap: 8,
  powersTop: 32,
  powersPadTop: 42,
  powersX: 12,
  powersBottom: 16,
  powersGap: 12,
  powerCardY: 12,
  powerCardX: 14,
  powerCardGap: 12,
  finaleTop: 20,
  finalePadding: 14,
  finaleGap: 10,
  finaleMinHeight: 112,
  heroButtonTop: 20,
  heroButtonHeight: 52,
  heroButtonGap: 10,
  fixedButtonY: 8,
  fixedButtonX: 16,
  fixedButtonHeight: 52,
  fixedButtonGap: 10,
};

type SpacingKey = keyof typeof defaultSpacing;
type SpacingState = Record<SpacingKey, number>;

const spacingVariables: Record<SpacingKey, string> = {
  heroX: '--tune-hero-x',
  heroBottom: '--tune-hero-bottom',
  heroCopyTop: '--tune-hero-copy-top',
  contentTop: '--tune-content-top',
  contentX: '--tune-content-x',
  contentBottom: '--tune-content-bottom',
  introTop: '--tune-intro-top',
  introX: '--tune-intro-x',
  introBottom: '--tune-intro-bottom',
  introGap: '--tune-intro-gap',
  columnsTop: '--tune-columns-top',
  columnsGap: '--tune-columns-gap',
  panelTop: '--tune-panel-top',
  panelX: '--tune-panel-x',
  panelBottom: '--tune-panel-bottom',
  listGap: '--tune-list-gap',
  showcaseTop: '--tune-showcase-top',
  showcasePadTop: '--tune-showcase-pad-top',
  showcaseX: '--tune-showcase-x',
  showcaseBottom: '--tune-showcase-bottom',
  showcaseGap: '--tune-showcase-gap',
  templateTop: '--tune-template-top',
  templatePadTop: '--tune-template-pad-top',
  templateX: '--tune-template-x',
  templateBottom: '--tune-template-bottom',
  templateGap: '--tune-template-gap',
  powersTop: '--tune-powers-top',
  powersPadTop: '--tune-powers-pad-top',
  powersX: '--tune-powers-x',
  powersBottom: '--tune-powers-bottom',
  powersGap: '--tune-powers-gap',
  powerCardY: '--tune-power-card-y',
  powerCardX: '--tune-power-card-x',
  powerCardGap: '--tune-power-card-gap',
  finaleTop: '--tune-finale-top',
  finalePadding: '--tune-finale-padding',
  finaleGap: '--tune-finale-gap',
  finaleMinHeight: '--tune-finale-min-height',
  heroButtonTop: '--tune-hero-button-top',
  heroButtonHeight: '--tune-hero-button-height',
  heroButtonGap: '--tune-hero-button-gap',
  fixedButtonY: '--tune-fixed-button-y',
  fixedButtonX: '--tune-fixed-button-x',
  fixedButtonHeight: '--tune-fixed-button-height',
  fixedButtonGap: '--tune-fixed-button-gap',
};

const spacingGroups: Array<{
  title: string;
  controls: Array<{ key: SpacingKey; label: string }>;
}> = [
  {
    title: '页面与 Hero',
    controls: [
      { key: 'heroX', label: 'Hero 左右' },
      { key: 'heroBottom', label: 'Hero 底部' },
      { key: 'heroCopyTop', label: '标题区顶部' },
      { key: 'contentTop', label: '内容区顶部' },
      { key: 'contentX', label: '页面边距' },
      { key: 'contentBottom', label: '内容区底部' },
    ],
  },
  {
    title: '活动介绍',
    controls: [
      { key: 'introTop', label: '上内边距' },
      { key: 'introX', label: '左右内边距' },
      { key: 'introBottom', label: '下内边距' },
      { key: 'introGap', label: '图文间距' },
    ],
  },
  {
    title: 'How to Join / Rewards',
    controls: [
      { key: 'columnsTop', label: '区块上间距' },
      { key: 'columnsGap', label: '两板块间距' },
      { key: 'panelTop', label: '上内边距' },
      { key: 'panelX', label: '左右内边距' },
      { key: 'panelBottom', label: '下内边距' },
      { key: 'listGap', label: '列表图文间距' },
    ],
  },
  {
    title: 'Showcase',
    controls: [
      { key: 'showcaseTop', label: '区块上间距' },
      { key: 'showcasePadTop', label: '上内边距' },
      { key: 'showcaseX', label: '左右内边距' },
      { key: 'showcaseBottom', label: '下内边距' },
      { key: 'showcaseGap', label: '槽位间距' },
    ],
  },
  {
    title: 'Template',
    controls: [
      { key: 'templateTop', label: '区块上间距' },
      { key: 'templatePadTop', label: '上内边距' },
      { key: 'templateX', label: '左右内边距' },
      { key: 'templateBottom', label: '下内边距' },
      { key: 'templateGap', label: '槽位间距' },
    ],
  },
  {
    title: 'Powers',
    controls: [
      { key: 'powersTop', label: '区块上间距' },
      { key: 'powersPadTop', label: '上内边距' },
      { key: 'powersX', label: '左右内边距' },
      { key: 'powersBottom', label: '下内边距' },
      { key: 'powersGap', label: '卡片间距' },
      { key: 'powerCardY', label: '卡片上下' },
      { key: 'powerCardX', label: '卡片左右' },
      { key: 'powerCardGap', label: '卡片图文间距' },
    ],
  },
  {
    title: '结尾板块',
    controls: [
      { key: 'finaleTop', label: '区块上间距' },
      { key: 'finalePadding', label: '内边距' },
      { key: 'finaleGap', label: '内容间距' },
      { key: 'finaleMinHeight', label: '最小高度' },
    ],
  },
  {
    title: '按钮',
    controls: [
      { key: 'heroButtonTop', label: '首屏按钮上距' },
      { key: 'heroButtonHeight', label: '首屏按钮高度' },
      { key: 'heroButtonGap', label: '首屏按钮图文' },
      { key: 'fixedButtonY', label: '底栏上下边距' },
      { key: 'fixedButtonX', label: '底栏左右边距' },
      { key: 'fixedButtonHeight', label: '底栏按钮高度' },
      { key: 'fixedButtonGap', label: '底栏按钮图文' },
    ],
  },
];

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

function ChatBubble({ color, className = '' }: { color: string; className?: string }) {
  return (
    <span className={`tiny-chat ${className}`} style={{ background: color }} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

function SpacingDragHandle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  const dragStart = useRef<{ pointerId: number; y: number; value: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const top = -(value / 2 + 22);

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.pointerId !== event.pointerId) return;
    dragStart.current = null;
    setDragging(false);
  };

  const adjustWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    onChange(value + direction * (event.shiftKey ? 8 : 1));
  };

  return (
    <div
      className={`spacing-drag-handle ${dragging ? 'is-dragging' : ''}`}
      style={{ top }}
      role="slider"
      tabIndex={0}
      aria-label={`${label}，当前 ${value} 像素。上下拖动或使用方向键调整`}
      aria-valuemin={0}
      aria-valuemax={240}
      aria-valuenow={value}
      onKeyDown={adjustWithKeyboard}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        dragStart.current = { pointerId: event.pointerId, y: event.clientY, value };
        setDragging(true);
      }}
      onPointerMove={(event) => {
        const start = dragStart.current;
        if (!start || start.pointerId !== event.pointerId) return;
        onChange(start.value + Math.round((event.clientY - start.y) * 2));
      }}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onLostPointerCapture={() => {
        dragStart.current = null;
        setDragging(false);
      }}
    >
      <span className="spacing-drag-grip" aria-hidden="true"><i /><i /><i /></span>
      <b>{label}</b>
      <output>{value}px</output>
    </div>
  );
}

export default function Home() {
  const [joined, setJoined] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  const [copied, setCopied] = useState(false);
  const [spacing, setSpacing] = useState<SpacingState>({ ...defaultSpacing });

  const spacingStyle = Object.fromEntries(
    (Object.keys(spacingVariables) as SpacingKey[]).map((key) => [spacingVariables[key], `${spacing[key]}px`]),
  ) as CSSProperties;

  const cssCode = `@media (max-width: 480px) {\n  main {\n${(Object.keys(spacingVariables) as SpacingKey[])
    .map((key) => `    ${spacingVariables[key]}: ${spacing[key]}px;`)
    .join('\n')}\n  }\n}`;

  const setSpacingValue = (key: SpacingKey, next: number) => {
    if (!Number.isFinite(next)) return;
    setSpacing((current) => ({ ...current, [key]: Math.max(0, Math.min(240, next)) }));
    setCopied(false);
  };

  const updateSpacing = (key: SpacingKey, value: string) => {
    setSpacingValue(key, Number(value));
  };

  const copySpacing = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const join = () => {
    document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setJoined(true);
    window.setTimeout(() => setJoined(false), 3500);
  };

  return (
    <main
      className={`${panelOpen ? 'spacing-editing' : ''} ${showGuides && panelOpen ? 'spacing-guides' : ''}`.trim()}
      style={spacingStyle}
    >
      <a className="skip-link" href="#content">Skip to content</a>

      <section className="hero" aria-labelledby="hero-title" data-spacing-section="Hero">
        <span className="spacing-section-label" aria-hidden="true">Hero</span>
        <div className="confetti confetti-a" />
        <div className="confetti confetti-b" />
        <div className="announcement">
          <div className="mini-megaphone" aria-hidden="true">
            <i className="mega-cone" />
            <i className="mega-rim" />
            <i className="mega-handle" />
            <i className="mega-shine" />
          </div>
          <div>
            <p>MESSAGES IS NOW LIVE!</p>
            <span>Go chat with your friends now!</span>
          </div>
          <div className="live-bubble" aria-hidden="true">
            <span className="live-tail" />
            <span className="live-dots"><i /><i /><i /></span>
            <b>LIVE</b>
          </div>
        </div>

        <div className="hero-copy">
          <img
            className="hero-main-art"
            src="/buddy-up-hero-chat.png"
            width={1330}
            height={758}
            alt=""
            aria-hidden="true"
          />
          <h1 id="hero-title"><span>BUDDY</span><strong>UP!</strong></h1>
          <p>Make a game. Pick a buddy.<br />Play together.</p>
          <time dateTime="2026-09-11/2026-09-25">SEP.11 — SEP.25</time>
          <button className="primary-cta" type="button" onClick={join}>
            JOIN NOW <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <div id="content" className="event-shell">
        <section className="intro candy-card" aria-labelledby="intro-title" data-spacing-section="Intro">
          <SpacingDragHandle
            label="Hero ↕ Intro"
            value={spacing.contentTop}
            onChange={(value) => setSpacingValue('contentTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Intro</span>
          <div className="section-copy">
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
          <SpacingDragHandle
            label="Intro ↕ Join"
            value={spacing.columnsTop}
            onChange={(value) => setSpacingValue('columnsTop', value)}
          />
          <section className="candy-card panel" aria-labelledby="join-title" data-spacing-section="How to Join">
            <span className="spacing-section-label" aria-hidden="true">How to Join</span>
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

          <section className="candy-card panel" aria-labelledby="rewards-title" data-spacing-section="Rewards">
            <SpacingDragHandle
              label="Join ↕ Rewards"
              value={spacing.columnsGap}
              onChange={(value) => setSpacingValue('columnsGap', value)}
            />
            <span className="spacing-section-label" aria-hidden="true">Rewards</span>
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

        <section className="showcase candy-card" aria-labelledby="showcase-title" data-spacing-section="Showcase">
          <SpacingDragHandle
            label="Rewards ↕ Showcase"
            value={spacing.showcaseTop}
            onChange={(value) => setSpacingValue('showcaseTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Showcase</span>
          <div className="ribbon purple-ribbon wide-ribbon"><h2 id="showcase-title">#buddyup Showcase</h2></div>
          <div className="showcase-grid" role="group" aria-label="Showcase placeholders">
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
          </div>
        </section>

        <section id="templates" className="templates candy-card" aria-labelledby="templates-title" data-spacing-section="Template">
          <SpacingDragHandle
            label="Showcase ↕ Template"
            value={spacing.templateTop}
            onChange={(value) => setSpacingValue('templateTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Template</span>
          <div className="ribbon mint-ribbon wide-ribbon"><h2 id="templates-title">Start With a Template</h2></div>
          <div className="template-grid" role="group" aria-label="Template placeholders">
            <div className="template-slot" aria-hidden="true" />
            <div className="template-slot" aria-hidden="true" />
            <div className="template-slot" aria-hidden="true" />
            <div className="template-slot" aria-hidden="true" />
            <div className="template-slot" aria-hidden="true" />
          </div>
        </section>

        <section className="powers candy-card" aria-labelledby="powers-title" data-spacing-section="Powers">
          <SpacingDragHandle
            label="Template ↕ Powers"
            value={spacing.powersTop}
            onChange={(value) => setSpacingValue('powersTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Powers</span>
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

        <section className="finale" aria-labelledby="final-title" data-spacing-section="Finale">
          <SpacingDragHandle
            label="Powers ↕ Finale"
            value={spacing.finaleTop}
            onChange={(value) => setSpacingValue('finaleTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Finale</span>
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

      <button
        className="spacing-panel-trigger"
        type="button"
        aria-expanded={panelOpen}
        aria-controls="spacing-panel"
        onClick={() => setPanelOpen((open) => !open)}
      >
        {panelOpen ? '收起面板' : '间距面板'}
      </button>

      {panelOpen && (
        <aside id="spacing-panel" className="spacing-panel" aria-label="H5 间距调整面板">
          <header className="spacing-panel-header">
            <div>
              <strong>间距调整</strong>
              <span>端内 H5 · 480px 以下</span>
            </div>
            <button type="button" aria-label="关闭间距面板" onClick={() => setPanelOpen(false)}>×</button>
          </header>

          <label className="spacing-guide-toggle">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(event) => setShowGuides(event.target.checked)}
            />
            <span>显示板块边界与名称</span>
          </label>

          <p className="spacing-panel-help">页面上的黄色手柄可上下拖动板块间距；面板数值用于精确微调。完成后点击“复制 CSS”发给我。</p>

          <div className="spacing-panel-groups">
            {spacingGroups.map((group) => (
              <details key={group.title}>
                <summary>{group.title}<span>{group.controls.length} 项</span></summary>
                <div className="spacing-control-grid">
                  {group.controls.map((control) => (
                    <label className="spacing-control" key={control.key}>
                      <span>{control.label}</span>
                      <span className="spacing-input-wrap">
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="240"
                          step="1"
                          value={spacing[control.key]}
                          onChange={(event) => updateSpacing(control.key, event.target.value)}
                        />
                        <i>px</i>
                      </span>
                    </label>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <textarea className="spacing-code" value={cssCode} readOnly aria-label="当前间距 CSS 代码" />

          <div className="spacing-panel-actions">
            <button type="button" onClick={() => { setSpacing({ ...defaultSpacing }); setCopied(false); }}>恢复默认</button>
            <button className="copy-spacing" type="button" onClick={copySpacing}>{copied ? '已复制 ✓' : '复制 CSS'}</button>
          </div>
        </aside>
      )}
    </main>
  );
}
