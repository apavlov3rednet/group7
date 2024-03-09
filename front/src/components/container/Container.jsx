import { useState } from 'react';
import Form from '../form/Form.jsx';
import Table from '../table/Table.jsx';

export default function Container()
{
    const [row, setRow] = useState('');

    const handleChange = (value) => {
        setRow(value);
    }

    return (
        <div className="container">
            <Form value={row} nameForm='Brands'></Form>
            <Table onChange={handleChange} nameTable='Brands'></Table>  
        </div>
    )
}