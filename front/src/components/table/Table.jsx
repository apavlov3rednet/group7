import { useCallback, useState, useEffect } from "react";
import './style.css';
import config from "../../params/config";

export default function Table({nameTable, onChange})
{
    const [table, setTable] = useState({
        header: [],
        body: [],
        sim: []
    });
    const [loading, setLoading] = useState(false);    

    const fetchTable = useCallback(async () => {
        setLoading(true);
        const response = await fetch(config.api + nameTable + '/');
        const dataTable = await response.json();
        const data = {
            header: dataTable.schema,
            body: dataTable.data,
            sim: dataTable.sim
        }

        console.log(data);

        setTable(data);
        setLoading(false);
    }, [nameTable, onChange]);

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

    function getContent(col, index, sim, schema) {
        let value = '';

        if(col.ref) {
            let val = sim[col.collectionName].filter(item => item._id === col._id)[0];
            value = val.TITLE;
        }
        else {
            value = col;
        }

        return (
            <td key={index}>
                {value && value}
            </td>
        )
    }

    async function edit(e) {
        const url = config.api + nameTable + '/?id=' + e.target.value;
        const response = await fetch(url);
        const answer = await response.json();
        onChange(answer);
    }

    async function dropElement(e) {
        const url = config.api + nameTable + '/' + e.target.value + '/';
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
                               getContent(col, index, table.sim, table.header)
                            ))
                            }

                            <td>
                                <button className='edit' onClick={edit} value={row._id}></button>
                                <button className='drop' onClick={dropElement} value={row._id}></button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}