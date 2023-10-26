export const Loading = () => {
  const circleClass = "fill-slate-950 dark:fill-neutral-50";

  return (
    <svg
      className="bg-slate dark:bg-slate-950 h-full"
      version="1.1"
      id="L5"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
    >
      <circle className={circleClass} stroke="none" cx="40" cy="50" r="2">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 6 ; 0 -6; 0 6"
          repeatCount="indefinite"
          begin="0"
        />
      </circle>
      <circle className={circleClass} stroke="none" cx="50" cy="50" r="2">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 2 ; 0 -2; 0 2"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
      <circle className={circleClass} stroke="none" cx="60" cy="50" r="2">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 -6 ; 0 6; 0 -6"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
    </svg>
  );
};
