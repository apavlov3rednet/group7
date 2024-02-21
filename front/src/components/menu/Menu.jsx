import { useEffect, useState } from 'react';
import './style.css';

export default function Menu(props) {
    const [data, setData] = useState(props.menu);

    useEffect(
        () => {
            setData(props.menu);
            console.log(data);
        }, []
    )

    return (
        <menu>   
            {/* { data.map(item => {
                console.log(item);
                
            })}          */}
        </menu>
    )
}