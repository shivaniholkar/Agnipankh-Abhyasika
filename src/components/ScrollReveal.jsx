import useScrollReveal from '../hooks/useScrollReveal';

function ScrollReveal({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  className = '',
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const animations = {
    'slide-up': {
      hidden: { opacity: 0, transform: 'translateY(60px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'slide-down': {
      hidden: { opacity: 0, transform: 'translateY(-60px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    'slide-left': {
      hidden: { opacity: 0, transform: 'translateX(-60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'slide-right': {
      hidden: { opacity: 0, transform: 'translateX(60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    'scale': {
      hidden: { opacity: 0, transform: 'scale(0.85)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'rotate-up': {
      hidden: { opacity: 0, transform: 'translateY(60px) rotate(5deg)' },
      visible: { opacity: 1, transform: 'translateY(0) rotate(0deg)' },
    },
  };

  const currentAnimation = animations[animation] || animations['slide-up'];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentAnimation.hidden,
        ...(isVisible ? currentAnimation.visible : {}),
        transition: `all ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;