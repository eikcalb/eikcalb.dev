import { useContext } from "react";
import { FaSadTear } from "react-icons/fa";
import { APPLICATION_CONTEXT } from "../lib/application";

export const BlogCard = ({ name, icon, link }) => {
  return (
    <div className="w-full rounded-xl dark:border dark:border-slate-700/10 overflow-hidden shadow-lg dark:shadow-none hover:scale-95 transition-transform dark:bg-slate-800">
      {/* {icon ? <img className="h-36 object-center" src={icon} alt={name} /> : null} */}
      {icon ? (
        <div
          className="h-48 w-full bg-repeat bg-contain"
          style={{ backgroundImage: `url('${icon}')` }}
          alt={name}
        ></div>
      ) : null}
      <div className="px-4 py-4 space-y-4">
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className="text-slate-800 dark:text-slate-200 hover:underline underline-offset-4 font-bold text-lg"
        >
          {name}
        </a>
      </div>
    </div>
  );
};

export const BlogPosts = ({ title, description, items }) => {
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

      {items.length > 0 ? (
        <div className="grid items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8">
          {(items || []).map((item, i) => (
            <BlogCard key={title + item?.name ?? i} {...item} />
          ))}
        </div>
      ) : (
        <div className="container p-8 flex flex-col space-y-8 items-center w-full justify-center">
          <FaSadTear className="text-8xl text-slate-200 dark:text-slate-800" />
          <p className="text-2xl text-slate-200 dark:text-slate-800">
            Sorry, nothing to see here!
          </p>
        </div>
      )}
    </div>
  );
};

export const ProjectCard = ({
  name,
  icon,
  description,
  link,
  teamSize,
  experimental,
}) => {
  return (
    <div className="group transition-all w-full rounded-xl dark:border dark:border-slate-700/10 shadow-lg dark:shadow-none hover:scale-105 dark:bg-slate-800 flex flex-col overflow-hidden">
      {icon ? <img className="w-full h-0 group-hover:h-full" src={icon} alt={name} /> : null}
      <div className="px-4 py-4 space-y-4 flex-1 w-full">
        <div className="text-slate-800 dark:text-slate-200 font-bold text-xl">
          {name}
        </div>
        <p className="text-slate-700 dark:text-neutral-300 line-clamp-4 group-hover:line-clamp-none text-base text-ellipsis w-[calc(100%)]">
          {description}
        </p>
      </div>
      <div className="px-4 py-4 space-x-6 flex">
        {true || experimental ? null : (
          <span
            title="Team size refers to the count of people who participated in working on this project that I am aware of. It doesn't take into account past contributors or future contributors."
            className="inline-flex border border-sky-400/20 dark:border-none bg-sky-100 dark:bg-sky-100 text-slate-900 rounded-full uppercase px-3 sm:px-1 py-1 text-xs items-center"
          >
            <span className="me-2 font-bold text-xs/4 px-3 py-2 bg-cyan-500 dark:bg-slate-900 text-slate-100 dark:text-slate-300 rounded-full items-center hidden sm:flex">
              Team
            </span>
            <span className="sm:me-3 font-semibold">{teamSize}</span>
          </span>
        )}
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

      <div className="grid items-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-8">
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
    app.user.blogPosts.length <= 0 &&
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
      <BlogPosts
        title="Blog Posts"
        description="This section contains posts I make related to technology I am fascinated about and experimenting on. It's an opportunity to jot down my discovery process and progress in learning."
        items={app.user.blogPosts}
      />
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
