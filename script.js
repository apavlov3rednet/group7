'use strict';
(function() {
    var DataBase = {
        setValue: function(key, value) {
            if(typeof value === undefined || typeof value === null || value === '')
                this.removeValue(key);
 
            window.localStorage.setItem(key, JSON.stringify(value)); // [Object object]
        },

        getValue: function(key) {
            let value = window.localStorage.getItem(key);

            if(this.isJson(value))
                return JSON.parse(value);

            return value;
        },

        isJson: function(value) {
            try {
                JSON.parse(value);
            }
            catch(error) {
                return false;
            }

            return true;
        },

        removeValue: function(key) {
            window.localStorage.removeItem(key);
        },

        clear: function() {
           // window.localStorage.clear();
        }
    }

    // DataBase.setValue('name', 'Ivan');
    // DataBase.setValue('ar', [100, 200, 'Petrov', null, false]);
    // DataBase.setValue('ob', {test: 'ya', test2: 'google'});

    var Owner = {
        user: {},

        setName: function(firstName = '', lastName = '', secondName) {
            if(typeof firstName != 'string' || typeof lastName != 'string')
                return false;

            this.user = {
                firstName: firstName,
                lastName: lastName
            }

            if(typeof secondName === 'string' && secondName!="")
                this.user.secondName = secondName;
        },

        getUser: function() {
            return this.user;
        },

        getFullName: function() {
            if(Object.keys(this.user).lenght > 0)
                return this.user.lastName + ' ' + this.user.lastName + this.getSecondName();
        },

        getSecondName: function() {
            if(this.user.secondName)
                return ' ' + this.user.secondName;
        },

        setBirthDate: function(date) {
            try {
                if(date instanceof Date) {
                    let d = new Date(date);

                    this.user.dateBD = d;
                }
            }
            catch() {
                return false;
            }
        },

        isBirthDate: function() {
            //обработчик
        }
    }
})(window);