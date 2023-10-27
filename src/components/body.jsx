import { useContext } from "react";
import { FaSadTear } from "react-icons/fa";
import { APPLICATION_CONTEXT } from "../lib/application";

export const ProjectCard = ({
  name,
  icon,
  description,
  link,
  teamSize,
  experimental,
}) => {
  return (
    <div className="w-full rounded-xl dark:border dark:border-slate-700/10 overflow-hidden shadow-lg dark:shadow-none dark:bg-slate-700">
      {icon ? <img className="w-full" src={icon} alt={name} /> : null}
      <div className="px-4 py-4 space-y-4">
        <div className="text-slate-800 dark:text-slate-200 font-bold text-xl">
          {name}
        </div>
        <p className="text-slate-700 dark:text-neutral-300 text-base">
          {description}
        </p>
      </div>
      <div className="px-4 py-4 space-x-6 flex">
        {!experimental ? (
          <span
            title="Team size refers to the count of people who participated in working on this project that I am aware of. It doesn't take into account past contributors or future contributors."
            className="inline-flex border border-sky-400/20 dark:border-none bg-sky-100 dark:bg-sky-100 text-slate-900 rounded-full uppercase px-3 sm:px-1 py-1 text-xs items-center"
          >
            <span className="me-2 font-bold text-xs/4 px-3 py-2 bg-cyan-500 dark:bg-slate-900 text-slate-100 dark:text-slate-300 rounded-full items-center hidden sm:flex">
              Team
            </span>
            <span className="sm:me-3 font-semibold">{teamSize}</span>
          </span>
        ) : null}
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className="inline-flex hover:bg-neutral-50 text-slate-100 hover:text-slate-800 bg-cyan-600 dark:bg-neutral-900 dark:hover:bg-neutral-50 hover:border-neutral-900 hover:border dark:hover:border-none items-center rounded-full uppercase px-3 py-2 text-sm font-bold"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

export const Section = ({ title, description, items }) => {
  return (
    <div className="container flex flex-col px-8 py-4 space-y-4">
      <div className="space-y-4 pb-4 border-b border-slate-500/20">
        <p className="text-slate-700 dark:text-slate-300 text-2xl font-semibold">
          {title}
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">
          {description}
        </p>
      </div>

      <div className="columns-1 lg:columns-2 xl:columns-3 gap-12 space-y-20 pt-8">
        {(items || []).map((item, i) => (
          <ProjectCard key={title + item?.name ?? i} {...item} />
        ))}
      </div>
    </div>
  );
};

export const Body = () => {
  const app = useContext(APPLICATION_CONTEXT);
  const noContent =
    app.user.hobbies.length <= 0 &&
    app.user.projects.length <= 0 &&
    app.user.skills.length <= 0;

  return noContent ? (
    <div className="container px-8 pb-32 flex flex-col space-y-8 items-center w-full justify-center">
      <FaSadTear className="text-8xl text-slate-200 dark:text-slate-800" />
      <p className="text-2xl text-slate-200 dark:text-slate-800">
        Sorry, nothing to see here!
      </p>
    </div>
  ) : (
    <div className="space-y-12 mb-20">
      <Section
        title="Projects"
        description="These projects encompass real-world tasks and initiatives I've engaged in, either as integral components of my professional journey or through freelance opportunities. These assignments reflect my practical involvement in the field, showcasing the application of my skills and expertise."
        items={app.user.projects.filter((p) => !p.experimental)}
      />
      <Section
        title="Experiments"
        description="These refer to innovative undertakings and creative ventures I've initiated to explore emerging technologies, refine my skills, or pioneer novel solutions. These endeavors are my playground for testing new concepts and pushing the boundaries of web and mobile development, allowing me to stay at the forefront of the ever-evolving digital landscape."
        items={app.user.projects.filter((p) => p.experimental)}
      />
    </div>
  );
};

export default Body;
