import { useContext } from "react";
import { APPLICATION_CONTEXT } from "../lib/application";

export const Skills = () => {
  const app = useContext(APPLICATION_CONTEXT);

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-2">
      {app.user.skills
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((skill) => (
          <span
            key={skill.name}
            className="inline-flex px-3 py-1 rounded-full border text-xs sm:text-sm text-center whitespace-nowrap font-medium border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300"
          >
            {skill.name}
          </span>
        ))}
    </div>
  );
};

export default Skills;
