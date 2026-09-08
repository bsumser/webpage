'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Card {
  id: string;
  kanji: string;
  reading: string;
  english: string;
}

interface Player {
  id: string;
  name: string;
  lives: number;
}

// Expanded EIKEN Grade 5 (英検5級) Vocabulary Deck (80 Cards)
const DEFAULT_DECK: Card[] = [
  // --- Nouns & Everyday Objects ---
  { id: 'e1', kanji: '本', reading: 'ほん', english: 'Book' },
  { id: 'e2', kanji: '車', reading: 'くるま', english: 'Car' },
  { id: 'e3', kanji: '学校', reading: 'がっこう', english: 'School' },
  { id: 'e4', kanji: '家', reading: 'いえ', english: 'House' },
  { id: 'e5', kanji: '公園', reading: 'こうえん', english: 'Park' },
  { id: 'e6', kanji: '部屋', reading: 'へや', english: 'Room' },
  { id: 'e7', kanji: '机', reading: 'つくえ', english: 'Desk' },
  { id: 'e8', kanji: '椅子', reading: 'いす', english: 'Chair' },
  { id: 'e9', kanji: '鉛筆', reading: 'えんぴつ', english: 'Pencil' },
  { id: 'e10', kanji: '鞄', reading: 'かばん', english: 'Bag' },
  { id: 'e11', kanji: '時計', reading: 'とけい', english: 'Clock / Watch' },
  { id: 'e12', kanji: '電車', reading: 'でんしゃ', english: 'Train' },

  // --- Food & Drinks ---
  { id: 'e13', kanji: '水', reading: 'みず', english: 'Water' },
  { id: 'e14', kanji: '魚', reading: 'さかな', english: 'Fish' },
  { id: 'e15', kanji: '肉', reading: 'にく', english: 'Meat' },
  { id: 'e16', kanji: '卵', reading: 'たまご', english: 'Egg' },
  { id: 'e17', kanji: '野菜', reading: 'やさい', english: 'Vegetable' },
  { id: 'e18', kanji: '果物', reading: 'くだもの', english: 'Fruit' },
  { id: 'e19', kanji: '茶', reading: 'おちゃ', english: 'Tea' },
  { id: 'e20', kanji: '牛乳', reading: 'ぎゅうにゅう', english: 'Milk' },
  { id: 'e21', kanji: '米', reading: 'こめ / ごはん', english: 'Rice / Meal' },
  { id: 'e22', kanji: 'パン', reading: 'ぱん', english: 'Bread' },

  // --- Animals & Nature ---
  { id: 'e23', kanji: '犬', reading: 'いぬ', english: 'Dog' },
  { id: 'e24', kanji: '猫', reading: 'ねこ', english: 'Cat' },
  { id: 'e25', kanji: '鳥', reading: 'とり', english: 'Bird' },
  { id: 'e26', kanji: '花', reading: 'はな', english: 'Flower' },
  { id: 'e27', kanji: '木', reading: 'き', english: 'Tree' },
  { id: 'e28', kanji: '山', reading: 'やま', english: 'Mountain' },
  { id: 'e29', kanji: '川', reading: 'かわ', english: 'River' },
  { id: 'e30', kanji: '空', reading: 'そら', english: 'Sky' },
  { id: 'e31', kanji: '雨', reading: 'あめ', english: 'Rain' },
  { id: 'e32', kanji: '海', reading: 'うみ', english: 'Sea / Ocean' },

  // --- Family & People ---
  { id: 'e33', kanji: '人', reading: 'ひと', english: 'Person' },
  { id: 'e34', kanji: '友達', reading: 'ともだち', english: 'Friend' },
  { id: 'e35', kanji: '先生', reading: 'せんせい', english: 'Teacher' },
  { id: 'e36', kanji: '父', reading: 'ちち / おとうさん', english: 'Father' },
  { id: 'e37', kanji: '母', reading: 'はは / おかあさん', english: 'Mother' },
  { id: 'e38', kanji: '兄', reading: 'あに / おにいさん', english: 'Older Brother' },
  { id: 'e39', kanji: '姉', reading: 'あね / おねえさん', english: 'Older Sister' },
  { id: 'e40', kanji: '弟', reading: 'おとうと', english: 'Younger Brother' },
  { id: 'e41', kanji: '妹', reading: 'いもうと', english: 'Younger Sister' },
  { id: 'e42', kanji: '子供', reading: 'こども', english: 'Child' },

  // --- Essential Verbs ---
  { id: 'e43', kanji: '食べる', reading: 'たべる', english: 'To eat' },
  { id: 'e44', kanji: '飲む', reading: 'のむ', english: 'To drink' },
  { id: 'e45', kanji: '行く', reading: 'いく', english: 'To go' },
  { id: 'e46', kanji: '来る', reading: 'くる', english: 'To come' },
  { id: 'e47', kanji: '見る', reading: 'みる', english: 'To see / watch' },
  { id: 'e48', kanji: '聞く', reading: 'きく', english: 'To listen / hear' },
  { id: 'e49', kanji: '読む', reading: 'よむ', english: 'To read' },
  { id: 'e50', kanji: '書く', reading: 'かく', english: 'To write' },
  { id: 'e51', kanji: '話す', reading: 'はなす', english: 'To speak' },
  { id: 'e52', kanji: '買う', reading: 'かう', english: 'To buy' },
  { id: 'e53', kanji: '走る', reading: 'はしる', english: 'To run' },
  { id: 'e54', kanji: '歩く', reading: 'あるく', english: 'To walk' },
  { id: 'e55', kanji: '泳ぐ', reading: 'およぐ', english: 'To swim' },
  { id: 'e56', kanji: '遊ぶ', reading: 'あそぶ', english: 'To play' },
  { id: 'e57', kanji: '寝る', reading: 'ねる', english: 'To sleep' },

  // --- Adjectives & Colors ---
  { id: 'e58', kanji: '大きい', reading: 'おおきい', english: 'Big' },
  { id: 'e59', kanji: '小さい', reading: 'ちいさい', english: 'Small' },
  { id: 'e60', kanji: '赤い', reading: 'あかい', english: 'Red' },
  { id: 'e61', kanji: '青い', reading: 'あおい', english: 'Blue' },
  { id: 'e62', kanji: '高い', reading: 'たかい', english: 'High / Expensive' },
  { id: 'e63', kanji: '安い', reading: 'やすい', english: 'Cheap' },
  { id: 'e64', kanji: '新しい', reading: 'あたらしい', english: 'New' },
  { id: 'e65', kanji: '古い', reading: 'ふるい', english: 'Old' },
  { id: 'e66', kanji: '良い', reading: 'いい / よい', english: 'Good' },
  { id: 'e67', kanji: '暑い', reading: 'あつい', english: 'Hot (weather)' },
  { id: 'e68', kanji: '寒い', reading: 'さむい', english: 'Cold (weather)' },
  { id: 'e69', kanji: '楽しい', reading: 'たのしい', english: 'Fun / Enjoyable' },

  // --- Days, Time & Numbers ---
  { id: 'e70', kanji: '今日', reading: 'きょう', english: 'Today' },
  { id: 'e71', kanji: '明日', reading: 'あした', english: 'Tomorrow' },
  { id: 'e72', kanji: '昨日', reading: 'きのう', english: 'Yesterday' },
  { id: 'e73', kanji: '朝', reading: 'あさ', english: 'Morning' },
  { id: 'e74', kanji: '夜', reading: 'よる', english: 'Night' },
  { id: 'e75', kanji: '一つ', reading: 'ひとつ', english: 'One item' },
  { id: 'e76', kanji: '二つ', reading: 'ふたつ', english: 'Two items' },

  // --- Daily Expressions ---
  { id: 'e77', kanji: 'おはよう', reading: 'おはよう', english: 'Good morning' },
  { id: 'e78', kanji: 'こんにちは', reading: 'こんにちは', english: 'Hello / Good afternoon' },
  { id: 'e79', kanji: 'ありがとう', reading: 'ありがとう', english: 'Thank you' },
  { id: 'e80', kanji: 'さようなら', reading: 'さようなら', english: 'Goodbye' },
];

type GamePhase = 'LOBBY' | 'PLAYING' | 'EXPLODED' | 'GAME_OVER';

// Sound synthesis using Web Audio API
class SoundEngine {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playTick(pitchMultiplier = 1) {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500 * pitchMultiplier, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playCorrect() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playExplosion() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.8);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }
}

const sounds = new SoundEngine();

export default function BombGame() {
  const [playerList, setPlayerList] = useState<string[]>([
    'RAGED', 'NATION', 'MEAL', 'ULCERE', 'MINE', 'MAEST', 'GGG',
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [initialLives, setInitialLives] = useState(2);
  const [baseTurnTime, setBaseTurnTime] = useState(12);

  const [phase, setPhase] = useState<GamePhase>('LOBBY');
  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [deck, setDeck] = useState<Card[]>(DEFAULT_DECK);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [showEnglish, setShowEnglish] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);
  const [maxTurnTime, setMaxTurnTime] = useState(12);

  const activePlayer = players[activePlayerIndex];

  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newPlayerName.trim()) return;
    setPlayerList((prev) => [...prev, newPlayerName.trim()]);
    setNewPlayerName('');
  };

  const handleRemovePlayer = (index: number) => {
    if (playerList.length <= 2) return;
    setPlayerList((prev) => prev.filter((_, i) => i !== index));
  };

  const drawNextCard = useCallback(() => {
    setShowEnglish(false);
    setDeck((prevDeck) => {
      let pool = prevDeck.length > 0 ? [...prevDeck] : [...DEFAULT_DECK];
      const randomIndex = Math.floor(Math.random() * pool.length);
      const drawnCard = pool.splice(randomIndex, 1)[0];
      setCurrentCard(drawnCard);
      return pool;
    });
  }, []);

  const resetTimer = useCallback(() => {
    const variation = Math.floor(Math.random() * 5) - 2;
    const duration = Math.max(5, baseTurnTime + variation);
    setTimeLeft(duration);
    setMaxTurnTime(duration);
  }, [baseTurnTime]);

  const startGame = () => {
    if (playerList.length < 2) return;
    const initializedPlayers: Player[] = playerList.map((name, idx) => ({
      id: `p-${idx}`,
      name,
      lives: initialLives,
    }));

    setPlayers(initializedPlayers);
    setActivePlayerIndex(0);
    drawNextCard();
    resetTimer();
    setPhase('PLAYING');
  };

  const handleCorrect = useCallback(() => {
    if (phase !== 'PLAYING') return;
    sounds.playCorrect();

    let nextIndex = (activePlayerIndex + 1) % players.length;
    while (players[nextIndex].lives <= 0) {
      nextIndex = (nextIndex + 1) % players.length;
    }

    setActivePlayerIndex(nextIndex);
    drawNextCard();
    resetTimer();
  }, [phase, activePlayerIndex, players, drawNextCard, resetTimer]);

  const handleWrong = useCallback(() => {
    if (phase !== 'PLAYING') return;
    setTimeLeft((prev) => Math.max(prev - 2, 1));
  }, [phase]);

  const triggerExplosion = useCallback(() => {
    sounds.playExplosion();
    setPhase('EXPLODED');

    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      updated[activePlayerIndex].lives -= 1;

      const alivePlayers = updated.filter((p) => p.lives > 0);
      if (alivePlayers.length <= 1) {
        setTimeout(() => setPhase('GAME_OVER'), 2200);
      }
      return updated;
    });
  }, [activePlayerIndex]);

  const continueGame = () => {
    let nextIndex = (activePlayerIndex + 1) % players.length;
    while (players[nextIndex].lives <= 0) {
      nextIndex = (nextIndex + 1) % players.length;
    }
    setActivePlayerIndex(nextIndex);
    drawNextCard();
    resetTimer();
    setPhase('PLAYING');
  };

  useEffect(() => {
    if (phase !== 'PLAYING') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          triggerExplosion();
          return 0;
        }
        const pitch = 1 + (1 - prev / maxTurnTime) * 0.8;
        sounds.playTick(pitch);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, maxTurnTime, triggerExplosion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (document.activeElement?.tagName === 'INPUT') return;

      if (phase === 'PLAYING') {
        if (e.code === 'ArrowRight' || e.code === 'KeyK') {
          handleCorrect();
        } else if (e.code === 'ArrowLeft' || e.code === 'KeyJ') {
          handleWrong();
        } else if (e.code === 'Space') {
          setShowEnglish((prev) => !prev);
        }
      } else if ((phase === 'EXPLODED' || phase === 'GAME_OVER') && e.code === 'Space') {
        const alivePlayers = players.filter((p) => p.lives > 0);
        if (alivePlayers.length <= 1) {
          setPhase('LOBBY');
        } else {
          continueGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, handleCorrect, handleWrong, players]);

  // Calculate coordinates and exact rotation angle pointing toward active player
  const totalPlayers = players.length;
  const radius = 190;
  
  const activeRadAngle = totalPlayers > 0 ? (activePlayerIndex / totalPlayers) * (2 * Math.PI) - Math.PI / 2 : -Math.PI / 2;
  const activeX = Math.cos(activeRadAngle) * radius;
  const activeY = Math.sin(activeRadAngle) * radius;
  
  // atan2 returns angle in radians relative to positive X-axis; rotate line (pointing down by default) toward player
  const activeAngleDegree = (Math.atan2(activeY, activeX) * 180) / Math.PI - 90;
  const stressRatio = 1 - timeLeft / maxTurnTime;

  return (
    <main className="min-h-screen bg-[#433c38] text-neutral-100 flex flex-col items-center justify-between p-4 font-sans select-none overflow-hidden relative">
      <style>{`
        @keyframes sparkPulse {
          0% { transform: scale(0.9) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
          100% { transform: scale(0.9) rotate(360deg); opacity: 0.8; }
        }
        .spark-animation {
          animation: sparkPulse ${Math.max(0.15, 0.6 - stressRatio * 0.4)}s infinite linear;
        }
      `}</style>

      {/* Top Header */}
      <header className="w-full max-w-5xl flex justify-between items-center py-2 px-4 border-b border-neutral-600/50">
        <h1 className="text-xl font-bold tracking-wide text-amber-200">BOMB PARTY</h1>
        <button
          onClick={() => setPhase('LOBBY')}
          className="text-xs bg-neutral-700/60 hover:bg-neutral-600 px-3 py-1.5 rounded text-neutral-300 font-medium transition-colors"
        >
          {phase === 'LOBBY' ? 'In Setup' : 'Reset Game'}
        </button>
      </header>

      {/* Main Playing Field */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center relative my-4">
        {phase === 'LOBBY' ? (
          /* LOBBY SCREEN */
          <div className="w-full max-w-2xl bg-[#36302d] border border-neutral-600/60 rounded-xl p-6 shadow-2xl space-y-6">
            <h2 className="text-lg font-bold border-b border-neutral-700 pb-2 text-amber-100">Setup Players</h2>

            <form onSubmit={handleAddPlayer} className="flex gap-2">
              <input
                type="text"
                placeholder="Player name..."
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className="flex-1 bg-[#262220] border border-neutral-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 font-bold px-4 py-2 rounded text-sm text-white transition-colors"
              >
                Add
              </button>
            </form>

            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {playerList.map((name, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-[#2b2624] px-3 py-1.5 rounded border border-neutral-700/60 text-sm"
                >
                  <span className="font-medium text-neutral-200 truncate">{name}</span>
                  <button
                    onClick={() => handleRemovePlayer(idx)}
                    disabled={playerList.length <= 2}
                    className="text-neutral-500 hover:text-red-400 font-bold px-1 disabled:opacity-20"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-2 border-t border-neutral-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-300">Starting Hearts:</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => setInitialLives(val)}
                      className={`px-3 py-1 rounded text-xs font-bold border ${
                        initialLives === val
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-[#262220] border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {val} ♥
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-neutral-300">Base Speed:</span>
                <div className="flex gap-1">
                  {[8, 12, 15].map((val) => (
                    <button
                      key={val}
                      onClick={() => setBaseTurnTime(val)}
                      className={`px-3 py-1 rounded text-xs font-bold border ${
                        baseTurnTime === val
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-[#262220] border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {val}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-base shadow-lg transition-transform active:scale-[0.99]"
            >
              Start Match ({playerList.length} Players)
            </button>
          </div>
        ) : (
          /* ARENA SCREEN: RADIAL CIRCLE & CENTRAL BOMB */
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Center Area: Prompt & Bomb */}
            <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
              {/* Turn Text & Kana/Kanji Prompt */}
              {phase === 'PLAYING' && currentCard && (
                <div className="mb-2 text-center min-h-[80px] flex flex-col items-center justify-center">
                  <p className="text-xs text-neutral-300 font-medium">
                    <span className="font-bold text-amber-300">{activePlayer?.name}</span>'s turn:
                  </p>
                  <div className="text-3xl font-black tracking-wider text-white mt-0.5">
                    {currentCard.reading}
                  </div>
                  {currentCard.kanji !== currentCard.reading && (
                    <div className="text-lg font-bold text-amber-300/90 mt-0.5">
                      ({currentCard.kanji})
                    </div>
                  )}
                  {showEnglish && (
                    <div className="text-sm font-semibold text-neutral-300 mt-1 italic animate-fade-in">
                      "{currentCard.english}"
                    </div>
                  )}
                </div>
              )}

              {/* Central Bomb SVG with Rotating Arrow */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* Rotating Yellow Pointer Arrow */}
                {phase === 'PLAYING' && (
                  <div
                    className="absolute w-full h-full flex items-center justify-center transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${activeAngleDegree}deg)` }}
                  >
                    <svg className="w-40 h-40" viewBox="0 0 100 100">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 6 3, 0 6" fill="#f59e0b" />
                        </marker>
                      </defs>
                      <line
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="88"
                        stroke="#f59e0b"
                        strokeWidth="5"
                        strokeLinecap="round"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  </div>
                )}

                {/* Classic Black Bomb Base */}
                <div className="relative w-20 h-20 bg-neutral-900 rounded-full border-2 border-neutral-950 shadow-2xl flex items-center justify-center z-10">
                  <div className="absolute top-2 left-3 w-4 h-2 bg-neutral-700/50 rounded-full rotate-[-30deg]" />
                  <span className="text-xl font-black text-amber-500/90 tracking-tighter">
                    {phase === 'PLAYING' ? `${timeLeft}s` : ''}
                  </span>

                  {/* Fuse Cap */}
                  <div className="absolute -top-2 w-5 h-3 bg-amber-800 rounded-sm border border-amber-950" />

                  {/* Curved Fuse Line */}
                  <svg className="absolute -top-7 right-6 w-8 h-8 pointer-events-none" viewBox="0 0 32 32">
                    <path
                      d="M 10 28 C 12 18, 22 20, 20 6"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Animated Fuse Spark */}
                  {phase === 'PLAYING' && (
                    <div className="absolute -top-8 right-2 w-6 h-6 flex items-center justify-center spark-animation">
                      <svg
                        className="w-full h-full fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Circular Ring of Players */}
            {players.map((player, idx) => {
              const angle = (idx / totalPlayers) * (2 * Math.PI) - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isActive = idx === activePlayerIndex && phase === 'PLAYING';
              const isDead = player.lives <= 0;

              return (
                <div
                  key={player.id}
                  className={`absolute flex flex-col items-center transition-all duration-300 ${
                    isDead ? 'opacity-30 scale-90' : 'opacity-100'
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Hearts Bar Above Avatar */}
                  <div className="flex gap-0.5 mb-1 bg-neutral-900/60 px-1.5 py-0.5 rounded-full border border-neutral-700/50">
                    {Array.from({ length: initialLives }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs leading-none ${
                          i < player.lives ? 'text-red-500' : 'text-neutral-600'
                        }`}
                      >
                        ♥
                      </span>
                    ))}
                  </div>

                  {/* Player Avatar Box */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg transition-all ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-400 scale-110'
                        : 'bg-neutral-800 text-neutral-200 border border-neutral-600'
                    }`}
                  >
                    {player.name.substring(0, 2).toUpperCase()}
                  </div>

                  {/* Player Name Label */}
                  <span
                    className={`text-xs mt-1 font-semibold truncate max-w-[72px] text-center ${
                      isActive ? 'text-amber-300 font-bold' : 'text-neutral-300'
                    }`}
                  >
                    {player.name}
                  </span>
                </div>
              );
            })}

            {/* BOOM Explosion Overlay */}
            {phase === 'EXPLODED' && (
              <div className="absolute inset-0 z-30 bg-neutral-950/80 rounded-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                <h2 className="text-5xl font-black text-red-500 tracking-wider animate-bounce">BOOM!</h2>
                <p className="text-lg mt-2 text-neutral-200">
                  <span className="font-bold text-amber-400">{activePlayer?.name}</span> lost a heart!
                </p>
                <p className="text-xs text-neutral-400 mt-4">Press [SPACE] to continue</p>
              </div>
            )}

            {/* Victory Screen Overlay */}
            {phase === 'GAME_OVER' && (
              <div className="absolute inset-0 z-30 bg-neutral-950/90 rounded-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                <h2 className="text-4xl font-black text-amber-400">VICTORY!</h2>
                <p className="text-xl font-bold mt-2 text-white">
                  {players.find((p) => p.lives > 0)?.name || 'Nobody'} Wins!
                </p>
                <button
                  onClick={() => setPhase('LOBBY')}
                  className="mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded transition-all"
                >
                  Back to Setup Lobby
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Keybindings Footer */}
      <footer className="w-full max-w-2xl bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-700/50 flex justify-around text-xs text-neutral-400 font-mono">
        <div>
          <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200 border border-neutral-700">Space</kbd>{' '}
          Toggle English
        </div>
        <div>
          <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200 border border-neutral-700">→ / K</kbd>{' '}
          Pass Bomb (Correct)
        </div>
        <div>
          <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200 border border-neutral-700">← / J</kbd>{' '}
          Wrong (-2s)
        </div>
      </footer>
    </main>
  );
}