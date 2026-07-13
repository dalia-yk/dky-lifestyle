"use client";

import { motion } from "framer-motion";

export function AboutStory() {
  return (
    <section className="bg-brand-ivory py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Notre histoire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Notre histoire
          </span>
          <h2 className="font-heading text-brand-black text-3xl md:text-4xl mb-6">
            Une vision née de la passion
          </h2>
          <div className="font-sans text-brand-mocha/80 text-base leading-relaxed space-y-4">
            <p>
              DKY Lifestyle est née d&apos;une conviction simple : chaque
              talent peut devenir une expérience exceptionnelle lorsqu&apos;il
              est porté par la passion, la créativité et l&apos;excellence.
            </p>
            <p>
              Fondée avec le désir de créer une marque qui dépasse un seul
              domaine d&apos;activité, DKY Lifestyle rassemble plusieurs
              univers sous une même identité. Chaque division est pensée
              pour offrir des services de qualité, où chaque détail est
              réalisé avec soin et intention.
            </p>
            <p>
              Notre aventure commence avec DKY Hair, notre première division
              dédiée aux coiffures protectrices et aux soins capillaires.
              Demain, cette vision s&apos;étendra à DKY Pastry, DKY Events et
              DKY Tech, tout en conservant les mêmes valeurs qui définissent
              notre marque.
            </p>
            <p>
              Chez DKY Lifestyle, nous croyons que chaque création raconte
              une histoire et que chaque expérience mérite d&apos;être
              mémorable.
            </p>
          </div>
          <div className="mt-8 border-l-4 border-brand-champagne pl-6 italic text-brand-mocha">
  <p className="font-heading text-xl leading-relaxed">
    « Comme de bons dispensateurs des diverses grâces de Dieu, que chacun de
    vous mette au service des autres le don qu&apos;il a reçu. »
  </p>

  <span className="block mt-4 uppercase tracking-[0.2em] text-xs text-brand-champagne">
    1 Pierre 4:10
  </span>
</div>
        </motion.div>

        {/* Notre mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Notre mission
          </span>
          <h2 className="font-heading text-brand-black text-3xl md:text-4xl mb-6">
            L&apos;excellence au cœur de chaque expérience
          </h2>
          <div className="font-sans text-brand-mocha/80 text-base leading-relaxed space-y-4">
            <p>
              Notre mission est de créer des expériences haut de gamme qui
              inspirent confiance, célèbrent la créativité et mettent
              l&apos;excellence au cœur de chaque réalisation.
            </p>
            <p>
              À travers chacune de nos divisions, nous nous engageons à
              offrir des services et des produits conçus avec intention,
              professionnalisme et souci du détail.
            </p>
            <p>
              Notre objectif n&apos;est pas seulement de répondre aux
              attentes, mais de les dépasser en offrant une expérience
              unique à chaque client.
            </p>
          </div>
          <div className="mt-8 border-l-4 border-brand-champagne pl-6 italic text-brand-mocha">
  <p className="font-heading text-xl leading-relaxed">
    « Tout ce que vous faites, faites-le de bon cœur, comme pour le Seigneur et
    non pour des hommes. »
  </p>

  <span className="block mt-4 uppercase tracking-[0.2em] text-xs text-brand-champagne">
    Colossiens 3:23
  </span>
</div>
        </motion.div>
        {/* Notre vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans uppercase tracking-[0.3em] text-brand-champagne text-sm mb-4 block">
            Notre vision
          </span>
          <h2 className="font-heading text-brand-black text-3xl md:text-4xl mb-6">
            Un écosystème de possibilités
          </h2>
          <div className="font-sans text-brand-mocha/80 text-base leading-relaxed space-y-4">
            <p>
              Notre vision est de faire de DKY Lifestyle une marque de
              référence reconnue pour son excellence, sa créativité et son
              innovation dans chacun de ses domaines d&apos;activité.
            </p>
            <p>
              Nous aspirons à bâtir un écosystème où la beauté, la
              pâtisserie, l&apos;événementiel, la technologie et les futurs
              projets se complètent pour offrir des expériences uniques,
              mémorables et accessibles à tous.
            </p>
            <p>
              À long terme, notre ambition est de créer une entreprise
              durable, capable d&apos;évoluer, d&apos;innover et
              d&apos;inspirer, tout en offrant des opportunités à
              d&apos;autres talents qui partageront nos valeurs.
            </p>
          </div>
          <div className="mt-8 border-l-4 border-brand-champagne pl-6 italic text-brand-mocha">
  <p className="font-heading text-xl leading-relaxed">
    « Recommande à l&apos;Éternel tes œuvres, et tes projets réussiront. »
  </p>

  <span className="block mt-4 uppercase tracking-[0.2em] text-xs text-brand-champagne">
    Proverbes 16:3
  </span>
</div>
        </motion.div>
      </div>
    </section>
  );
}