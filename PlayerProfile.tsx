import { Player } from '../types';
import { ArrowLeft, Medal, Trophy, Target, Map, Crosshair, Shield, Star, Users } from 'lucide-react';

interface PlayerProfileProps {
  player: Player;
  onBack: () => void;
}

export default function PlayerProfile({ player, onBack }: PlayerProfileProps) {
  return (
    <div className="profile-container">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={18} />
        Назад к списку
      </button>

      <div className="profile-card">
        <div className="profile-header-section">
          <div className="profile-avatar">
            <span className="profile-flag">{player.country_flag || '🏳️'}</span>
          </div>
          <div className="profile-info">
            <h1 className="profile-nickname">{player.nickname}</h1>
            {player.real_name && <p className="profile-realname">{player.real_name}</p>}
            <div className="profile-meta">
              <span className="meta-item">
                <Users size={14} />
                {player.team || 'Без команды'}
              </span>
              <span className="meta-item">
                🌍 {player.country || 'Не указана'}
              </span>
              <span className="meta-item">
                <Shield size={14} />
                {player.role || 'Rifler'}
              </span>
              <span className="meta-item">
                📅 {player.age} лет
              </span>
            </div>
          </div>
        </div>

        <div className="profile-stats-grid">
          <div className="stat-card highlight">
            <div className="stat-icon">
              <Target size={24} />
            </div>
            <div className="stat-value">{player.rating?.toFixed(2)}</div>
            <div className="stat-label">Rating</div>
          </div>
          <div className="stat-card highlight">
            <div className="stat-icon">
              <Crosshair size={24} />
            </div>
            <div className="stat-value">{player.kd_ratio?.toFixed(2)}</div>
            <div className="stat-label">K/D Ratio</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Crosshair size={24} />
            </div>
            <div className="stat-value">{player.headshot_pct}%</div>
            <div className="stat-label">Headshot %</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <Map size={24} />
            </div>
            <div className="stat-value">{player.maps_played}</div>
            <div className="stat-label">Карт</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💀</div>
            <div className="stat-value">{player.kills}</div>
            <div className="stat-label">Убийств</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">☠️</div>
            <div className="stat-value">{player.deaths}</div>
            <div className="stat-label">Смертей</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🤝</div>
            <div className="stat-value">{player.assists}</div>
            <div className="stat-label">Ассистов</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{player.rounds_played}</div>
            <div className="stat-label">Раундов</div>
          </div>
        </div>

        <div className="achievements-section">
          <h2>🏆 Достижения</h2>
          <div className="achievements-grid">
            <div className="achievement-card gold">
              <Medal size={32} />
              <div className="achievement-value">{player.medals || 0}</div>
              <div className="achievement-label">Медалей</div>
            </div>
            <div className="achievement-card gold">
              <Trophy size={32} />
              <div className="achievement-value">{player.trophies || 0}</div>
              <div className="achievement-label">Кубков</div>
            </div>
            <div className="achievement-card gold">
              <Star size={32} />
              <div className="achievement-value">{player.mvp_count || 0}</div>
              <div className="achievement-label">MVP наград</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
