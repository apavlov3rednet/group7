(function() {
    let obOwnerForm = document.getElementById('owner');
    let arOwners = [];

    obOwnerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let arFields = obOwnerForm.querySelectorAll('input');

        let owner = new Model();

        arFields.forEach(item => {
            let params = {};

            params[item.name] = item.value;

            owner.set(params);
        });

        let obOwner = new Owner(owner.data);
        arOwners.push(obOwner);

        console.log(arOwners);

        DB.setValue('owners', arOwners);
    });

})(window);