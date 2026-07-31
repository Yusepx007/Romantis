"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
} from "framer-motion";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type Screen = 1 | 2 | 3 | 4;

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const FLOWERS = [
  { id: 1, emoji: "🌸", label: "Sakura", x: "10%", y: "8%" },
  { id: 2, emoji: "🌺", label: "Hibiscus", x: "68%", y: "5%" },
  { id: 3, emoji: "🌻", label: "Sunflower", x: "35%", y: "12%" },
  { id: 4, emoji: "🌹", label: "Rose", x: "80%", y: "25%" },
  { id: 5, emoji: "🎁", label: "Gift", x: "5%", y: "38%" },
  { id: 6, emoji: "🌷", label: "Tulip", x: "55%", y: "30%" },
];

const CAPYBARAS = [
  "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫",
  "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫",
  "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫",
  "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫", "🦫",
  "🐾", "🐾", "🌿", "🌿", "🍃", "🌿", "🌸", "🍃",
];

const PHOTOS = [
  { src: "/fitri-1.jpg", rotate: "rotate-2", label: "Manis banget 🌸" },
  { src: "/fitri-2.jpg", rotate: "-rotate-3", label: "Senyumnya bikin mabuk 💛" },
  { src: "/fitri-3.jpg", rotate: "rotate-1", label: "Cantik selalu ✨" },
  { src: "/fitri-4.jpg", rotate: "-rotate-2", label: "Favoritku 💕" },
  { src: "/fitri-5.jpg", rotate: "rotate-3", label: "Manisnya nggak ada obat 🌺" },
  { src: "/fitri-6.jpg", rotate: "-rotate-1", label: "My everything 💌" },
  { src: "/fitri-7.jpg", rotate: "rotate-2", label: "Aku cinta kamu 🤍" },
];

const VIDEOS = [
  "/vid-fitri-1.mp4",
  "/vid-fitri-2.mp4",
  "/vid-fitri-3.mp4",
  "/vid-fitri-4.mp4",
];

// ─────────────────────────────────────────────
// PETAL PARTICLE
// ─────────────────────────────────────────────
function PetalParticles() {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`,
    size: `${10 + Math.random() * 14}px`,
    emoji: ["🌸", "🌺", "🌷", "❤️", "✨", "💕"][Math.floor(Math.random() * 6)],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            top: "-30px",
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 1 — INTRO (QR / Tap to Start)
// ─────────────────────────────────────────────
function Screen1({ onNext }: { onNext: () => void }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    if (tapped) return;
    setTapped(true);
    setTimeout(onNext, 600);
  };

  return (
    <motion.div
      key="screen1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fdf8f0 0%, #f9ddd5 40%, #f5e6c8 70%, #e8d5c4 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-30 blur-3xl"
        style={{ background: "#e8a0a0" }}
      />
      <div
        className="absolute bottom-0 right-0 w-56 h-56 rounded-full opacity-20 blur-3xl"
        style={{ background: "#b5c9b1" }}
      />
      <div
        className="absolute top-1/3 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl"
        style={{ background: "#d4a843" }}
      />

      {/* Stars decoration */}
      {["top-6 left-8", "top-12 right-10", "top-20 left-1/2"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-xl`}
          animate={{ opacity: [0.3, 1, 0.3], rotate: [0, 360] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8 }}
        >
          ✨
        </motion.div>
      ))}

      {/* Top badge */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-6 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
        style={{
          background: "rgba(255,255,255,0.7)",
          color: "#8b5e3c",
          border: "1px solid rgba(196,154,122,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        ✨ 1 Agustus — National Girlfriend Day ✨
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-playfair text-3xl font-bold text-center mb-2"
        style={{ color: "#5a3e2b" }}
      >
        Untuk Sayangku
      </motion.h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-dancing text-4xl font-bold text-center mb-8 shimmer-text"
      >
        Fitri Maharani 💌
      </motion.div>

      {/* Heart QR Frame */}
      <motion.button
        onClick={handleTap}
        className="relative cursor-pointer focus:outline-none no-select"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Glow ring */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "linear-gradient(135deg, #e8a0a0, #d4a843, #b5c9b1)",
            filter: "blur(12px)",
            opacity: 0.5,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Card */}
        <div
          className="relative w-64 h-64 rounded-3xl flex flex-col items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(12px)",
            border: "2px solid rgba(232,160,160,0.5)",
            boxShadow: "0 8px 32px rgba(196,154,122,0.25)",
          }}
        >
          {/* Heart shape made of emojis */}
          <div className="text-6xl mb-2 animate-heartbeat">💝</div>
          <div
            className="grid gap-0.5 mb-2"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-sm"
                style={{
                  background:
                    [2, 6, 8, 10, 12, 14, 16, 18, 22].includes(i)
                      ? "transparent"
                      : i % 3 === 0
                      ? "#e8a0a0"
                      : i % 3 === 1
                      ? "#c49a7a"
                      : "#b5c9b1",
                  opacity:
                    [2, 6, 8, 10, 12, 14, 16, 18, 22].includes(i) ? 0 : 0.85,
                }}
              />
            ))}
          </div>
          <div
            className="text-xs font-semibold tracking-wider"
            style={{ color: "#8b5e3c" }}
          >
            TAP TO OPEN 💌
          </div>
        </div>
      </motion.button>

      {/* Instruction text with breathing animation */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-center font-lato leading-relaxed animate-pulse-soft"
        style={{ color: "#8b5e3c", maxWidth: "280px" }}
      >
        <span className="text-lg font-semibold block mb-1">
          Sayangku Fitri,
        </span>
        <span className="text-sm">
          ada kejutan kecil yang aku siapkan spesial buat kamu hari ini 🌸
          <br />
          <span className="font-semibold">Coba tap gambar ini ya~ 💕</span>
        </span>
      </motion.p>

      {/* Bottom date note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-0 right-0 text-center text-xs"
        style={{ color: "#c49a7a" }}
      >
        dibuat dengan 💛 untuk kamu, 1 Agustus 2026
      </motion.div>

      {/* Floating hearts */}
      {["❤️", "💕", "💛", "🌸"].map((h, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none"
          style={{
            left: `${15 + i * 20}%`,
            bottom: `${15 + (i % 2) * 10}%`,
          }}
          animate={{
            y: [-5, -20, -5],
            opacity: [0.4, 0.9, 0.4],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        >
          {h}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FLOWER DRAG ITEM
// ─────────────────────────────────────────────
interface FlowerItemProps {
  flower: (typeof FLOWERS)[0];
  isCollected: boolean;
  basketRef: React.RefObject<HTMLDivElement | null>;
  onCollect: (id: number) => void;
}

function FlowerItem({ flower, isCollected, basketRef, onCollect }: FlowerItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const checkDrop = useCallback((point: { x: number; y: number }) => {
    if (!basketRef.current) return;
    const basket = basketRef.current.getBoundingClientRect();

    const isOver =
      point.x >= basket.left - 40 &&
      point.x <= basket.right + 40 &&
      point.y >= basket.top - 40 &&
      point.y <= basket.bottom + 40;

    if (isOver) {
      onCollect(flower.id);
    }
  }, [basketRef, flower.id, onCollect]);

  if (isCollected) return null;

  return (
    <motion.div
      ref={itemRef}
      drag
      dragSnapToOrigin={true}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => setDragging(true)}
      onDragEnd={(_event, info) => {
        setDragging(false);
        checkDrop(info.point);
      }}
      className="drag-item absolute flex flex-col items-center cursor-grab active:cursor-grabbing z-20 no-select"
      style={{ left: flower.x, top: flower.y }}
      whileDrag={{ scale: 1.3, zIndex: 50 }}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg"
        style={{
          background: dragging
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.85)",
          border: "2px solid rgba(232,160,160,0.6)",
          backdropFilter: "blur(4px)",
        }}
        animate={!dragging ? { y: [-3, 3, -3] } : {}}
        transition={{ duration: 2 + Math.random(), repeat: Infinity }}
      >
        {flower.emoji}
      </motion.div>
      <span
        className="text-xs mt-1 font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.8)",
          color: "#8b5e3c",
          backdropFilter: "blur(4px)",
        }}
      >
        {flower.label}
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 2 — DRAG & DROP GAME
// ─────────────────────────────────────────────
function Screen2({ onNext }: { onNext: () => void }) {
  const [collected, setCollected] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const basketRef = useRef<HTMLDivElement>(null);

  const handleCollect = useCallback(
    (id: number) => {
      setCollected((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        if (next.length === FLOWERS.length) {
          setTimeout(() => setShowModal(true), 400);
        }
        return next;
      });
    },
    []
  );

  return (
    <motion.div
      key="screen2"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col min-h-screen overflow-hidden garden-bg"
    >
      {/* Sky clouds */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none">
        {[
          { left: "5%", top: "8%", size: "60px" },
          { left: "55%", top: "4%", size: "80px" },
          { left: "30%", top: "15%", size: "50px" },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-80"
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: parseInt(c.size) * 0.55 + "px",
              background: "white",
            }}
            animate={{ x: [0, 12, 0] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity }}
          />
        ))}
        {/* Sun */}
        <motion.div
          className="absolute top-3 right-6 text-4xl"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          ☀️
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-14 px-4 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1.5 rounded-full mb-2 text-xs font-bold tracking-wider uppercase"
          style={{
            background: "rgba(255,255,255,0.85)",
            color: "#5a9e5a",
            border: "1.5px solid rgba(90,158,90,0.4)",
          }}
        >
          🌸 Mini Game — Buat Buket Fitri
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-semibold"
          style={{ color: "#2d5a2d" }}
        >
          Seret semua bunga ke keranjang ya, sayang~ 💕
        </motion.p>

        {/* Counter */}
        <motion.div
          className="mt-3 flex items-center justify-center gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <div
            className="px-4 py-1.5 rounded-full font-bold text-sm flex gap-1 items-center"
            style={{
              background: "rgba(255,255,255,0.9)",
              color: "#8b5e3c",
              border: "1.5px solid rgba(196,154,122,0.5)",
            }}
          >
            {Array.from({ length: FLOWERS.length }).map((_, i) => (
              <span
                key={i}
                className="text-base transition-all duration-300"
                style={{
                  filter: collected.length > i ? "none" : "grayscale(1) opacity(0.3)",
                  transform: collected.length > i ? "scale(1.2)" : "scale(1)",
                }}
              >
                🌸
              </span>
            ))}
            <span className="ml-2">
              {collected.length}/{FLOWERS.length}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Game area — flowers */}
      <div className="relative flex-1 mt-4 mx-4" style={{ minHeight: "340px" }}>
        {FLOWERS.map((flower) => (
          <FlowerItem
            key={flower.id}
            flower={flower}
            isCollected={collected.includes(flower.id)}
            basketRef={basketRef}
            onCollect={handleCollect}
          />
        ))}

        {/* Grass layer */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 grass-pattern rounded-t-3xl"
          style={{ background: "linear-gradient(180deg, #7ab87a, #5a9e5a)" }}
        >
          {/* Flowers on ground */}
          {["🌻", "🌿", "🌼", "🌿", "🌻"].map((f, i) => (
            <span
              key={i}
              className="absolute bottom-2 text-xl"
              style={{ left: `${8 + i * 20}%` }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Basket */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <motion.div
            ref={basketRef}
            className="relative w-24 h-20 flex items-center justify-center"
            animate={{ scale: collected.length > 0 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Drop zone glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "rgba(232,160,160,0.3)" }}
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <div className="text-6xl relative z-10">🧺</div>
            {collected.length > 0 && (
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [-5, 0] }}
              >
                {"🌸".repeat(Math.min(collected.length, 3))}
              </motion.div>
            )}
          </motion.div>
          <div
            className="text-xs font-bold mt-1 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.8)", color: "#5a9e5a" }}
          >
            ← Seret ke sini →
          </div>
        </div>
      </div>

      {/* Collected flowers celebration */}
      <AnimatePresence>
        {collected.map((id) => {
          const f = FLOWERS.find((fl) => fl.id === id);
          return f ? (
            <motion.div
              key={`collected-${id}`}
              className="fixed text-2xl pointer-events-none z-40"
              initial={{ x: "50vw", y: "70vh", scale: 1, opacity: 1 }}
              animate={{ y: "110vh", scale: 0.3, opacity: 0 }}
              transition={{ duration: 1.2 }}
            >
              {f.emoji}
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl p-8 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #fdf8f0, #f9ddd5)",
                border: "2px solid rgba(232,160,160,0.5)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
              initial={{ scale: 0.5, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              {/* Confetti emojis */}
              {["🎊", "🎉", "✨", "💕", "🌸"].map((e, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl pointer-events-none"
                  style={{ left: `${10 + i * 18}%`, top: "-10px" }}
                  animate={{ y: [0, 60, 0], opacity: [1, 0.3, 1], rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {e}
                </motion.div>
              ))}

              <div className="text-6xl mb-4 animate-float">💐</div>
              <h2
                className="font-playfair text-2xl font-bold mb-3"
                style={{ color: "#5a3e2b" }}
              >
                Wah hebat, sayang! 🎉
              </h2>
              <p
                className="font-lato text-sm leading-relaxed mb-6"
                style={{ color: "#8b5e3c" }}
              >
                Buketnya udah jadi buat kamu, Fitri ❤️
                <br />
                Ini buket pertanda betapa sayangnya aku sama kamu~
              </p>
              <motion.button
                onClick={onNext}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
                style={{
                  background: "linear-gradient(135deg, #e8a0a0, #c97070)",
                  boxShadow: "0 4px 15px rgba(201,112,112,0.4)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(201,112,112,0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                Lanjut yuk~ 🌸
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 3 — HIDDEN OBJECT
// ─────────────────────────────────────────────
function Screen3({ onNext }: { onNext: () => void }) {
  const [found, setFound] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHint(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      key="screen3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col min-h-screen overflow-hidden"
      style={{ background: "#fdf8f0" }}
    >
      {/* Header */}
      <div className="relative z-10 pt-10 px-5 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 rounded-full mb-3 text-xs font-bold tracking-wider uppercase"
          style={{
            background: "rgba(181,201,177,0.3)",
            color: "#5a9e5a",
            border: "1.5px solid rgba(181,201,177,0.6)",
          }}
        >
          🔍 Cari Surat Tersembunyi
        </motion.div>
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-playfair text-xl font-bold mb-1"
          style={{ color: "#5a3e2b" }}
        >
          Ada surat yang nyempil nih~
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm"
          style={{ color: "#8b5e3c" }}
        >
          Coba cari dan tap ya! 🔍
        </motion.p>

        {/* Hint */}
        <AnimatePresence>
          {hint && !found && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs mt-2 animate-pulse-soft"
              style={{ color: "#c49a7a" }}
            >
              💡 Psst… coba cek pojok kanan bawah area kapibara~
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Capybara field */}
      <div className="relative flex-1 px-2 pt-4 overflow-hidden">
        <div
          className="relative rounded-3xl overflow-hidden mx-2"
          style={{
            background: "linear-gradient(160deg, #f0e8d8, #e8d5c4)",
            border: "2px solid rgba(196,154,122,0.3)",
            minHeight: "420px",
          }}
        >
          {/* Shuffle capybaras into a grid */}
          <div
            className="grid gap-1 p-3"
            style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {CAPYBARAS.map((c, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center text-2xl"
                style={{ height: "44px" }}
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5 + (i % 5) * 0.3,
                  repeat: Infinity,
                  delay: (i % 7) * 0.2,
                }}
              >
                {c}
              </motion.div>
            ))}
          </div>

          {/* Hidden envelope — positioned at a specific spot */}
          <motion.button
            onClick={() => setFound(true)}
            className="absolute z-20 focus:outline-none"
            style={{
              right: "14%",
              bottom: "18%",
              width: "36px",
              height: "36px",
            }}
            animate={{
              scale: [1, 1.08, 1],
              rotate: [-3, 3, -3],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            aria-label="Amplop surat tersembunyi"
          >
            {/* Very subtle — blends in */}
            <div
              className="w-full h-full rounded-lg flex items-center justify-center text-xl"
              style={{
                background: "rgba(255,240,200,0.3)",
                border: "1px solid rgba(196,154,122,0.2)",
              }}
            >
              📩
            </div>
          </motion.button>

          {/* Grass / ground decoration */}
          <div
            className="absolute bottom-0 left-0 right-0 h-10 rounded-b-3xl flex items-center px-3 gap-1"
            style={{ background: "rgba(181,201,177,0.4)" }}
          >
            {["🌿", "🌱", "🌿", "🌱", "🌿", "🌱", "🌿"].map((g, i) => (
              <span key={i} className="text-lg">{g}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Found overlay */}
      <AnimatePresence>
        {found && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-full max-w-xs rounded-3xl p-8 text-center relative"
              style={{
                background: "linear-gradient(160deg, #fff9f0, #f9ddd5)",
                border: "2px solid rgba(232,160,160,0.5)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              }}
              initial={{ scale: 0.4, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [-10, 10, -10], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💌
              </motion.div>
              <h2
                className="font-playfair text-2xl font-bold mb-2"
                style={{ color: "#5a3e2b" }}
              >
                Ketemu! ✨
              </h2>
              <p className="text-sm mb-6" style={{ color: "#8b5e3c" }}>
                Selamat kamu berhasil nemuin suratnya, sayang!
                <br />
                Yuk sekarang kita buka sama-sama~ 💕
              </p>
              <motion.button
                onClick={onNext}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
                style={{
                  background: "linear-gradient(135deg, #c49a7a, #8b5e3c)",
                  boxShadow: "0 4px 15px rgba(139,94,60,0.4)",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Buka Surat 💌
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// SCREEN 4 — LOVE LETTER + GALLERY + VIDEO
// ─────────────────────────────────────────────
function Screen4() {
  const [shareClicked, setShareClicked] = useState(false);

  return (
    <motion.div
      key="screen4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-screen overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #fdf8f0 0%, #f9ddd5 30%, #fdf8f0 60%, #f5e6c8 100%)",
      }}
    >
      {/* Petal rain */}
      <PetalParticles />

      {/* Header decoration */}
      <div className="relative pt-10 pb-6 px-5 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: "#e8a0a0" }}
        />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-5xl mb-3 inline-block animate-heartbeat"
        >
          💌
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div
            className="font-dancing text-4xl font-bold shimmer-text mb-1"
          >
            Surat Cinta
          </div>
          <div
            className="font-playfair text-lg italic"
            style={{ color: "#8b5e3c" }}
          >
            untuk Fitri Maharani
          </div>
        </motion.div>

        {/* Date badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: "rgba(232,160,160,0.2)",
            color: "#c97070",
            border: "1px solid rgba(232,160,160,0.4)",
          }}
        >
          ❤️ 1 Agustus 2026 — National Girlfriend Day
        </motion.div>
      </div>

      {/* Love Letter */}
      <motion.div
        className="mx-4 mb-8 rounded-3xl p-6 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          border: "1.5px solid rgba(232,160,160,0.3)",
          boxShadow: "0 4px 24px rgba(196,154,122,0.15)",
        }}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {/* Paper texture decoration */}
        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #e8a0a0, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-16 h-16 opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #d4a843, transparent)",
          }}
        />

        <div
          className="font-dancing text-2xl mb-4 text-center"
          style={{ color: "#c97070" }}
        >
          ✦ Untuk Kamu ✦
        </div>

        <div className="letter-content font-lato text-sm">
          <p>
            Fitri Maharani... nama itu sudah menjadi bagian dari setiap doa yang aku
            panjatkan, setiap napas yang aku hirup, dan setiap hal kecil yang bikin aku
            tersenyum tanpa alasan yang jelas. 💕
          </p>
          <p>
            Hari ini, tepat 1 Agustus — hari yang diperingati sebagai{" "}
            <strong>National Girlfriend Day</strong> — aku, De Yusep Purnama Satria,
            ingin mengucapkan sesuatu yang selama ini selalu aku rasakan tapi mungkin
            belum pernah aku ungkapkan cukup dalam:
            <em> kamu adalah segalanya bagiku.</em>
          </p>
          <p>
            Sayang, meskipun ratusan kilometer membentang di antara kita dan kita terpisah oleh jarak, kamu adalah
            <strong> pasanganku</strong> — dalam arti yang paling penuh dan paling tulus.
            Jarak memang memisahkan raga kita, tapi tidak pernah sekalipun bisa mengurangi rasa sayang dan rinduku padamu. Betapa beruntungnya aku bisa menyebutmu milikku... 🌸
          </p>
          <p>
            Tahu nggak, ay? Berjuang dalam hubungan LDR ini membuat aku makin kagum sama kamu. Cara kamu tetap setia, cara kamu menyapa lewat pesan dan suara tiap hari, dan cara kamu selalu memberikan kehangatan meskipun kita hanya bisa saling tatap di layar — itu semua luar biasa. Kamu adalah rumah tempat hatiku selalu pulang, sejauh apa pun aku berada. ☀️
          </p>
          <p>
            Setiap kali rindu ini datang melanda, aku selalu membayangkan momen di mana nanti kita bisa bertemu langsung, duduk berdua tanpa perantara layar, dan memelukmu erat. Rasa rindu ini adalah bukti betapa berharganya kamu dalam hidupku, ay. 💛
          </p>
          <p>
            Kamu adalah alasanku untuk terus semangat berkembang dan berjuang setiap harinya. Setiap kali aku merasa lelah, mengingat senyummu di video call selalu jadi obat dan kekuatan terbaik buat aku. 🌺
          </p>
          <p>
            Makasih ya, sayang... Makasih udah selalu sabar, tulus, dan bertahan berjuang bersama dalam jarak ini. Makasih udah memilih untuk selalu ada buat aku, De Yusep Purnama Satria, yang tidak pernah berhenti bersyukur memiliki pasangan hebat sepertimu. 💌
          </p>
          <p>
            Oh ya, satu hal lagi yang aku mau bilang — dan ini aku bilang dengan penuh sayang ya, sayang 😄 Aku udah hafal banget sama polamu: tiba-tiba drama, tiba-tiba marah tanpa alasan yang jelas, tiba-tiba bilang "udah putus aja" atau nuduh yang bukan-bukan... padahal aku tau banget, <em>itu semua cuma kangen yang ketahan sama gengsi</em>. 🙈 Kamu nggak perlu drama segitu buat bilang kangen sama aku, sayang. Next time, bilang aja langsung — aku selalu siap dengerin dan ada buat kamu. Karena sebenarnya, setiap kali kamu drama, hatiku juga kangen kamu sama kerasnya. 😅💕
          </p>
          <p>
            Di hari istimewa ini, aku cuma pengen kamu tahu satu hal:
            {" "}<strong>aku mencintaimu sepenuhnya</strong>. Jarak ini cuma ujian sementara, dan aku percaya kita pasti bisa melaluinya bersama hingga saatnya tiba kita tidak perlu terpisah oleh jarak lagi. 💕
          </p>
          <p>
            Aku cinta kamu, Fitri Maharani. Sekarang, besok, dan selamanya.
            Selamat merayakan National Girlfriend Day, sayangku. ❤️
          </p>
        </div>

        <div className="mt-6 text-center">
          <div
            className="font-dancing text-xl mb-1"
            style={{ color: "#8b5e3c" }}
          >
            Dengan segenap cinta dan ketulusan,
          </div>
          <div
            className="font-dancing text-2xl font-bold shimmer-text"
          >
            De Yusep Purnama Satria 💌
          </div>
          <div
            className="text-xs mt-2"
            style={{ color: "#c49a7a" }}
          >
            Pasanganmu yang selalu menyayangimu ❤️
          </div>
        </div>
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        className="px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="text-center mb-4">
          <div
            className="font-playfair text-xl font-bold mb-1"
            style={{ color: "#5a3e2b" }}
          >
            📸 Galeri Memori Kita
          </div>
          <p className="text-xs" style={{ color: "#8b5e3c" }}>
            Momen-momen indah bersamamu yang selalu aku kenang 💕
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className={`polaroid ${photo.rotate}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: parseInt(photo.rotate.replace(/[^-\d]/g, "")) }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
            >
              <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={`Foto Fitri ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className="text-center mt-2 font-dancing text-xs"
                style={{ color: "#8b5e3c" }}
              >
                {photo.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div
        className="px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="text-center mb-4">
          <div
            className="font-playfair text-xl font-bold mb-1"
            style={{ color: "#5a3e2b" }}
          >
            🎬 Video Kenangan
          </div>
          <p className="text-xs" style={{ color: "#8b5e3c" }}>
            Semua momen bergerak yang bikin aku senyum sendiri 🥹
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {VIDEOS.map((src, i) => (
            <motion.div
              key={i}
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{ border: "2px solid rgba(232,160,160,0.3)" }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.15 }}
            >
              <video
                src={src}
                controls
                playsInline
                loop
                className="w-full"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <div
                className="px-3 py-2 text-xs font-dancing text-center"
                style={{ background: "rgba(255,255,255,0.8)", color: "#8b5e3c" }}
              >
                {i === 0 && "Moment favoritku ❤️"}
                {i === 1 && "Kamu selalu cantik 🌸"}
                {i === 2 && "Senang banget bisa sama kamu 💕"}
                {i === 3 && "Cinta aku buat kamu nggak ada habisnya 💛"}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Share Button */}
      <motion.div
        className="px-4 pb-12 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <div className="text-center mb-2">
          <div className="text-3xl mb-1">🌸</div>
          <p className="text-xs font-semibold" style={{ color: "#8b5e3c" }}>
            Suka sama surprise ini? 💕
          </p>
        </div>

        <motion.button
          onClick={() => setShareClicked(true)}
          className="w-full max-w-xs py-4 rounded-2xl font-bold text-white text-sm relative overflow-hidden"
          style={{
            background: shareClicked
              ? "linear-gradient(135deg, #b5c9b1, #7a9e75)"
              : "linear-gradient(135deg, #e8a0a0, #c97070, #8b5e3c)",
            boxShadow: shareClicked
              ? "0 4px 15px rgba(122,158,117,0.4)"
              : "0 4px 20px rgba(201,112,112,0.45)",
          }}
          whileHover={{ scale: 1.03, boxShadow: "0 6px 25px rgba(201,112,112,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          {/* shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {shareClicked ? (
              <>✅ Makasih udah mau buka kejutan ini, sayang! 💕</>
            ) : (
              <>
                <span className="text-lg">📤</span>
                Bagikan ke Story
              </>
            )}
          </span>
        </motion.button>

        <AnimatePresence>
          {shareClicked && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-6 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(196,154,122,0.3)",
              }}
            >
              <p
                className="font-dancing text-lg"
                style={{ color: "#8b5e3c" }}
              >
                Aku cinta kamu, Fitri Maharani 💌
              </p>
              <p className="text-xs mt-1" style={{ color: "#c49a7a" }}>
                Selamanya dan seterusnya ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: "#c49a7a" }}>
            dibuat dengan sepenuh hati 💛
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#c49a7a" }}>
            1 Agustus 2026 — National Girlfriend Day
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// PROGRESS DOTS
// ─────────────────────────────────────────────
function ProgressDots({ screen }: { screen: Screen }) {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30 pointer-events-none">
      {([1, 2, 3, 4] as Screen[]).map((s) => (
        <motion.div
          key={s}
          className="rounded-full"
          animate={{
            width: screen === s ? "20px" : "8px",
            background: screen === s ? "#c97070" : "rgba(196,154,122,0.4)",
          }}
          style={{ height: "8px" }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MUSIC PLAYER
// ─────────────────────────────────────────────
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;

    const playAudio = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    // Attempt immediate playback on mount
    playAudio();

    // Attach listeners for any early user gesture as fallback if browser blocked immediate autoplay
    const events = ["pointerdown", "touchstart", "click", "keydown", "scroll"];
    const handleGesture = () => {
      playAudio();
      events.forEach((evt) => window.removeEventListener(evt, handleGesture));
    };

    events.forEach((evt) => window.addEventListener(evt, handleGesture, { passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleGesture));
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        autoPlay
        loop
        preload="auto"
        onCanPlay={() => {
          setReady(true);
          audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
        }}
      />

      <motion.div
        className="fixed top-4 right-4 z-40 flex items-center gap-2"
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      >
        {/* Song title ticker — shown when playing */}
        <AnimatePresence>
          {playing && (
            <motion.div
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: "auto" }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="overflow-hidden"
            >
              <div
                className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(10px)",
                  color: "#8b5e3c",
                  border: "1px solid rgba(196,154,122,0.3)",
                  boxShadow: "0 2px 12px rgba(196,154,122,0.2)",
                }}
              >
                🎵 Perfect — Ed Sheeran
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player button */}
        <motion.button
          onClick={toggle}
          className="relative flex items-center justify-center focus:outline-none"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(232,160,160,0.5)",
            boxShadow: "0 4px 16px rgba(196,154,122,0.3)",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {/* Vinyl spin ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid transparent",
              borderTopColor: "#e8a0a0",
              borderRightColor: "#d4a843",
            }}
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 2,
              repeat: playing ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Waveform bars — shown when playing */}
          {playing ? (
            <div className="flex items-end gap-0.5" style={{ height: "16px" }}>
              {[1, 2, 3, 4].map((b) => (
                <motion.div
                  key={b}
                  className="rounded-full"
                  style={{ width: "3px", background: "#c97070" }}
                  animate={{ height: ["4px", `${6 + b * 3}px`, "4px"] }}
                  transition={{
                    duration: 0.5 + b * 0.1,
                    repeat: Infinity,
                    delay: b * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          ) : (
            // Play icon
            <svg width="14" height="14" viewBox="0 0 14 14" fill="#c97070">
              <polygon points="2,1 13,7 2,13" />
            </svg>
          )}
        </motion.button>

        {/* Loading pulse if not ready */}
        {!ready && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "rgba(232,160,160,0.2)", top: 0, right: 0, width: "44px", height: "44px" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function RomanticPage() {
  const [screen, setScreen] = useState<Screen>(1);

  return (
    <div
      className="max-w-md mx-auto min-h-screen overflow-hidden relative shadow-2xl"
      style={{ background: "#e8d5c4" }}
    >
      <AnimatePresence mode="wait">
        {screen === 1 && (
          <Screen1 key="s1" onNext={() => setScreen(2)} />
        )}
        {screen === 2 && (
          <Screen2 key="s2" onNext={() => setScreen(3)} />
        )}
        {screen === 3 && (
          <Screen3 key="s3" onNext={() => setScreen(4)} />
        )}
        {screen === 4 && (
          <Screen4 key="s4" />
        )}
      </AnimatePresence>

      <MusicPlayer />
      <ProgressDots screen={screen} />
    </div>
  );
}
