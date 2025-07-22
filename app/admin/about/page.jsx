"use client";
import { useEffect, useState } from "react";

export default function AboutPanel() {
  const [aboutText, setAboutText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => setAboutText(data.content || ''));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: aboutText })
    });
    if (res.ok) {
      setMessage("Kaydedildi!");
      setEditMode(false);
    } else {
      setMessage("Hata oluştu!");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Paragrafı silmek istediğine emin misin?")) return;
    setLoading(true);
    setMessage("");
    const res = await fetch('/api/about', { method: 'DELETE' });
    if (res.ok) {
      setAboutText("");
      setMessage("Silindi!");
      setEditMode(false);
    } else {
      setMessage("Hata oluştu!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">About (Hakkımda)</h2>
      {editMode ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[120px]"
            value={aboutText}
            onChange={e => setAboutText(e.target.value)}
            placeholder="Hakkında metni gir..."
            disabled={loading}
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50" disabled={loading}>Kaydet</button>
            <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition" onClick={() => setEditMode(false)} disabled={loading}>İptal</button>
            <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition ml-auto" onClick={handleDelete} disabled={loading}>Sil</button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-6 whitespace-pre-line text-lg">{aboutText || <span className="text-gray-400">Henüz bir metin eklenmedi.</span>}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition" onClick={() => setEditMode(true)}>Düzenle</button>
        </div>
      )}
      {message && <div className="mt-4 text-green-600 font-semibold">{message}</div>}
    </div>
  );
} 