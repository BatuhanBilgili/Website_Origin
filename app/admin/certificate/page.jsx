"use client";
import { useEffect, useState, useRef } from "react";

const CLOUDINARY_UPLOAD_PRESET = "portfolio_unsigned";
const CLOUDINARY_CLOUD_NAME = "dwh0vtjbk";

export default function CertificatePanel() {
  const [certificates, setCertificates] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', imageUrl: '', link: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInput = useRef();

  const fetchCertificates = () => {
    fetch('/api/certificate')
      .then(res => res.json())
      .then(data => setCertificates(data));
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setMessage('Yükleniyor...');
    // Cloudinary upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setForm(f => ({ ...f, imageUrl: data.secure_url }));
    setMessage('Görsel yüklendi!');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/certificate?id=${editingId}` : '/api/certificate';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Kaydedildi!');
      setForm({ title: '', category: '', imageUrl: '', link: '' });
      setEditingId(null);
      fetchCertificates();
      if (fileInput.current) fileInput.current.value = '';
    } else {
      setMessage('Hata oluştu.');
    }
    setLoading(false);
  };

  const handleEdit = cert => {
    setForm({
      title: cert.title,
      category: cert.category,
      imageUrl: cert.imageUrl,
      link: cert.link || '',
    });
    setEditingId(cert.id);
  };

  const handleDelete = async id => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    setLoading(true);
    await fetch(`/api/certificate?id=${id}`, { method: 'DELETE' });
    setCertificates(certificates.filter(c => c.id !== id));
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6">Sertifikalar</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Başlık" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Kategori" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input name="link" value={form.link} onChange={handleChange} placeholder="Link (opsiyonel)" className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="file" accept="image/*" ref={fileInput} onChange={handleFileChange} className="flex-1 p-3 border border-gray-300 rounded-lg" />
        </div>
        {form.imageUrl && <img src={form.imageUrl} alt="Sertifika görseli" className="h-24 my-2 rounded-lg border mx-auto" />}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50" disabled={loading}>{editingId ? 'Güncelle' : 'Ekle'}</button>
        {message && <div className="text-green-600 text-center">{message}</div>}
      </form>
      <ul className="space-y-4">
        {certificates.map(cert => (
          <li key={cert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col md:flex-row items-center gap-4 shadow-sm">
            <img src={cert.imageUrl} alt={cert.title} className="h-16 w-16 object-cover rounded-lg border" />
            <div className="flex-1 w-full">
              <div className="font-bold text-lg text-gray-800">{cert.title}</div>
              <div className="text-gray-500">{cert.category}</div>
              {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Sertifika Linki</a>}
            </div>
            <div className="flex flex-row md:flex-col gap-2">
              <button onClick={() => handleEdit(cert)} className="text-blue-600 hover:underline">Düzenle</button>
              <button onClick={() => handleDelete(cert.id)} className="text-red-600 hover:underline">Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 