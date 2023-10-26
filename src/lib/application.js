import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { createContext } from "react";

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

    constructor(name, version) {
        this.name = name ?? process.env.REACT_APP_NAME;
        this.version = version ?? process.env.REACT_APP_VERSION;

        this.initialize();
        logEvent(this.fBaseAnalytics, 'page_view', {
            page_location: global.location.href,
        })
    }

    initialize() {
        this.fBase = initializeApp(Application.firebaseConfig);
        this.fBaseAnalytics = getAnalytics(this.fBase);
    }

    SetUser(user) {
        this.user = user;
    }

    SetDarkMode(active = true) {
        if (active) {
            document.documentElement.classList.add("dark");
            localStorage.theme = "dark";
            return;
        }
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
    }
}

const theApp = new Application();
export const APPLICATION_CONTEXT = createContext(theApp);

export const ApplicationContextProvider = (props) => {
    return (
        <APPLICATION_CONTEXT.Provider value={theApp}>
            {props.children}
        </APPLICATION_CONTEXT.Provider>
    );
};
