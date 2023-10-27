import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";
import { Loading } from "../components/loading";
import { DEFAULT_USER } from "./user";

/**
 * This application provides a portfolio page for the user specified.
 * Methods and properties are provided to access specific information
 * about the user intended for this portfolio page.
 */
class Application {
    static firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    author = process.env.REACT_APP_AUTHOR;
    authorEmail = process.env.REACT_APP_EMAIL;
    user;

    // Public methods
    SetLoading = (loading) => {};

    constructor(name, version) {
        this.name = name ?? process.env.REACT_APP_NAME;
        this.version = version ?? process.env.REACT_APP_VERSION;

        this.initialize();
        logEvent(this.fBaseAnalytics, "page_view", {
            page_location: global.location.href,
        });
    }

    initialize() {
        this.fBase = initializeApp(Application.firebaseConfig);
        this.fBaseAnalytics = getAnalytics(this.fBase);

        // We want to check the theme color would be set appropriately.
        // If the theme is set in `localStorage`, we want to update the
        // browser.
        if ("theme" in localStorage) {
            this.updateBrowserThemeColor(localStorage.theme === "dark");
        }

        // We want to listen to system mode events
        window.matchMedia("(prefers-color-scheme: dark)").onchange = (ev) => {
            if (!("theme" in localStorage)) {
                if (ev.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                this.updateBrowserThemeColor(ev.matches);
            }
        };
    }

    updateBrowserThemeColor(dark = true) {
        const meta = global.document.querySelector('meta[name="theme-color"]');
        if (meta) {
            meta.setAttribute("content", dark ? "#020617" : "#f8fafc");
        }
    }

    SetUser(user) {
        this.user = user;
    }

    SetDarkMode(active = true) {
        if (active) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            this.updateBrowserThemeColor(true);
            return;
        }
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
        this.updateBrowserThemeColor(false);
    }
}

const theApp = new Application();
theApp.SetUser(DEFAULT_USER);

export const APPLICATION_CONTEXT = createContext(theApp);

export const ApplicationContextProvider = (props) => {
    const [loading, setLoading] = useState(false);

    theApp.SetLoading = setLoading;

    return (
        <APPLICATION_CONTEXT.Provider value={theApp}>
            {props.children}
            {loading ? (
                <div className="absolute flex z-50 top-0 left-0 right-0 h-full">
                    <Loading />
                </div>
            ) : null}
        </APPLICATION_CONTEXT.Provider>
    );
};
