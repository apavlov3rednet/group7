import { useCallback, useEffect, useState } from "react";
import config from "../../params/config";

export default function Index() 
{
    const [table, setTable] = useState({});
    const [loading, setLoading] = useState(false);    

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.api + 'collection/get/list/');
        //const dataTable = await response.json();
        // setTable(dataTable);
         setLoading(false);
    }, []);

    useEffect(
        () => {
            fetchTable()
        }, [fetchTable]
    );


    return (
        <div>
            <h1>Single Page Application - group 7</h1>
        </div>
    )
}