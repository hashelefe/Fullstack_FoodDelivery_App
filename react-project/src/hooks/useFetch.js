import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [fetched, setFetched] = useState([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        async function getData() {
            
                const request = fetch(url);
                const response = await request;
                const parsed = await response.json();
                setFetched(parsed);
                setIsPending(false);
            }

                getData();
            }, [url]);


    return {fetched, isPending};

}

export default useFetch;