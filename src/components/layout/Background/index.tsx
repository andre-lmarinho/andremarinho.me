// Animated background: orbs + mesh lines + particles.

const WRAPPER = 'pointer-events-none fixed inset-0 overflow-hidden';
const ORB_BASE =
  'motion-safe:animate-float absolute rounded-full blur-3xl motion-reduce:animate-none';
const LINE_BASE = 'absolute inset-0 from-transparent to-transparent';
const PARTICLE_BASE =
  'particle motion-safe:animate-float absolute rounded-full motion-reduce:animate-none';

const AnimationBG: React.FC = () => (
  <div className={WRAPPER} aria-hidden="true">
    {/* Orbs */}
    {[
      `${ORB_BASE} -top-40 -right-40 h-80 w-80 bg-gradient-to-br from-zinc-300 to-zinc-600 opacity-20`,
      `${ORB_BASE} -bottom-40 -left-60 h-96 w-96 bg-gradient-to-tr from-zinc-400 to-zinc-700 opacity-10`,
    ].map((cls, i) => (
      <div key={`o-${i}`} className={cls} />
    ))}

    {/* Mesh lines */}
    <div className="absolute inset-0 opacity-10 dark:opacity-10">
      {[
        { k: 'h', pos: 'top-1/4', via: 'via-zinc-600' },
        { k: 'h', pos: 'top-2/4', via: 'via-zinc-500/30', d: '-3s' },
        { k: 'h', pos: 'top-3/4', via: 'via-zinc-400/40', d: '-4s' },
        { k: 'v', pos: 'left-1/4', via: 'via-zinc-600/40' },
        { k: 'v', pos: 'left-2/4', via: 'via-zinc-500/40', d: '-2s' },
        { k: 'v', pos: 'left-3/4', via: 'via-zinc-400/40', d: '-1s' },
      ].map(({ k, pos, via, d }, i) => (
        <div
          key={`l-${i}`}
          className={`${k === 'h' ? 'animate-gradient-x h-px bg-gradient-to-r' : 'animate-gradient-y w-px bg-gradient-to-b'} ${LINE_BASE} ${pos} ${via}`}
          style={d ? { animationDelay: d } : undefined}
        />
      ))}
    </div>

    {/* Particles */}
    <div className="particles absolute inset-0">
      {[
        { cls: `${PARTICLE_BASE} h-2 w-2 bg-zinc-400 opacity-20`, t: '20%', l: '10%', d: '-1s' },
        { cls: `${PARTICLE_BASE} h-1 w-1 bg-zinc-500 opacity-30`, t: '60%', l: '80%', d: '-2s' },
        { cls: `${PARTICLE_BASE} h-3 w-3 bg-zinc-600 opacity-10`, t: '80%', l: '20%', d: '-3s' },
        {
          cls: `${PARTICLE_BASE} h-1.5 w-1.5 bg-zinc-300 opacity-40`,
          t: '10%',
          l: '60%',
          d: '-5s',
        },
      ].map(({ cls, t, l, d }, i) => (
        <div key={`p-${i}`} className={cls} style={{ top: t, left: l, animationDelay: d }} />
      ))}
    </div>
  </div>
);

export default AnimationBG;
