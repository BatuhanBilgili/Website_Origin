"use client";
import { useEffect, useState } from "react";

export default function ExperiencePanel() {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({ title: '', company: '', date: '', isCurrent: false, description: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchExperiences = () => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data));
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/experience?id=${editingId}` : '/api/experience';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Kaydedildi!');
      setForm({ title: '', company: '', date: '', isCurrent: false, description: '' });
      setEditingId(null);
      fetchExperiences();
    } else {
      setMessage('Hata oluştu.');
    }
    setLoading(false);
  };

  const handleEdit = exp => {
    setForm({
      title: exp.title,
      company: exp.company,
      date: exp.date,
      isCurrent: exp.isCurrent,
      description: exp.description,
    });
    setEditingId(exp.id);
  };

  const handleDelete = async id => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    setLoading(true);
    await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
    setExperiences(experiences.filter(e => e.id !== id));
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Deneyimler</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Başlık" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Şirket" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input name="date" value={form.date} onChange={handleChange} placeholder="Tarih aralığı" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} />
            <span>Devam Ediyor</span>
          </label>
        </div>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50" disabled={loading}>{editingId ? 'Güncelle' : 'Ekle'}</button>
        {message && <div className="text-green-600 text-center">{message}</div>}
      </form>
      <ul className="space-y-4">
        {experiences.map(exp => (
          <li key={exp.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col gap-2 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="font-bold text-lg text-gray-800">{exp.title} <span className="text-gray-500 font-normal">- {exp.company}</span></div>
              <div className="text-sm text-gray-500">{exp.date} {exp.isCurrent && <span className="text-xs text-green-600">(Devam Ediyor)</span>}</div>
            </div>
            <div className="text-gray-700">{exp.description}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:underline">Düzenle</button>
              <button onClick={() => handleDelete(exp.id)} className="text-red-600 hover:underline">Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 