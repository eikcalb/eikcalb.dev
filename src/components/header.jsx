import { useContext, useReducer } from "react";
import { APPLICATION_CONTEXT } from "../lib/application";
import { ToggleIconButton } from "./button";
import { MdNightlight, MdSunny } from "react-icons/md";

export const Header = () => {
    const app = useContext(APPLICATION_CONTEXT);
    const [darkMode, updateDarkMode] = useReducer(() => document.documentElement.classList.contains('dark'), document.documentElement.classList.contains('dark'));

    return (
        <div className="flex flex-grow-0 flex-col text-center w-fit container mx-auto px-8 sm:px-12 py-32 sm:py-40 space-y-12">
            <h1 className="text-4xl sm:text-6xl font-semibold text-slate-950 dark:text-gray-50">{app.user.name}</h1>

            <div className="flex flex-col items-center space-y-8">
                <span className="text-lg/7 text-slate-600 dark:text-gray-400">{app.user.bio}</span>
                <ToggleIconButton enabled={darkMode} onToggle={() => {
                     app.SetDarkMode(!darkMode)
                     updateDarkMode();
                }}>
                    {!darkMode ? <MdNightlight className="text-lg" color="white" /> : <MdSunny className="text-lg" color="yellow" /> }
                </ToggleIconButton>
                </div>
        </div>
    )
}

export default Header;
