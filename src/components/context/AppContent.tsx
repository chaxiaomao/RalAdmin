import {createContext} from "react";

export const AppContext = createContext({
    minibar: false,
    openMenu: false,
    isLoading: false,
    setMinibar: (value: boolean) => {},
    setOpenMenu: (value: boolean) => {},
    setIsLoading: (value: boolean) => {},
});

// export const MinibarContext = createContext(false);