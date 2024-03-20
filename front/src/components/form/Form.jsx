import { useState, useEffect } from "react";
import './style.css';
import config from "../../params/config";

export default function Form({nameForm, arValue = {}}) {
    //const shemaForm = schema[nameForm];
    const [schema, setSchema] = useState(null);
    const [formValue, setFormValue] = useState(arValue);
    const [url, setUrl] = useState(config.api + nameForm + '/');
    const [formName, setFormName] = useState(nameForm);
    const [render, setRender] = useState(false);

    useEffect(
        () => {

            async function fetchSchema() {
                const response = await fetch(config.api + 'schema/get/' + formName + '/');
                const answer = await response.json();

                for(let key in answer) {
                    let el = answer[key];

                    if(el.type === 'DBRef') {
                        let mdb = await fetch(config.api + el.collection + '/');
                        let ar = await mdb.json();
                        answer[key].arList = ar.data;
                    }
                }

                setSchema(answer);
            }
            setFormName(nameForm);
            setUrl(config.api + nameForm + '/');
            fetchSchema();
            setFormValue(arValue);
        }, [nameForm, arValue, formName, render]
    );

    function renderForm(data = {}, ar = {}, rand = 0) {
        let formElements = [];

        for(let i in data) {
            let newRow = data[i];

            newRow.code = i;
            newRow.value = (ar[i]) ? ar[i] : ''; //todo: Скорректировать под select

            switch(newRow.type) {
                case 'String':
                    newRow.fieldType = 'text';
                break;

                case 'Number':
                    newRow.fieldType = 'number';
                break;

                case 'Phone':
                    newRow.fieldType = 'tel';
                break;

                case 'Email':
                    newRow.fieldType = 'email';
                break;

                case 'DBRef':
                    newRow.fieldType = 'select';
                    newRow.list = renderSelect(newRow);
                break;

                case 'Hidden':
                default:
                    newRow.fieldType = 'hidden';
                break;
            }

            formElements.push(newRow);
        }

        return (
            <>
                {
                    formElements.map((item, index) => (
                        <label key={index} htmlFor={item.code}>
                            <span>{item.loc}</span>
                            {item.fieldType !== 'select' && <input type={item.fieldType} 
                                required={(item.require) ? true : false}
                                defaultValue={item.value && item.value}
                                step={(item.fieldType === 'number') ? '1000' : null}
                                name={item.code} />}

                            {item.fieldType === 'select' && <select name={item.code}>{item.list}</select>}
                        </label>
                    ))
                }
            </>
        )
    }

    function renderSelect(ar) {
        let list = ar.arList;
        let value = ar.value._id;
        
        return (
            <>
                <option key='0' value='0'>Выберите...</option>
                {
                    list.map(item => (
                        <option selected={value === item._id} key={item._id} value={item._id}>{item.TITLE}</option>
                    ))
                }
            </>
        )
    }

    function resetForm(event) {
        event.preventDefault();

        setRender(Math.random(4));
    }

    return (
        
        <form method="POST" action={url}>
            {renderForm(schema, formValue, render) }

            <button>Сохранить</button>
            <button onClick={resetForm}>Сбросить</button>
        </form>
    )
}