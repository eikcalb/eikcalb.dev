import { useContext, useState } from "react";
import { APPLICATION_CONTEXT } from "../lib/application";
import dayjs from "dayjs";
import { FaEnvelope, FaGithub, FaGlobeAfrica } from "react-icons/fa";

const getIconForName = (name) => {
  switch (name) {
    case "github":
      return (
        <FaGithub className="transition-all text-3xl lg:text-2xl hover:scale-125 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" />
      );
    case "email":
      return (
        <FaEnvelope className="transition-all text-3xl lg:text-2xl hover:scale-125 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" />
      );
    default:
      return (
        <FaGlobeAfrica className="transition-all text-3xl lg:text-2xl hover:scale-125 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100" />
      );
  }
};

export const Footer = () => {
  const app = useContext(APPLICATION_CONTEXT);
  const [accepted, setAccepted] = useState(sessionStorage.cookieAccepted);
  const today = dayjs().year();

  return (
    <div className="container mx-auto py-8 flex flex-col justify-center text-center space-y-4">
      <div className="flex space-x-8 justify-center">
        {app.user.links.map((link) => (
          <a
            key={`footer-${link.name}`}
            target="_blank"
            rel="noreferrer"
            href={link.href}
            role={link.name}
          >
            {getIconForName(link.name)}
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-500 peer/author">
        &copy; {app.author} {today}
      </p>

      <p className="text-xs text-neutral-500">v{app.version}</p>
      {!accepted ? (
        <div className="flex flex-col items-center space-y-4 transition-all fixed left-0 right-0 bottom-0 py-4 px-4 rounded-t-3xl bg-sky-800/90 dark:bg-slate-100/80 shadow-md dark:shadow-none dark:border-t">
          <div className="text-slate-100 dark:text-slate-800 text-sm leading-8">
            <span className="px-3 py-1 bg-yellow-300 text-slate-800 font-bold text-sm/4 rounded-full me-3">
              Privacy Notice
            </span>
            <span>
              This website uses cookies to improve your web experience. By using
              the site, you agree to the use of cookies.
            </span>
          </div>

          <button
            onClick={() => {
              sessionStorage.cookieAccepted = true;
              setAccepted(true);
            }}
            className="uppercase text-xs px-4 py-2 tracking-widest underline-offset-4 underline text-slate-200 dark:text-slate-800 hover:bg-sky-500/10 hover:no-underline rounded-full"
          >
            Dismiss
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
