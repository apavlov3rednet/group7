import { useCallback, useState, useEffect } from "react";
import './style.css';

export default function Table({nameTable}) {
    const [table, setTable] = useState({
        header: [],
        body: []
    });
    const [loading, setLoading] = useState(false);    

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/' + nameTable + '/');
        const dataTable = await response.json();

        const data = {
            header: dataTable.schema,
            body: dataTable.data
        }

        setTable(data);
        setLoading(false);
    }, [nameTable]);

    useEffect(
        () => {
            fetchTable()
        }, [fetchTable]
    );

    function getHeader(schema = {}) {
        let header = [];
        for(let i in schema) {
            if(i === '_id') {
                header.push({loc: 'ID'});
            }
            else {
                header.push(schema[i]);
            }

           // header.push((i === '_id') ? 'ID' : schema[i]);
        }

        header.push({});

        return (
            <tr>
                {
                    header.map((item, index) => (
                        <th key={index}
                            className={item.sort ? 'sortable' : null}>
                            {item.loc}
                             
                            {item.sort ? <span>::</span> : null}
                        </th>
                    ))
                }
            </tr>
        )
    }

    async function dropElement(e) {
        const url = 'http://localhost:8000/api/' + nameTable + '/' + e.target.value + '/';
        const confirmWindow = window.confirm('Уверены?');
        if(confirmWindow) {
            const response = await fetch(url);
            const answer = response.status;

            if(answer === 200) {
                fetchTable();
            }
        }
    }

    return(
        <table className="simple-table">
            <thead>
                {!loading && getHeader(table.header)}
            </thead>
            <tbody>
                {
                    !loading && table.body.map(row => (
                        <tr key={row._id} id={row._id}>
                            {
                            Object.values(row).map((col, index) => (
                                <td key={index}>
                                    {col && col}
                                </td>
                            ))
                            }

                            <td>
                                <button className='edit' value={row._id}></button>
                                <button className='drop' onClick={dropElement} value={row._id}></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}