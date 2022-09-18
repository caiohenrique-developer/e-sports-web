import { GameController, MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo-nlw-esports.svg";
import { GameCard } from "./components/GameCard";
import { useEffect, useState } from "react";

import "./styles/main.css";
import { Input } from "./components/Form/Input";

type GameListData = {
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
    fetch("http://localhost:3333/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
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

          <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>

              <form className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <Input
                    id="game"
                    placeholder="Selecione o game que deseja jogar"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
                  <Input
                    id="name"
                    placeholder="Como te chamam dentro do game?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying" className="font-semibold">
                      Joga há quantos anos?
                    </label>
                    <Input
                      id="yearsPlaying"
                      placeholder="Tudo bem ser ZERO"
                      type={"number"}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">
                      Qual seu Discord?
                    </label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">
                      Quando costuma jogar?
                    </label>

                    <div className="grid grid-cols-4 gap-2">
                      <button
                        title="Domingo"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        D
                      </button>
                      <button
                        title="Segunda"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        S
                      </button>
                      <button
                        title="Terça"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        T
                      </button>
                      <button
                        title="Quarta"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        Q
                      </button>
                      <button
                        title="Quinta"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        Q
                      </button>
                      <button
                        title="Sexta"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        S
                      </button>
                      <button
                        title="Sábado"
                        className="w-8 h-8 rounded bg-zinc-900 font-bold"
                      >
                        S
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">
                      Qual horário do dia?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" id="hourStart" placeholder="De" />
                      <Input type="time" id="hourEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button"
                    className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
