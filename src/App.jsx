import { Suspense, lazy } from "react";
import "./App.css";
import { ApplicationContextProvider } from "./lib/application";
import { Loading } from "./components/loading";

const Header = lazy(() => import("./components/header"));
const EasterEgg = lazy(() => import("./components/easterEgg"));
const Body = lazy(() => import("./components/body"));
const Footer = lazy(() => import("./components/footer"));

function App() {
    return (
        <Suspense fallback={Loading}>
            <ApplicationContextProvider>
                <Header />
                <EasterEgg>
                    <Body />
                </EasterEgg>
                <Footer />
            </ApplicationContextProvider>
        </Suspense>
    );
}

export default App;
