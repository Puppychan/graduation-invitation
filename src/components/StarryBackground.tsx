const StarryBackground = () => {
  const stars = Array.from({ length: 100 });

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {stars.map((_, index) => {
        const size = Math.random() * 2 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        // const delay = Math.random() * 5;

        return (
          <div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default StarryBackground;
