
import { useEffect, useState } from "react";
import axios from "axios";


 export const useFetch = (endpoint) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        axios.get(endpoint)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [data]);

    return {data, loading, error};
};

