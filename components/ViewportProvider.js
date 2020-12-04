import React from "react";

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
    const [width, setWidth] = React.useState(undefined);
    const [height, setHeight] = React.useState(undefined);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleWindowResize = () => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            };

            // Add event listener
            window.addEventListener("resize", handleWindowResize);

            // Call handler right away so state gets updated with initial window size
            handleWindowResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleWindowResize);
        }

    }, []);

    return (
        <viewportContext.Provider value={{ width, height }}>
            {children}
        </viewportContext.Provider>
    );
};
export default ViewportProvider

export const useViewport = () => {
    const { width, height } = React.useContext(viewportContext);
    return { width, height };
};
