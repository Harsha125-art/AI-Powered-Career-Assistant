import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function PageLayout({ children, className = "" }) {
  return (
    <div className={`page-gradient min-h-[calc(100svh-4rem)] ${className}`}>
      <motion.main
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      >
        {children}
      </motion.main>
    </div>
  );
}

export default PageLayout;
