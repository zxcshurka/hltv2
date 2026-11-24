import { Player } from '../types';
import { Trash2, Eye, Medal, Trophy, Target } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  loading: boolean;
  onViewPlayer: (player: Player) => void;
  onDeletePlayer: (id: string) => void;
}

export default function PlayerList({ players, loading, onViewPlayer, onDeletePlayer }: PlayerListProps) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка игроков...</p>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="empty-state">
        <Trophy size={64} className="empty-icon" />
        <h2>Нет игроков</h2>
        <p>Добавьте первого игрока в базу данных</p>
      </div>
    );
  }

  return (
    <div className="player-list-container">
      <div className="list-header">
        <h2>🏆 Рейтинг игроков</h2>
        <span className="player-count">{players.length} игроков</span>
      </div>

      {/* Table Header */}
      <div className="table-header">
        <span className="col-rank">#</span>
        <span className="col-nick">Ник</span>
        <span className="col-team">Команда</span>
        <span className="col-country">Страна</span>
        <span className="col-stat">K/D</span>
        <span className="col-stat">Rating</span>
        <span className="col-stat">HS%</span>
        <span className="col-trophy">🏅</span>
        <span className="col-trophy">🏆</span>
        <span className="col-actions">Действия</span>
      </div>

      {/* Player Rows */}
      {players.map((player, index) => (
        <div key={player.id} className={`player-row ${index < 3 ? `top-${index + 1}` : ''}`}>
          <span className="col-rank">
            {index === 0 && <span className="rank-badge gold">1</span>}
            {index === 1 && <span className="rank-badge silver">2</span>}
            {index === 2 && <span className="rank-badge bronze">3</span>}
            {index > 2 && <span className="rank-num">{index + 1}</span>}
          </span>
          <span className="col-nick">
            <span className="player-flag">{player.country_flag || '🏳️'}</span>
            <span className="player-nickname">{player.nickname}</span>
            {player.role && <span className="player-role">{player.role}</span>}
          </span>
          <span className="col-team">{player.team || '-'}</span>
          <span className="col-country">{player.country}</span>
          <span className="col-stat kd">{player.kd_ratio?.toFixed(2)}</span>
          <span className="col-stat rating">{player.rating?.toFixed(2)}</span>
          <span className="col-stat">{player.headshot_pct}%</span>
          <span className="col-trophy">
            <Medal size={14} className="medal-icon" />
            {player.medals || 0}
          </span>
          <span className="col-trophy">
            <Trophy size={14} className="trophy-icon" />
            {player.trophies || 0}
          </span>
          <span className="col-actions">
            <button className="action-btn view" onClick={() => onViewPlayer(player)} title="Профиль">
              <Eye size={16} />
            </button>
            <button className="action-btn delete" onClick={() => player.id && onDeletePlayer(player.id)} title="Удалить">
              <Trash2 size={16} />
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
