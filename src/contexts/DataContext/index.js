import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lastEvent, setLastEvent] = useState(null); // Ajout lastEvent
  const getData = useCallback(async () => {
    try { 
      const responseData = await api.loadData();
       console.log("data", responseData);
      setData(responseData);
      if (responseData && responseData.events && responseData.events.length > 0) {
        const latestEvent = responseData.events[0];
        setLastEvent(latestEvent); 
        // mise à jour du dernier evenement
      }
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  }, [data, getData]);
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        lastEvent, 
        // ajout lastEvent au dataContext
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
