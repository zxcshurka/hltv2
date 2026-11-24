-- SQL для создания таблицы players в Supabase
-- Выполните этот скрипт в SQL Editor вашего Supabase проекта

CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nickname TEXT NOT NULL,
  real_name TEXT DEFAULT '',
  country TEXT DEFAULT '',
  country_flag TEXT DEFAULT '🏳️',
  team TEXT DEFAULT '',
  role TEXT DEFAULT 'Rifler',
  age INTEGER DEFAULT 20,
  kd_ratio DECIMAL(4,2) DEFAULT 1.00,
  rating DECIMAL(4,2) DEFAULT 1.00,
  maps_played INTEGER DEFAULT 0,
  rounds_played INTEGER DEFAULT 0,
  kills INTEGER DEFAULT 0,
  deaths INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  headshot_pct INTEGER DEFAULT 50,
  medals INTEGER DEFAULT 0,
  trophies INTEGER DEFAULT 0,
  mvp_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включаем RLS (Row Level Security)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Разрешаем всем читать данные
CREATE POLICY "Allow public read access" ON players
  FOR SELECT USING (true);

-- Разрешаем всем вставлять данные
CREATE POLICY "Allow public insert access" ON players
  FOR INSERT WITH CHECK (true);

-- Разрешаем всем удалять данные
CREATE POLICY "Allow public delete access" ON players
  FOR DELETE USING (true);

-- Разрешаем всем обновлять данные
CREATE POLICY "Allow public update access" ON players
  FOR UPDATE USING (true);
