import Image from "next/image";
import Link from "next/link";
import type { Book } from "./data";
import type { Stat } from "./reviews";

export const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');
    .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
    .mono  { font-family: 'DM Mono', monospace; }
    .cover { box-shadow: 0 18px 40px -14px rgba(17,24,39,.45), 0 4px 10px -4px rgba(17,24,39,.25); }
  `}</style>
);

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className="w-5 h-px bg-amber-600 inline-block" />
    <span className="mono text-amber-600 text-xs tracking-widest uppercase">{children}</span>
  </div>
);

export const Stars = ({ n }: { n: number }) => (
  <span className="text-amber-500" aria-label={`${n} out of 5`}>
    {"★".repeat(n)}
    <span className="text-gray-300">{"★".repeat(5 - n)}</span>
  </span>
);

export function RatingLine({ stat }: { stat?: Stat }) {
  if (!stat) return null;
  return (
    <p className="text-sm text-gray-600">
      <Stars n={Math.round(stat.avg)} /> {stat.avg.toFixed(1)}{" "}
      <span className="text-gray-400">
        ({stat.n} {stat.n === 1 ? "review" : "reviews"})
      </span>
    </p>
  );
}

export function BookCard({ b, stat }: { b: Book; stat?: Stat }) {
  return (
    <Link href={`/books/${b.slug}`} className="group block no-underline">
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-stone-100 cover group-hover:-translate-y-0.5 transition-all">
        <Image
          src={b.cover}
          alt={`Cover of ${b.title} by ${b.author}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
          className="object-cover"
        />
      </div>
      <p className="serif mt-4 text-xl text-gray-900 leading-snug">{b.title}</p>
      <p className="text-xs text-gray-500 font-light mt-0.5">{b.author}</p>
      <div className="mt-1.5">
        <RatingLine stat={stat} />
      </div>
    </Link>
  );
}
