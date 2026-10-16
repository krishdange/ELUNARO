import { useScrolledPast } from '../hooks/useScrollY.js';
import Icon from './Icon.jsx';
import './BackToTop.css';

export default function BackToTop() {
  const visible = useScrolledPast(900);

  return (
    <a href="#home" className={`to-top ${visible ? 'is-visible' : ''}`} aria-label="Back to top" tabIndex={visible ? 0 : -1} aria-hidden={!visible}>
      <Icon name="arrow-up" />
    </a>
  );
}
