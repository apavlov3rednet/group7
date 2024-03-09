import { useState } from 'react';

const Parent = () => {
    const [value, setValue] = useState('');

    const handleChange = (value) => {
        setValue(value);
    }

    return (
        <div>
            <Sibling1 onChange={handleChange}></Sibling1>
            <Sibling2 value={value}></Sibling2>
        </div>
    )
}

const Sibling1 = ({onChange}) => {
    const handleChange = (event) => {
        onChange(event.target.value);
    }

    return (
        <input type="text" onChange={handleChange} />
    )
}

const Sibling2 = ({value}) => {
    return (
        <span>{value}</span>
    )
}