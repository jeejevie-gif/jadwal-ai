import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(request) {
  try {
    const { tasks } = await request.json();

    if (!tasks || tasks.trim() === "") {
      return NextResponse.json(
        { error: "Daftar tugas tidak boleh kosong." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "your_groq_api_key_here") {
      return NextResponse.json(
        { error: "GROQ_API_KEY belum dikonfigurasi. Silakan isi di file .env" },
        { status: 500 }
      );
    }

    const systemPrompt = `Kamu adalah AI asisten akademik cerdas untuk mahasiswa Indonesia. 
Tugasmu adalah menganalisis daftar tugas/kegiatan kuliah yang diberikan mahasiswa, lalu memberikan:
1. Analisis beban kuliah (ringan/sedang/berat) beserta penjelasan singkat
2. Daftar prioritas tugas (urutkan dari yang paling mendesak/penting)
3. Rekomendasi jadwal belajar mingguan yang realistis (Senin–Minggu)

Format respons HARUS dalam JSON yang valid dengan struktur berikut:
{
  "beban_kuliah": {
    "level": "Ringan|Sedang|Berat",
    "skor": 1-10,
    "analisis": "penjelasan singkat 2-3 kalimat",
    "tips": "1 tips utama untuk mahasiswa"
  },
  "prioritas_tugas": [
    {
      "urutan": 1,
      "tugas": "nama tugas",
      "deadline_estimasi": "estimasi waktu",
      "tingkat_urgensi": "Tinggi|Sedang|Rendah",
      "estimasi_jam": "X jam",
      "alasan": "alasan singkat kenapa prioritas ini"
    }
  ],
  "jadwal_mingguan": [
    {
      "hari": "Senin",
      "sesi_pagi": "kegiatan pagi (07:00-12:00)",
      "sesi_siang": "kegiatan siang (13:00-17:00)",
      "sesi_malam": "kegiatan malam (19:00-22:00)",
      "fokus_utama": "tugas/mata kuliah utama hari ini"
    }
  ],
  "motivasi": "pesan motivasi singkat untuk mahasiswa"
}

Pastikan jadwal realistis, seimbang antara belajar dan istirahat, dan sesuai konteks mahasiswa Indonesia.`;

    const userMessage = `Berikut adalah daftar tugas dan kegiatan kuliah saya minggu ini:\n\n${tasks}\n\nTolong analisis dan buatkan jadwal optimal untuk saya.`;

    const groqResponse = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2048,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqResponse.ok) {
      const errData = await groqResponse.json().catch(() => ({}));
      console.error("Groq API error:", errData);
      return NextResponse.json(
        {
          error: `Groq API error: ${groqResponse.status} – ${
            errData?.error?.message || "Unknown error"
          }`,
        },
        { status: groqResponse.status }
      );
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Respons AI kosong. Coba lagi." },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Format respons AI tidak valid. Coba lagi." },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: parsed });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi." },
      { status: 500 }
    );
  }
}
