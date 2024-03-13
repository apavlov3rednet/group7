import { useEffect, useState } from "react";
import Form from "../form/Form.jsx";
import Table from "../table/Table.jsx";

export default function Container({ curPath = '/' }) 
{
    const [row, setRow] = useState({});
    const [collectionName, setCollectionName] = useState(curPath);

    const handle = (value) => {
        if(value.data)
            setRow(value.data[0]);
    }

    useEffect(
        () => setCollectionName(curPath), [collectionName] 
    )

    return (
        <div className="container">
            <Form arValue={row} nameForm={ collectionName }></Form>
            <Table onChange={handle} nameTable={ collectionName }></Table>
        </div>
    )
}