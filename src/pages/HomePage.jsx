import { useState } from 'react';
import { Home } from '../components/home/Home';
import { motion } from 'framer-motion';
import CountDown from '../components/offer/ContDown';

export const HomePage = () => {
  const [isShowHome, setIsShowHome] = useState(false);

  return (
    <>
      {!isShowHome ? (
        <CountDown 
          seconds={3} 
          onComplete={() => setIsShowHome(true)} 
          className='bg-white'
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Home />
        </motion.div>
      )}
    </>
  );
};
