import { Search, Plus, Users, Trophy } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: 'list' | 'add' | 'profile') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({ currentView, setCurrentView, searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo" onClick={() => setCurrentView('list')}>
          <Trophy size={28} className="logo-icon" />
          <div className="logo-text">
            <span className="logo-main">CSDB</span>
            <span className="logo-sub">Player Database</span>
          </div>
        </div>
        <nav className="nav">
          <button
            className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            <Users size={18} />
            <span>Игроки</span>
          </button>
          <button
            className={`nav-btn add-btn ${currentView === 'add' ? 'active' : ''}`}
            onClick={() => setCurrentView('add')}
          >
            <Plus size={18} />
            <span>Добавить</span>
          </button>
        </nav>
      </div>
      {currentView === 'list' && (
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по нику, имени, стране, команде..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      )}
    </header>
  );
}
