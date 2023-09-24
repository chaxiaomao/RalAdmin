import {createContext} from "react";

export const AppContext = createContext({
    minibar: false,
    openMenu: false,
    isLoading: false,
    breadcrumb: [],
    setMinibar: (value: boolean) => {},
    setOpenMenu: (value: boolean) => {},
    setIsLoading: (value: boolean) => {},
    setBreadcrumb: (value: []) => {},
});

// export const MinibarContext = createContext(false);