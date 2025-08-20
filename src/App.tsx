import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

type Mode = 'all' | 'five' | 'red' | null;

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [mode, setMode] = useState<Mode>(null);

  useEffect(() => {
    if (mode === 'all') {
      getAll().then(setGoods);
    }

    if (mode === 'five') {
      get5First().then(setGoods);
    }

    if (mode === 'red') {
      getRedGoods().then(setGoods);
    }
  }, [mode]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={() => setMode('all')}>
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => setMode('five')}
      >
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={() => setMode('red')}>
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
