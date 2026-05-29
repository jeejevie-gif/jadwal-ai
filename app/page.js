"use client";

import { useState } from "react";

const IconBrain = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);
const IconCalendar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const IconList = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const IconStar = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconSpinner = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);
const IconAlert = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);
const IconGraduate = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

function UrgencyBadge({ level }) {
  const styles = {
    Tinggi: "bg-red-500/20 text-red-300 border border-red-500/30",
    Sedang: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    Rendah: "bg-green-500/20 text-green-300 border border-green-500/30",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[level] || styles.Sedang}`}>
      {level}
    </span>
  );
}

function LoadBar({ skor }) {
  const pct = Math.min(100, (skor / 10) * 100);
  const color = skor <= 3 ? "from-green-400 to-emerald-500" : skor <= 6 ? "from-yellow-400 to-orange-500" : "from-red-400 to-rose-600";
  return (
    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const EXAMPLE_TASKS = `1. Tugas Pemrograman Web - buat REST API dengan Node.js, deadline Jumat
2. UTS Kalkulus minggu depan Senin, perlu belajar integral dan turunan
3. Presentasi kelompok Manajemen Proyek hari Kamis (belum mulai)
4. Laporan Praktikum Fisika harus dikumpul Rabu
5. Baca 3 jurnal untuk tugas review Metodologi Penelitian
6. Latihan soal Struktur Data untuk kuis Selasa
7. Revisi proposal skripsi sesuai masukan dosen pembimbing`;

const FEATURES = [
  { icon: "⚡", label: "Analisis Cepat", desc: "Hasil dalam detik" },
  { icon: "🎯", label: "Prioritas Cerdas", desc: "Urutan tugas optimal" },
  { icon: "📅", label: "Jadwal Mingguan", desc: "Senin – Minggu" },
  { icon: "🤖", label: "Powered by AI", desc: "LLaMA 3 via Groq" },
];

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function Home() {
  const [tasks, setTasks] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tasks.trim()) { setError("Masukkan daftar tugas terlebih dahulu."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Terjadi kesalahan.");
      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setError(""); setTasks(""); };

  const bebanColor = result?.beban_kuliah?.level === "Ringan" ? "text-green-400"
    : result?.beban_kuliah?.level === "Sedang" ? "text-yellow-400" : "text-red-400";

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
      {/* BG blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(139,92,246,0.2)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl" style={{ background: "rgba(59,130,246,0.2)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">

        {/* HEADER */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}>
            <IconGraduate />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3"
            style={{ background: "linear-gradient(90deg,#a78bfa,#f472b6,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Schedule Optimizer
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Optimalkan jadwal belajarmu dengan kecerdasan buatan. Masukkan tugas-tugasmu, biarkan AI yang atur strateginya.
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: "pulse 2s infinite" }} />
            <span className="text-xs text-gray-500">Powered by Groq · LLaMA 3 8B</span>
          </div>
        </header>

        {/* FEATURE CARDS */}
        {!result && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="rounded-xl p-4 text-center transition-all hover:scale-105 cursor-default"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-white text-sm font-semibold">{f.label}</p>
                <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* INPUT FORM */}
        {!result && (
          <div className="rounded-2xl p-6 md:p-8 mb-8"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg" style={{ background: "rgba(139,92,246,0.2)" }}><IconList /></div>
              <div>
                <h2 className="text-lg font-semibold text-white">Daftar Tugas & Kegiatan</h2>
                <p className="text-sm text-gray-400">Tulis semua tugas, deadline, dan kegiatan kuliah minggu ini</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
                  placeholder={"Contoh:\n1. Tugas Pemrograman Web - deadline Jumat\n2. UTS Kalkulus minggu depan\n3. Presentasi kelompok Kamis\n..."}
                  rows={8}
                  className="w-full rounded-xl px-4 py-3 text-white text-sm leading-relaxed resize-none focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", caretColor: "#a78bfa" }}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-600">{tasks.length} karakter</div>
              </div>
              <button type="button" onClick={() => setTasks(EXAMPLE_TASKS)}
                className="text-xs underline underline-offset-2 transition-colors" style={{ color: "#a78bfa" }}>
                ✨ Isi dengan contoh tugas
              </button>
              {error && (
                <div className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <IconAlert /><p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-sm transition-all"
                style={{ background: loading ? "rgba(139,92,246,0.5)" : "linear-gradient(90deg,#7c3aed,#6366f1)", boxShadow: "0 4px 20px rgba(139,92,246,0.3)", cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? <><IconSpinner /><span>AI sedang menganalisis jadwalmu...</span></> : <><IconBrain /><span>Optimalkan Jadwal Saya</span></>}
              </button>
            </form>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 animate-spin"
                  style={{ borderColor: "rgba(139,92,246,0.2)", borderTopColor: "#8b5cf6" }} />
                <div className="absolute inset-0 flex items-center justify-center"><IconBrain /></div>
              </div>
              <p className="text-white font-medium">AI sedang menganalisis...</p>
              <p className="text-gray-400 text-sm">Membuat jadwal optimal untukmu</p>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {result && !loading && (
          <div className="space-y-6">
            <button onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Analisis ulang
            </button>

            {/* Beban Kuliah */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg" style={{ background: "rgba(59,130,246,0.2)" }}><IconBrain /></div>
                <h2 className="text-lg font-semibold text-white">Analisis Beban Kuliah</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {[
                  { label: "Tingkat Beban", value: result.beban_kuliah?.level, colored: true },
                  { label: "Skor Beban", value: `${result.beban_kuliah?.skor}/10`, colored: false },
                  { label: "Total Tugas", value: `${result.prioritas_tugas?.length || 0} item`, colored: false },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                    <p className={`text-2xl font-bold ${s.colored ? bebanColor : "text-white"}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Ringan</span><span>Sedang</span><span>Berat</span>
              </div>
              <LoadBar skor={result.beban_kuliah?.skor || 0} />
              <p className="text-gray-300 text-sm leading-relaxed mt-4">{result.beban_kuliah?.analisis}</p>
              {result.beban_kuliah?.tips && (
                <div className="mt-4 flex items-start gap-2 rounded-xl px-4 py-3"
                  style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
                  <IconStar /><p className="text-purple-200 text-sm">{result.beban_kuliah.tips}</p>
                </div>
              )}
            </div>

            {/* Prioritas Tugas */}
            {result.prioritas_tugas?.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(249,115,22,0.2)" }}><IconList /></div>
                  <h2 className="text-lg font-semibold text-white">Daftar Prioritas Tugas</h2>
                </div>
                <div className="space-y-3">
                  {result.prioritas_tugas.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-xl p-4 transition-colors"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${idx === 0 ? "bg-yellow-500/30 text-yellow-300" : idx === 1 ? "bg-gray-400/20 text-gray-300" : idx === 2 ? "bg-orange-700/30 text-orange-400" : "bg-white/10 text-gray-400"}`}>
                        {item.urutan || idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <p className="font-medium text-white text-sm">{item.tugas}</p>
                          <UrgencyBadge level={item.tingkat_urgensi} />
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{item.alasan}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          {item.deadline_estimasi && <span>📅 {item.deadline_estimasi}</span>}
                          {item.estimasi_jam && <span>⏱ {item.estimasi_jam}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jadwal Mingguan */}
            {result.jadwal_mingguan?.length > 0 && (
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.2)" }}><IconCalendar /></div>
                  <h2 className="text-lg font-semibold text-white">Rekomendasi Jadwal Mingguan</h2>
                </div>
                <div className="hidden md:block overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        {["Hari","🌅 Pagi (07–12)","☀️ Siang (13–17)","🌙 Malam (19–22)","Fokus Utama"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-gray-400 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {DAYS.map((day, idx) => {
                        const jadwal = result.jadwal_mingguan.find((j) => j.hari?.toLowerCase() === day.toLowerCase()) || result.jadwal_mingguan[idx];
                        if (!jadwal) return null;
                        const isWeekend = day === "Sabtu" || day === "Minggu";
                        return (
                          <tr key={day} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: isWeekend ? "rgba(139,92,246,0.05)" : "transparent" }}>
                            <td className="px-4 py-3"><span className={`font-semibold ${isWeekend ? "text-purple-300" : "text-white"}`}>{jadwal.hari || day}</span></td>
                            <td className="px-4 py-3 text-gray-300">{jadwal.sesi_pagi || "–"}</td>
                            <td className="px-4 py-3 text-gray-300">{jadwal.sesi_siang || "–"}</td>
                            <td className="px-4 py-3 text-gray-300">{jadwal.sesi_malam || "–"}</td>
                            <td className="px-4 py-3">
                              <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{jadwal.fokus_utama || "–"}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="md:hidden space-y-3">
                  {result.jadwal_mingguan.map((jadwal, idx) => {
                    const isWeekend = jadwal.hari === "Sabtu" || jadwal.hari === "Minggu";
                    return (
                      <div key={idx} className="rounded-xl p-4"
                        style={{ background: isWeekend ? "rgba(139,92,246,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${isWeekend ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.1)"}` }}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`font-bold ${isWeekend ? "text-purple-300" : "text-white"}`}>{jadwal.hari}</span>
                          {jadwal.fokus_utama && <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{jadwal.fokus_utama}</span>}
                        </div>
                        <div className="space-y-1.5 text-sm">
                          {jadwal.sesi_pagi && <p className="text-gray-300"><span className="text-gray-500">🌅 Pagi: </span>{jadwal.sesi_pagi}</p>}
                          {jadwal.sesi_siang && <p className="text-gray-300"><span className="text-gray-500">☀️ Siang: </span>{jadwal.sesi_siang}</p>}
                          {jadwal.sesi_malam && <p className="text-gray-300"><span className="text-gray-500">🌙 Malam: </span>{jadwal.sesi_malam}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Motivasi */}
            {result.motivasi && (
              <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="text-3xl mb-3">🎓</div>
                <p className="text-gray-200 text-base italic leading-relaxed max-w-2xl mx-auto">"{result.motivasi}"</p>
              </div>
            )}

            <div className="text-center pb-8">
              <button onClick={handleReset}
                className="py-3 px-8 rounded-xl font-semibold text-white text-sm transition-all"
                style={{ background: "linear-gradient(90deg,#7c3aed,#6366f1)", boxShadow: "0 4px 20px rgba(139,92,246,0.3)" }}>
                🔄 Analisis Jadwal Baru
              </button>
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-600 mt-8 pb-6">
          AI Schedule Optimizer · Dibuat untuk mahasiswa Indonesia 🇮🇩
        </footer>
      </div>
    </div>
  );
}
