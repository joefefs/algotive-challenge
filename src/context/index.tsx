import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type LoadingContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  openError: boolean;
  setOpenError: Dispatch<SetStateAction<boolean>>;
};

const LoaderContext = createContext<LoadingContextType>(
  {} as LoadingContextType
);

export function LoaderContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage,
      }}>
      {children}
    </LoaderContext.Provider>
  );
}

// eslint-disable-next-line
export const useLoader = (): LoadingContextType =>
  useContext<LoadingContextType>(LoaderContext);
