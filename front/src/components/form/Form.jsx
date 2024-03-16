import { useState, useEffect } from "react";
import './style.css';
import config from "../../params/config";

export default function Form({nameForm, arValue = {}}) {
    //const shemaForm = schema[nameForm];
    const [schema, setSchema] = useState(null);
    const [formValue, setFormValue] = useState(arValue);
    const [url, setUrl] = useState(config.api + nameForm + '/');
    const [formName, setFormName] = useState(nameForm);

    useEffect(
        () => {

            async function fetchSchema() {
                const response = await fetch(config.api + 'schema/get/' + formName + '/');
                const answer = await response.json();
                setSchema(answer);
            }
            setFormName(nameForm);
            setUrl(config.api + nameForm + '/');
            fetchSchema();
            setFormValue(arValue);
        }, [nameForm, arValue, formName]
    );

    function renderForm(data = {}, ar = {}) {
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
                            <input type={item.fieldType} 
                                required={(item.require) ? true : false}
                                defaultValue={item.value && item.value}
                                step={(item.fieldType === 'number') ? '1000' : null}
                                name={item.code} />
                        </label>
                    ))
                }
            </>
        )
    }

    return (
        
        <form method="POST" action={url}>
            {renderForm(schema, formValue) }

            <button>Сохранить</button>
        </form>
    )
}