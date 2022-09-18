import axios from "axios";
import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameCard } from "./components/GameCard";
import { useEffect, useState } from "react";

import "./styles/main.css";
import { CreateAdModal } from "./components/CreateAdModal";

export type GameListData = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export default function App() {
  const [games, setGames] = useState<GameListData[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then(({ data }) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] min-h-screen m-auto flex flex-col items-center justify-center">
      <img src={logoImg} alt="NLW eSports logotipo" className="mb-20" />

      <h1 className="text-6xl text-white font-black">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.length > 0 &&
          games.map(({ id, title, _count: { ads }, bannerUrl }) => (
            <GameCard
              key={id}
              bannerUrl={bannerUrl}
              title={title}
              adsCount={ads}
            />
          ))}
      </div>

      <div className="pt-1 bg-nlw-gradient mt-8 self-stretch rounded-lg overflow-hidden">
        <Dialog.Root>
          <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
            <div>
              <strong className="text-2xl text-white font-black block">
                Não encontrou seu duo?
              </strong>
              <span className="text-zinc-400 block">
                Publique um anúncio para encontrar novos players!
              </span>
            </div>

            <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
              <MagnifyingGlassPlus size={24} />
              Publicar anúncio
            </Dialog.Trigger>
          </div>

          <CreateAdModal />
        </Dialog.Root>
      </div>
    </div>
  );
}
