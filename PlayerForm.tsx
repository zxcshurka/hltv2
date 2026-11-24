import { useState } from 'react';
import { Player } from '../types';
import { Save, X, User } from 'lucide-react';

interface PlayerFormProps {
  onSubmit: (player: Omit<Player, 'id' | 'created_at'>) => Promise<boolean>;
  onCancel: () => void;
}

const COUNTRIES = [
  { name: 'Россия', flag: '🇷🇺' },
  { name: 'Украина', flag: '🇺🇦' },
  { name: 'Казахстан', flag: '🇰🇿' },
  { name: 'Беларусь', flag: '🇧🇾' },
  { name: 'США', flag: '🇺🇸' },
  { name: 'Бразилия', flag: '🇧🇷' },
  { name: 'Швеция', flag: '🇸🇪' },
  { name: 'Дания', flag: '🇩🇰' },
  { name: 'Франция', flag: '🇫🇷' },
  { name: 'Германия', flag: '🇩🇪' },
  { name: 'Польша', flag: '🇵🇱' },
  { name: 'Чехия', flag: '🇨🇿' },
  { name: 'Словакия', flag: '🇸🇰' },
  { name: 'Норвегия', flag: '🇳🇴' },
  { name: 'Финляндия', flag: '🇫🇮' },
  { name: 'Канада', flag: '🇨🇦' },
  { name: 'Аргентина', flag: '🇦🇷' },
  { name: 'Китай', flag: '🇨🇳' },
  { name: 'Южная Корея', flag: '🇰🇷' },
  { name: 'Турция', flag: '🇹🇷' },
];

const ROLES = ['Rifler', 'AWPer', 'Entry Fragger', 'Support', 'IGL', 'Lurker'];

export default function PlayerForm({ onSubmit, onCancel }: PlayerFormProps) {
  const [formData, setFormData] = useState({
    nickname: '',
    real_name: '',
    country: '',
    country_flag: '',
    team: '',
    role: 'Rifler',
    age: 20,
    kd_ratio: 1.0,
    rating: 1.0,
    maps_played: 0,
    rounds_played: 0,
    kills: 0,
    deaths: 0,
    assists: 0,
    headshot_pct: 50,
    medals: 0,
    trophies: 0,
    mvp_count: 0,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COUNTRIES.find(c => c.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      country: e.target.value,
      country_flag: selected?.flag || '🏳️',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nickname) return;

    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <User size={24} />
        <h2>Добавить игрока</h2>
      </div>

      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-section">
          <h3>👤 Основная информация</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Никнейм *</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="s1mple"
                required
              />
            </div>
            <div className="form-group">
              <label>Настоящее имя</label>
              <input
                type="text"
                name="real_name"
                value={formData.real_name}
                onChange={handleChange}
                placeholder="Александр Костылев"
              />
            </div>
            <div className="form-group">
              <label>Страна</label>
              <select name="country" value={formData.country} onChange={handleCountryChange}>
                <option value="">Выберите страну</option>
                {COUNTRIES.map(c => (
                  <option key={c.name} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Команда</label>
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="NAVI"
              />
            </div>
            <div className="form-group">
              <label>Роль</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                {ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Возраст</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min={14}
                max={50}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>📊 Статистика</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>K/D Ratio</label>
              <input
                type="number"
                name="kd_ratio"
                value={formData.kd_ratio}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>HS %</label>
              <input
                type="number"
                name="headshot_pct"
                value={formData.headshot_pct}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>Карты сыграны</label>
              <input
                type="number"
                name="maps_played"
                value={formData.maps_played}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Убийства</label>
              <input
                type="number"
                name="kills"
                value={formData.kills}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Смерти</label>
              <input
                type="number"
                name="deaths"
                value={formData.deaths}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Ассисты</label>
              <input
                type="number"
                name="assists"
                value={formData.assists}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Раунды сыграны</label>
              <input
                type="number"
                name="rounds_played"
                value={formData.rounds_played}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>🏆 Достижения</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>🏅 Медали</label>
              <input
                type="number"
                name="medals"
                value={formData.medals}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>🏆 Кубки</label>
              <input
                type="number"
                name="trophies"
                value={formData.trophies}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>⭐ MVP</label>
              <input
                type="number"
                name="mvp_count"
                value={formData.mvp_count}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-cancel" onClick={onCancel}>
            <X size={18} />
            Отмена
          </button>
          <button type="submit" className="btn btn-submit" disabled={submitting}>
            <Save size={18} />
            {submitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}
