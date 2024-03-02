import { useEffect, useState, useCallback } from 'react';
import './style.css';

export default function Menu() {
    const [menu, setMenu] = useState([]);

    const fetchMenu = useCallback(async () => {
        const response = await fetch('http://localhost:8000/api/Menu/');
        const answer = await response.json();
        setMenu(answer.data);
    }, []);

    useEffect(
        () => {fetchMenu()}, [fetchMenu]
    );

    return (
        <menu>   
            {
                menu && menu.map(menuElement => (
                    <li key={menuElement._id}><a href={menuElement.LINK}>{menuElement.NAME}</a></li>
                ))
            }
        </menu>
    )
}