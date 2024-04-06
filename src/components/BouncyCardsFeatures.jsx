import { motion } from "framer-motion";

export const BouncyCardsFeatures = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 text-slate-800">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:px-8">
        <h2 className="max-w-lg text-4xl font-bold md:text-5xl">
          Conoce nuestra
        </h2>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <BounceCard className="col-span-12 md:col-span-12">
          <CardTitle>Misión</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-20 translate-y-8 rounded-t-2xl bg-gradient-to-br from-primaryBlue to-secondaryBlue p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center text-xl font-semibold text-orange-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dicta tempore consequatur neque labore eaque obcaecati totam. Magni quo sapiente adipisci quibusdam sint? Laboriosam, vero accusantium esse rem vel totam.
            </span>
          </div>
        </BounceCard>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-10">
        <BounceCard className="col-span-12 md:col-span-12">
          <CardTitle>Visión</CardTitle>
          <div className="absolute bottom-0 left-4 right-4 top-20 translate-y-8 rounded-t-2xl bg-gradient-to-br from-secondaryBlue to-primaryBlue p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
            <span className="block text-center text-xl font-semibold text-emerald-50">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dicta tempore consequatur neque labore eaque obcaecati totam. Magni quo sapiente adipisci quibusdam sint? Laboriosam, vero accusantium esse rem vel totam.
            </span>
          </div>
        </BounceCard>
      </div>
    </section>
  );
};

const BounceCard = ({ className, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={`group relative min-h-[250px] cursor-pointer overflow-hidden rounded-2xl bg-slate-100 p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};