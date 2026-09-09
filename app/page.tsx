'use client';

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent as ReactMouseEvent, type TouchEvent as ReactTouchEvent } from 'react';

const defaultSpacing = {
  heroX: 16,
  heroBottom: 8,
  heroCopyTop: 56,
  contentTop: 0,
  contentX: 16,
  contentBottom: 72,
  introTop: 20,
  introX: 16,
  introBottom: 20,
  introGap: 0,
  columnsTop: 40,
  columnsGap: 32,
  panelTop: 24,
  panelX: 16,
  panelBottom: 16,
  listGap: 12,
  showcaseTop: 40,
  showcasePadTop: 40,
  showcaseX: 12,
  showcaseBottom: 16,
  showcaseGap: 8,
  templateTop: 40,
  templatePadTop: 40,
  templateX: 12,
  templateBottom: 16,
  templateGap: 8,
  powersTop: 40,
  powersPadTop: 40,
  powersX: 12,
  powersBottom: 16,
  powersGap: 12,
  powerCardY: 12,
  powerCardX: 16,
  powerCardGap: 12,
  finaleTop: 4,
  finalePadding: 16,
  finaleGap: 12,
  finaleMinHeight: 112,
  fixedButtonY: 8,
  fixedButtonX: 16,
  fixedButtonHeight: 52,
  fixedButtonGap: 8,
};

const defaultBackground = '#D9BDFF';
const backgroundSwatches = [
  '#9B68E3',
  '#8F5ED9',
  '#A875E8',
  '#925FD2',
  '#8251C7',
  '#AA7AE8',
  '#B284EE',
  '#7F56C8',
  '#9664DC',
  '#A06BE6',
];

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
      { key: 'fixedButtonY', label: '底栏上下边距' },
      { key: 'fixedButtonX', label: '底栏左右边距' },
      { key: 'fixedButtonHeight', label: '底栏按钮高度' },
      { key: 'fixedButtonGap', label: '底栏按钮图文' },
    ],
  },
];

type RewardIconName = 'boost' | 'frame' | 'points' | 'spotlight';
type RewardIconStyleKey = 'a' | 'b' | 'c' | 'd';

const rewards: Array<{ icon: RewardIconName; title: string; text: string; tone: string }> = [
  {
    icon: 'boost',
    title: 'Traffic Boost',
    text: 'Your first 2 posts with #buddyup receive official traffic support.',
    tone: 'coral',
  },
  {
    icon: 'frame',
    title: 'Limited-edition Frame',
    text: 'Publish 3 posts with 200 viewers each, with most viewers joining the gameplay.',
    tone: 'mint',
  },
  {
    icon: 'points',
    title: 'Up to 1000 Credits',
    text: 'Create a trending post to earn up to 1000 credits.',
    tone: 'yellow',
  },
  {
    icon: 'spotlight',
    title: 'Official Spotlight',
    text: 'Outstanding posts may become Loopit Picks or be featured by the official account.',
    tone: 'purple',
  },
];

const rewardIconStyles: Array<{ key: RewardIconStyleKey; name: string; description: string }> = [
  { key: 'a', name: '果冻软糖', description: '不对称软糖轮廓，圆润饱满，最软萌、最接近 Q 版玩具。' },
  { key: 'b', name: '爆闪贴纸', description: '圆角爆闪轮廓，节奏更活泼，奖励感和视觉冲击更强。' },
  { key: 'c', name: '拼图玩具', description: '圆润拼图轮廓，呼应 Buddy Up 的组队与匹配主题。' },
  { key: 'd', name: '聊天气泡', description: '胖胖的聊天气泡轮廓，更突出邀请好友和社交玩法。' },
];

const steps = [
  { number: '1', title: 'Create', text: 'Create a two-player game', tone: 'purple' },
  { number: '2', title: 'Invite', text: 'Invite friends via Messages', tone: 'mint' },
  { number: '3', title: 'Play', text: 'Play together and see your match', tone: 'coral' },
];

function StepFlowIcon({ step }: { step: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {step === '1' && (
        <>
          <path d="m15.5 5.5 3 3L9 18l-4 1 1-4 9.5-9.5Z" />
          <path d="m13.5 7.5 3 3M6 15l3 3" />
        </>
      )}
      {step === '2' && (
        <>
          <path d="M3 11 21 4l-7 16-3.5-6L3 11Z" />
          <path d="m10.5 14 4-4" />
        </>
      )}
      {step === '3' && (
        <>
          <path d="M7.5 8h9c2 0 3.4 1.2 4 3.7l.9 3.8c.5 2.1-1.8 3.5-3.4 2l-2.1-2H8.1l-2.1 2c-1.6 1.5-3.9.1-3.4-2l.9-3.8C4.1 9.2 5.5 8 7.5 8Z" />
          <path d="M8 11v4M6 13h4M16.5 12h.01M18.5 14h.01" />
        </>
      )}
    </svg>
  );
}

function RewardGlyph({ name }: { name: RewardIconName }) {
  return (
    <>
      {name === 'boost' && (
        <>
          <path d="m4 17 5-5 4 4 7-8" />
          <path d="M15 8h5v5" />
        </>
      )}
      {name === 'frame' && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M8 17c.8-2 2.2-3 4-3s3.2 1 4 3" />
        </>
      )}
      {name === 'points' && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="m12 7.5 1.4 2.8 3.1.5-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.5L12 7.5Z" />
        </>
      )}
      {name === 'spotlight' && (
        <>
          <path d="m12 7 1.6 3.2 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5L12 7Z" />
          <path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4" />
        </>
      )}
    </>
  );
}

function RewardQIcon({ name, styleKey, tone }: { name: RewardIconName; styleKey: RewardIconStyleKey; tone: string }) {
  const shapes: Record<RewardIconStyleKey, string> = {
    a: 'M16 12c6-7 15-3 22-5 10-3 18 4 17 14-.5 6 4 11 1 18-3 7-11 7-16 13-5 6-14 4-19 0-6-4-15-4-16-13-1-7 5-11 5-17 0-4 2-8 6-10Z',
    b: 'M32 4l7 9 11-2-1 11 9 6-8 8 4 10-11 3-3 11-9-7-9 7-3-11-11-3 4-10-8-8 9-6-1-11 11 2 7-9Z',
    c: 'M14 8h12c-1 6 3 10 8 10s9-4 8-10h8a6 6 0 0 1 6 6v10c-6-1-10 3-10 8s4 9 10 8v10a6 6 0 0 1-6 6H42c1-6-3-10-8-10s-9 4-8 10H14a6 6 0 0 1-6-6V40c6 1 10-3 10-8s-4-9-10-8V14a6 6 0 0 1 6-6Z',
    d: 'M32 7C17 7 7 15 7 28c0 8 5 15 13 19l-3 10 13-8h3c15 0 25-8 25-21S47 7 32 7Z',
  };

  return (
    <span className={`reward-q-icon reward-q-${styleKey} ${tone}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path className="reward-q-sticker" d={shapes[styleKey]} />
        <path className="reward-q-shape" d={shapes[styleKey]} />
        <path className="reward-q-highlight" d="M17 19c5-5 11-7 17-6" />
        <circle className="reward-q-spark" cx="46" cy="17" r="2.5" />
        <g className="reward-q-glyph" transform="translate(16 16) scale(1.3333)">
          <RewardGlyph name={name} />
        </g>
      </svg>
    </span>
  );
}

function PurpleChatIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`purple-chat-icon ${className}`.trim()}
      viewBox="0 0 120 112"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="white-chat-body"
        d="M60 8C29 8 8 25 8 51c0 16 9 29 25 36l-4 16c-.8 3.4 3 5.8 5.8 3.8L52 91h8c31 0 52-15 52-40S91 8 60 8Z"
      />
      <path className="white-chat-highlight" d="M25 35c7-11 20-16 35-16" />
      <circle className="white-chat-dot" cx="44" cy="52" r="7" />
      <circle className="white-chat-dot" cx="64" cy="52" r="7" />
      <circle className="white-chat-dot" cx="84" cy="52" r="7" />
    </svg>
  );
}

function HeroTitleGraphic({ idPrefix, className = '' }: { idPrefix: string; className?: string }) {
  const purpleGradient = `${idPrefix}-purple`;
  const mintGradient = `${idPrefix}-mint`;

  return (
    <svg
      className={`hero-title-art ${className}`.trim()}
      viewBox="0 0 760 210"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={purpleGradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c874ff" />
          <stop offset="1" stopColor="#8f3ddd" />
        </linearGradient>
        <linearGradient id={mintGradient} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bf3c6" />
          <stop offset="1" stopColor="#55d992" />
        </linearGradient>
      </defs>
      <g className="hero-title-word">
        <text className="hero-title-outline" style={{ fill: `url(#${purpleGradient})` }} x="380" y="142" textAnchor="middle">buddyup!</text>
        <text className="hero-title-bubble" style={{ fill: `url(#${purpleGradient})`, stroke: `url(#${purpleGradient})` }} x="380" y="142" textAnchor="middle">buddyup!</text>
        <text className="hero-title-trim" x="380" y="142" textAnchor="middle">buddyup!</text>
        <text className="hero-title-fill" x="380" y="142" textAnchor="middle">
          <tspan className="hero-title-buddy">buddy</tspan><tspan className="hero-title-up" style={{ fill: `url(#${mintGradient})` }}>up!</tspan>
        </text>
        <path
          className="hero-title-heart"
          d="M676 91c-18-15-31-27-31-42 0-12 9-20 20-20 7 0 13 4 17 10 4-6 10-10 17-10 11 0 20 8 20 20 0 15-13 27-37 45z"
        />
      </g>
    </svg>
  );
}

function HeroADecorations() {
  return (
    <>
      <i className="hero-spark hero-spark-one" /><i className="hero-spark hero-spark-two" />
      <i className="hero-confetti hero-confetti-one" /><i className="hero-confetti hero-confetti-two" />
      <i className="hero-confetti hero-confetti-three" /><i className="hero-confetti hero-confetti-four" />
      <i className="hero-dot hero-dot-one" /><i className="hero-dot hero-dot-two" /><i className="hero-dot hero-dot-three" />
      <svg className="hero-preview-puzzle hero-preview-puzzle-left" viewBox="0 0 64 64" focusable="false">
        <path d="M14 8h12c-.8 5.5 3 10 8 10s8.8-4.5 8-10h8a6 6 0 0 1 6 6v10c-5.5-.8-10 3-10 8s4.5 8.8 10 8v10a6 6 0 0 1-6 6H42c.8-5.5-3-10-8-10s-8.8 4.5-8 10H14a6 6 0 0 1-6-6V40c5.5.8 10-3 10-8s-4.5-8.8-10-8V14a6 6 0 0 1 6-6Z" />
      </svg>
      <svg className="hero-preview-puzzle hero-preview-puzzle-right" viewBox="0 0 64 64" focusable="false">
        <path d="M14 8h12c-.8 5.5 3 10 8 10s8.8-4.5 8-10h8a6 6 0 0 1 6 6v10c-5.5-.8-10 3-10 8s4.5 8.8 10 8v10a6 6 0 0 1-6 6H42c.8-5.5-3-10-8-10s-8.8 4.5-8 10H14a6 6 0 0 1-6-6V40c5.5.8 10-3 10-8s-4.5-8.8-10-8V14a6 6 0 0 1 6-6Z" />
      </svg>
      <i className="hero-color-block hero-color-block-one" /><i className="hero-color-block hero-color-block-two" />
      <i className="hero-color-block hero-color-block-three" /><i className="hero-color-block hero-color-block-four" />
    </>
  );
}

function HeroPreviewArtwork({ variant }: { variant: 'a' | 'b' | 'c' }) {
  return (
    <div className={`hero-option-stage hero-option-stage-${variant}`}>
      <div className="hero-option-decor" aria-hidden="true">
        {variant === 'a' && (
          <HeroADecorations />
        )}
        {variant === 'b' && (
          <>
            <svg className="hero-orbit" viewBox="0 0 420 260" focusable="false">
              <path d="M44 136C62 45 172 16 276 42c78 20 121 78 100 139-18 52-86 75-157 66" />
            </svg>
            <i className="hero-mini-chat hero-mini-chat-purple"><b>•••</b></i>
            <i className="hero-mini-chat hero-mini-chat-mint"><b>•••</b></i>
            <i className="hero-orbit-heart" />
          </>
        )}
        {variant === 'c' && (
          <>
            <i className="hero-game-sticker hero-game-sticker-two">2P</i>
            <i className="hero-game-sticker hero-game-sticker-play">PLAY!</i>
            <i className="hero-game-plus hero-game-plus-one">+</i>
            <i className="hero-game-plus hero-game-plus-two">+</i>
            <i className="hero-game-pill hero-game-pill-one" /><i className="hero-game-pill hero-game-pill-two" />
          </>
        )}
      </div>
      <img className="hero-option-chat" src="/buddy-up-hero-chat.png" width={1330} height={758} alt="" aria-hidden="true" />
      <div className="hero-option-logo"><HeroTitleGraphic idPrefix={`hero-option-${variant}`} /></div>
      <p>Create something fun. Invite a buddy. Have fun together.</p>
      <time>SEP.11 — SEP.25</time>
    </div>
  );
}

function AmbientFloaters({ region }: { region: 'hero' | 'content' }) {
  const kinds = region === 'hero'
    ? ['bubble', 'star', 'puzzle', 'star', 'bubble', 'puzzle']
    : ['star', 'puzzle', 'bubble', 'star', 'puzzle'];

  return (
    <div className={`ambient-floaters ambient-floaters-${region}`} aria-hidden="true">
      {kinds.map((kind, index) => (
        <svg
          className={`ambient-symbol ambient-${kind} ambient-${region}-${index + 1}`}
          viewBox="0 0 64 64"
          focusable="false"
          key={`${region}-${kind}-${index}`}
        >
          {kind === 'bubble' && (
            <>
              <path d="M8 27C8 15 18 8 32 8s24 7 24 19-10 19-24 19h-4L16 56l3-13C12 40 8 34 8 27Z" />
              <circle cx="24" cy="27" r="3" /><circle cx="32" cy="27" r="3" /><circle cx="40" cy="27" r="3" />
            </>
          )}
          {kind === 'star' && (
            <path d="M32 4c2 17 11 26 28 28-17 2-26 11-28 28-2-17-11-26-28-28C21 30 30 21 32 4Z" />
          )}
          {kind === 'puzzle' && (
            <path d="M14 8h12c-1 6 3 10 8 10s9-4 8-10h8a6 6 0 0 1 6 6v10c-6-1-10 3-10 8s4 9 10 8v10a6 6 0 0 1-6 6H42c1-6-3-10-8-10s-9 4-8 10H14a6 6 0 0 1-6-6V40c6 1 10-3 10-8s-4-9-10-8V14a6 6 0 0 1 6-6Z" />
          )}
        </svg>
      ))}
    </div>
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
  const dragStart = useRef<
    | { input: 'mouse'; y: number; value: number }
    | { input: 'touch'; touchId: number; y: number; value: number }
    | null
  >(null);
  const onChangeRef = useRef(onChange);
  const [dragging, setDragging] = useState(false);
  const top = -(value / 2 + 22);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!dragging) return;

    const updateFromY = (clientY: number) => {
      const start = dragStart.current;
      if (!start) return;
      onChangeRef.current(start.value + Math.round((clientY - start.y) * 2));
    };

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      if (dragStart.current?.input !== 'mouse') return;
      event.preventDefault();
      updateFromY(event.clientY);
    };

    const handleMouseUp = () => {
      if (dragStart.current?.input !== 'mouse') return;
      dragStart.current = null;
      setDragging(false);
    };

    const handleTouchMove = (event: globalThis.TouchEvent) => {
      const start = dragStart.current;
      if (start?.input !== 'touch') return;
      const touch = Array.from(event.touches).find((item) => item.identifier === start.touchId);
      if (!touch) return;
      event.preventDefault();
      updateFromY(touch.clientY);
    };

    const handleTouchEnd = (event: globalThis.TouchEvent) => {
      const start = dragStart.current;
      if (start?.input !== 'touch') return;
      const stillActive = Array.from(event.touches).some((item) => item.identifier === start.touchId);
      if (stillActive) return;
      dragStart.current = null;
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [dragging]);

  const adjustWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    onChange(value + direction * (event.shiftKey ? 8 : 4));
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
      onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        dragStart.current = { input: 'mouse', y: event.clientY, value };
        setDragging(true);
      }}
      onTouchStart={(event: ReactTouchEvent<HTMLDivElement>) => {
        const touch = event.changedTouches[0];
        if (!touch) return;
        event.preventDefault();
        dragStart.current = { input: 'touch', touchId: touch.identifier, y: touch.clientY, value };
        setDragging(true);
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
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [dragEditing, setDragEditing] = useState(false);
  const [showGuides, setShowGuides] = useState(true);
  const [copied, setCopied] = useState(false);
  const [colorCopied, setColorCopied] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(defaultBackground);
  const [spacing, setSpacing] = useState<SpacingState>({ ...defaultSpacing });

  const spacingStyle = Object.fromEntries(
    (Object.keys(spacingVariables) as SpacingKey[]).map((key) => [spacingVariables[key], `${spacing[key]}px`]),
  ) as CSSProperties;
  const pageStyle = { ...spacingStyle, '--page-bg': backgroundColor } as CSSProperties;

  const cssCode = `@media (max-width: 480px), (max-height: 480px) and (max-width: 780px) {\n  main {\n${(Object.keys(spacingVariables) as SpacingKey[])
    .map((key) => `    ${spacingVariables[key]}: ${spacing[key]}px;`)
    .join('\n')}\n  }\n}`;

  const setSpacingValue = (key: SpacingKey, next: number) => {
    if (!Number.isFinite(next)) return;
    const step = key === 'heroBottom' ? 1 : 4;
    const snapped = Math.round(next / step) * step;
    setSpacing((current) => ({ ...current, [key]: Math.max(0, Math.min(240, snapped)) }));
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

  const chooseBackground = (color: string) => {
    setBackgroundColor(color.toUpperCase());
    setColorCopied(false);
  };

  const copyBackgroundColor = async () => {
    try {
      await navigator.clipboard.writeText(backgroundColor.toUpperCase());
      setColorCopied(true);
      window.setTimeout(() => setColorCopied(false), 2200);
    } catch {
      setColorCopied(false);
    }
  };

  const join = () => {
    document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setJoined(true);
    window.setTimeout(() => setJoined(false), 3500);
  };

  return (
    <main
      className={`${dragEditing ? 'spacing-editing' : ''} ${showGuides && dragEditing ? 'spacing-guides' : ''}`.trim()}
      style={pageStyle}
    >
      <a className="skip-link" href="#content">Skip to content</a>

      <section id="reward-icon-preview" className="hero-options-preview reward-icon-preview" aria-labelledby="reward-icon-preview-title">
        <a className="hero-options-close" href="#" aria-label="关闭奖励图标预览">×</a>
        <header className="hero-options-header">
          <span>REWARD ICON OPTIONS</span>
          <h2 id="reward-icon-preview-title">选择奖励图标样式</h2>
          <p>四套方案都采用异形 Q 版轮廓、圆角粗描边和彩色高光，不使用圆形徽章底板。</p>
        </header>
        <div className="reward-icon-options-grid">
          {rewardIconStyles.map((style) => (
            <article className="reward-icon-option" key={style.key}>
              <header><b>{style.key.toUpperCase()}</b><span>{style.name}</span></header>
              <div className="reward-icon-option-stage" aria-label={`${style.name}图标组`}>
                {rewards.map((reward) => (
                  <RewardQIcon
                    name={reward.icon}
                    styleKey={style.key}
                    tone={reward.tone}
                    key={reward.title}
                  />
                ))}
              </div>
              <p>{style.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="hero-preview" className="hero-options-preview" aria-labelledby="hero-preview-title">
        <a className="hero-options-close" href="#" aria-label="关闭头图方案预览">×</a>
        <header className="hero-options-header">
          <span>HEAD IMAGE OPTIONS</span>
          <h2 id="hero-preview-title">选一个头图方向</h2>
          <p>三种方案仅增加装饰元素，主图、标题、文案和日期均保持一致。</p>
        </header>
        <div className="hero-options-grid">
          <article className="hero-option-card">
            <header><b>A</b><span>糖果彩屑</span></header>
            <HeroPreviewArtwork variant="a" />
            <p>星芒、糖果条和彩色圆点，最活泼，氛围接近活动海报。</p>
          </article>
          <article className="hero-option-card">
            <header><b>B</b><span>好友轨道</span></header>
            <HeroPreviewArtwork variant="b" />
            <p>虚线轨道串联双气泡与爱心，更突出“邀请好友一起玩”。</p>
          </article>
          <article className="hero-option-card">
            <header><b>C</b><span>游戏贴纸</span></header>
            <HeroPreviewArtwork variant="c" />
            <p>加入 2P、PLAY! 和加号贴纸，游戏感最强，信息更聚焦。</p>
          </article>
        </div>
      </section>

      <section className="hero" aria-labelledby="hero-title" data-spacing-section="Hero">
        <AmbientFloaters region="hero" />
        <span className="spacing-section-label" aria-hidden="true">Hero</span>
        <div className="announcement">
          <img
            className="announcement-art announcement-megaphone"
            src="/buddy-megaphone-refined.png"
            width={1536}
            height={1024}
            alt=""
            aria-hidden="true"
          />
          <div className="announcement-copy">
            <p>MESSAGES IS NOW LIVE!</p>
            <span>Go chat with your friends now!</span>
          </div>
          <img
            className="announcement-art announcement-live"
            src="/buddy-live-chat-refined.png"
            width={1536}
            height={1024}
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="hero-copy hero-copy-a">
          <div className="hero-a-stage">
            <div className="hero-option-decor hero-main-decor" aria-hidden="true">
              <HeroADecorations />
            </div>
            <img
              className="hero-effects-overlay"
              src="/buddy-up-hero-effects-v2.png"
              width={1269}
              height={1240}
              alt=""
              aria-hidden="true"
            />
            <img
              className="hero-main-art"
              src="/buddy-up-hero-chat.png"
              width={1330}
              height={758}
              alt=""
              aria-hidden="true"
            />
            <h1 id="hero-title" aria-label="Buddy Up!">
              <HeroTitleGraphic idPrefix="hero-title" />
            </h1>
            <p>Create something fun. Invite a buddy. Have fun together.</p>
            <time dateTime="2026-09-11/2026-09-25">SEP.11 — SEP.25</time>
          </div>
        </div>
      </section>

      <div id="content" className="event-shell">
        <AmbientFloaters region="content" />
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
        </section>

        <div className="two-column">
          <SpacingDragHandle
            label="Intro ↕ Rewards"
            value={spacing.columnsTop}
            onChange={(value) => setSpacingValue('columnsTop', value)}
          />
          <section className="candy-card panel rewards-panel" aria-labelledby="rewards-title" data-spacing-section="Rewards">
            <span className="spacing-section-label" aria-hidden="true">Rewards</span>
            <div className="ribbon rewards-ribbon">
              <span className="rewards-ribbon-kicker">PRIZE DROP</span>
              <h2 id="rewards-title">Rewards</h2>
            </div>
            <ol className="reward-list">
              {rewards.map((reward) => (
                <li key={reward.title}>
                  <RewardQIcon name={reward.icon} styleKey="c" tone={reward.tone} />
                  <span><b>{reward.title}</b>{reward.text}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="candy-card panel join-panel" aria-labelledby="join-title" data-spacing-section="How to Join">
            <SpacingDragHandle
              label="Rewards ↕ Join"
              value={spacing.columnsGap}
              onChange={(value) => setSpacingValue('columnsGap', value)}
            />
            <span className="spacing-section-label" aria-hidden="true">How to Join</span>
            <div className="ribbon purple-ribbon"><h2 id="join-title">How to Join</h2></div>
            <ol className="step-flow">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className={`step-flow-icon ${step.tone}`}>
                    <StepFlowIcon step={step.number} />
                  </span>
                  <b>{step.title}</b>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
            <div className="reminder">
              <PurpleChatIcon />
              <p>Don&apos;t forget to invite your friend via Messages to unlock rewards.</p>
            </div>
          </section>
        </div>

        <section className="showcase candy-card" aria-labelledby="showcase-title" data-spacing-section="Showcase">
          <SpacingDragHandle
            label="Join ↕ Showcase"
            value={spacing.showcaseTop}
            onChange={(value) => setSpacingValue('showcaseTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Showcase</span>
          <div className="ribbon purple-ribbon wide-ribbon"><h2 id="showcase-title">#buddyup Showcase</h2></div>
          <div className="showcase-grid" role="region" aria-label="Showcase, swipe horizontally to see more" tabIndex={0}>
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
            <div className="showcase-slot" aria-hidden="true" />
          </div>
          <button className="showcase-cta" type="button">Go check out</button>
        </section>

        <section id="templates" className="templates candy-card" aria-labelledby="templates-title" data-spacing-section="Template">
          <SpacingDragHandle
            label="Showcase ↕ Template"
            value={spacing.templateTop}
            onChange={(value) => setSpacingValue('templateTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Template</span>
          <div className="ribbon mint-ribbon wide-ribbon"><h2 id="templates-title">Start With a Template</h2></div>
          <div className="template-grid" role="region" aria-label="Templates, swipe horizontally to see more" tabIndex={0}>
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
          <div className="power-grid" role="group" aria-label="Power placeholders">
            <div className="power-slot" aria-hidden="true" />
            <div className="power-slot" aria-hidden="true" />
          </div>
        </section>

        <section className="finale" aria-labelledby="final-title" data-spacing-section="Finale">
          <SpacingDragHandle
            label="Powers ↕ Finale"
            value={spacing.finaleTop}
            onChange={(value) => setSpacingValue('finaleTop', value)}
          />
          <span className="spacing-section-label" aria-hidden="true">Finale</span>
          <PurpleChatIcon />
          <div>
            <p>Ready, buddy?</p>
            <h2 id="final-title">PLAY. MATCH. WIN.</h2>
          </div>
          <button className="primary-cta final-cta" type="button" onClick={join}>JOIN NOW!</button>
        </section>
      </div>

      <div className="mobile-join">
        <button type="button" onClick={join}>JOIN NOW!</button>
      </div>

      <div className={`toast ${joined ? 'show' : ''}`} role="status" aria-live="polite">
        <span aria-hidden="true">♥</span>
        Pick a template, invite a buddy, and start playing!
      </div>

      {colorPanelOpen && (
        <aside id="background-color-panel" className="background-color-panel" aria-label="背景颜色选择面板">
          <header className="background-color-header">
            <div>
              <strong>选择背景色</strong>
              <span>实时预览，选好后复制色号发给我</span>
            </div>
            <button type="button" aria-label="关闭背景颜色面板" onClick={() => setColorPanelOpen(false)}>×</button>
          </header>

          <div className="background-color-current">
            <label>
              <input
                type="color"
                value={backgroundColor}
                aria-label="打开系统取色器"
                onChange={(event) => chooseBackground(event.target.value)}
              />
            </label>
            <div>
              <span>当前色号</span>
              <output>{backgroundColor.toUpperCase()}</output>
            </div>
          </div>

          <div className="background-color-swatches" role="group" aria-label="紫色背景预设">
            {backgroundSwatches.map((color) => (
              <button
                key={color}
                type="button"
                className={backgroundColor === color ? 'selected' : ''}
                style={{ background: color }}
                aria-label={`选择背景色 ${color}`}
                aria-pressed={backgroundColor === color}
                onClick={() => chooseBackground(color)}
              />
            ))}
          </div>

          <div className="background-color-actions">
            <button type="button" onClick={() => chooseBackground(defaultBackground)}>恢复原色</button>
            <button className="copy-background-color" type="button" onClick={copyBackgroundColor}>
              {colorCopied ? '已复制 ✓' : '复制色号'}
            </button>
          </div>
        </aside>
      )}

      {panelOpen && (
        <aside id="spacing-panel" className="spacing-panel" aria-label="H5 间距调整面板">
          <header className="spacing-panel-header">
            <div>
              <strong>间距调整</strong>
              <span>桌面与端内 H5</span>
            </div>
            <button type="button" aria-label="关闭间距面板" onClick={() => setPanelOpen(false)}>×</button>
          </header>

          <label className="spacing-guide-toggle">
            <input
              type="checkbox"
              checked={dragEditing}
              onChange={(event) => setDragEditing(event.target.checked)}
            />
            <span>启用页面拖拽手柄</span>
          </label>

          <label className="spacing-guide-toggle compact-toggle">
            <input
              type="checkbox"
              checked={showGuides}
              onChange={(event) => setShowGuides(event.target.checked)}
            />
            <span>显示板块边界与名称</span>
          </label>

          <p className="spacing-panel-help">先点击“收起面板”，再拖动页面上的黄色手柄；PC 与移动端都可调整。完成后点击“复制 CSS”发给我。</p>

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
                          step={control.key === 'heroBottom' ? 1 : 4}
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
