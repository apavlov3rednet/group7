export class DOM
{
    /**
         * @param {*} tagName 
         * @param {className = '', attrs{}, styles{}, events{}, children[]} params 
         * @returns 
         */
    static create(tagName = '', params = {}) {
        if(!tagName)
            return false;

        let element = document.createElement(tagName);

        if(params.className) {
            let classList = params.className.split(' ');
            for (let index of classList) {
                element.classList.add(index);
            }
        }

        if(typeof params.attrs === 'object') { //attrs - attributes
            for(let i in params.attrs) {
                element.setAttribute(i, params.attrs[i]);
            }
        }

        if(typeof params.styles === 'object') {
            for(let i in params.styles) {
                element.style[i] = params.styles[i];
            }
        }

        if(typeof params.events === 'object') {
            for(let i in params.events) {
                element.addEventListener(i, params.events[i])
            }
        }

        if(typeof params.children === 'object' && params.children instanceof Array) {
            params.children.forEach(item => element.append(item));
        }

        return element;
    }

    static adjust(element = {}, params = {}) {
        if(Object.keys(element).length == 0) 
            return false;

            if(params.className) {
                let classList = params.className.split(' ');
                for (let index of classList) {
                    element.classList.add(index);
                }
            }

            if(typeof params.attrs === 'object') { //attrs - attributes
                for(let i in params.attrs) {
                    element.setAttribute(i, params.attrs[i]);
                }
            }

            if(typeof params.styles === 'object') {
                for(let i in params.styles) {
                    element.style[i] = params.styles[i];
                }
            }

            if(typeof params.events === 'object') {
                for(let i in params.events) {
                    element.addEventListener(i, params.events[i])
                }
            }

            if(typeof params.children === 'object' && params.children instanceof Array) {
                params.children.forEach(item => element.append(item));
            }
    }

    static removeStyle(element) {
        element.removeAttribute('style');
    }

    static clearItem(element = {}, all = false) {
        element.innerHTML = '';

        if(all) {
            DOM.removeStyle(element);
            element.removeEventListener();

            // Array.from(element.attributes).forEach(item => {
            //     element.removeAttribute(item);
            // })
        }
    }

    /**
     * @param {*} element 
     * @param {*} total - при true полное удаление, false - очистка
     */
    static removeItem(element = {}, total = false) {
        if(total) {
            element.remove();
        }
        else {
            DOM.clearItem(element, true);
        }
    }
}