import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Player } from './types';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import PlayerProfile from './components/PlayerProfile';
import Header from './components/Header';
import './App.css';

type View = 'list' | 'add' | 'profile';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching players:', error);
    } else {
      setPlayers(data || []);
    }
    setLoading(false);
  };

  const addPlayer = async (playerData: Omit<Player, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('players')
      .insert([playerData])
      .select();

    if (error) {
      console.error('Error adding player:', error);
      return false;
    }
    await fetchPlayers();
    setCurrentView('list');
    return true;
  };

  const deletePlayer = async (id: string) => {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting player:', error);
      return;
    }
    await fetchPlayers();
    setCurrentView('list');
  };

  const viewPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setCurrentView('profile');
  };

  const filteredPlayers = players.filter(p =>
    p.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.real_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main className="main-content">
        {currentView === 'list' && (
          <PlayerList
            players={filteredPlayers}
            loading={loading}
            onViewPlayer={viewPlayer}
            onDeletePlayer={deletePlayer}
          />
        )}
        {currentView === 'add' && (
          <PlayerForm onSubmit={addPlayer} onCancel={() => setCurrentView('list')} />
        )}
        {currentView === 'profile' && selectedPlayer && (
          <PlayerProfile player={selectedPlayer} onBack={() => setCurrentView('list')} />
        )}
      </main>
    </div>
  );
}

export default App;
