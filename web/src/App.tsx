import './styles/main.css';

import logoImg from './assets/Logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { CreateAdBanner } from './components/CreateAdBanner';

import { CreateAdModal } from './components/CreateAdModal';


interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] my-20 mx-auto flex flex-col items-center">
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui!
      </h1>

      <div className="grid-cols-6 grid gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerURL}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App


