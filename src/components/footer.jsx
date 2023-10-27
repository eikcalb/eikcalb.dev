import { useContext } from "react";
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
    </div>
  );
};

export default Footer;
