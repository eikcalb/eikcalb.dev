import { useContext, useReducer } from "react";
import { APPLICATION_CONTEXT } from "../lib/application";
import { ToggleIconButton } from "./button";
import { MdNightlight, MdSunny } from "react-icons/md";

export const Skills = () => {
  const app = useContext(APPLICATION_CONTEXT);

  return (
    <div className=" w-full items-center justify-center text-center container mx-auto px-8 pb-24 space-x-8">
      {app.user.skills
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((skill) => (
          <span className="inline-flex px-5 py-1 m-auto flex-grow text-base flex-grow-1 text-center text-slate-800 dark:text-slate-200">
            {skill.name}
          </span>
        ))}
    </div>
  );
};

export default Skills;
