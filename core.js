(function() {
    let obOwnerForm = document.getElementById('owner');
    let arOwners = DB.getValue('owners') || [];

    obOwnerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let arFields = obOwnerForm.querySelectorAll('input');

        let owner = new Model();

        arFields.forEach(item => {
            let params = {};

            params[item.name] = item.value;

            owner.set(params);
        });

        arOwners.push(owner);

        DB.setValue('owners', arOwners);
    });

})(window);