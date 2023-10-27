export const ToggleIconButton = (props) => {
  return (
    <button
      onClick={() => {
        props.onToggle();
      }}
      className={`p-4 overflow-hidden ${props.enabled? "bg-gradient-to-tr from-slate-600 to-sky-900" : "bg-slate-800"} ${props.noBorder ? '' : 'border rounded-2xl border-neutral-500/20'}`}
    >
      <div
        className={`animate__animated animate__faster ${
          props.enabled ? "animate__backInLeft" : "animate__backInRight"
        }`}
      >
        {props.children}
      </div>
    </button>
  );
};
