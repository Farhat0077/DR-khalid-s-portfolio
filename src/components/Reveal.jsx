import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, viewport } from '../motionConfig';

export default function Reveal({ children, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={fadeUp(reduce)} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </Tag>
  );
}
