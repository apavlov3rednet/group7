import { useState, useEffect } from "react";
import config from '../../params/config.js';
import './style.css';

export default function Search({ onChange, nameCollection }) {

    const [schema, setSchema] = useState(null);

    useEffect(
        () => {

            async function fetchSchema() {
                const response = await fetch(config.api + 'get/schema/' + nameCollection + '/');
                const answer = await response.json();

                for(let key in answer) {
                    let el = answer[key];

                    if(el.type === 'DBRef') {
                        let mdb = await fetch(config.api + 'get/' + el.collection + '/');
                        let ar = await mdb.json();
                        answer[key].arList = ar.data;
                    }
                }

                setSchema(answer);
            }
            fetchSchema();
            
        }, [nameCollection]
    );

    function inputValue(event) {
        onChange(event.target.value);
    }

    function toggleForm() {
        let modal = document.querySelector('div.modal');
        let overlay = document.querySelector('div.overlay');
        modal.classList.toggle('show');
        overlay.classList.toggle('show');
    }

    return (
        <>
            <div className='searchPanel'>
                <label>
                    <input onChange={inputValue} placeholder='Введите поисковый запрос' />
                </label>

                <button onClick={toggleForm}></button>
            </div>

            <div className='modal'>
                <div className='modal-head'>Фильтер <button onClick={toggleForm}></button></div>
            </div>

            <div className='overlay' onClick={toggleForm}></div>
        </>
    )
}