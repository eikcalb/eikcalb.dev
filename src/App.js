import { Suspense, lazy } from "react";
import "./App.css";
import { ApplicationContextProvider } from "./lib/application";
import { Loading } from "./components/loading";

const Header = lazy(() => import("./components/header"));
const Body = lazy(() => import("./components/easterEgg"));

function App() {
    return (
        <Suspense fallback={Loading}>
            <ApplicationContextProvider>
                <Header />
                <Body />
            </ApplicationContextProvider>
        </Suspense>
    );
}

export default App;
