type GameCardProps = {
  bannerUrl: string;
  title: string;
  adsCount: number;
};

export function GameCard({ title, adsCount, bannerUrl }: GameCardProps) {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden">
      <img src={bannerUrl} alt={`Card do game ${title || "Game Name"}`} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="text-sm font-bold text-white block">
          {title || "Game Name"}
        </strong>

        <span className="text-zinc-300 text-sm block">
          {adsCount || 0} anúncio{adsCount > 1 && "s"}
        </span>
      </div>
    </a>
  );
}
