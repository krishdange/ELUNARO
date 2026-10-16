import { useReveal } from '../hooks/useReveal.js';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ '--d': delay, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
