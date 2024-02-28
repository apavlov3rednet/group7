import { useCallback, useState, useEffect } from "react";
import './style.css';

export default function Table() {
    const [table, setTable] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/getBrands/');
        const dataTable = await response.json();
        console.log(dataTable);
        setTable(dataTable);
        setLoading(false);
    }, []);

    useEffect(
        () => {
            fetchTable()
        }, [fetchTable]
    );

    return(
        <table className="simple-table">
            <thead>
                
            </thead>
            <tbody>
                {
                    !loading && table.map(row => (
                        <tr key={row._id} id={row._id}>
                            {
                            Object.values(row).map(col => (
                                <td>
                                    {col && col}
                                    {!col && <p>Пусто...</p>}
                                </td>
                            ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}