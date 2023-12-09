(function () {
  let obOwnerForm = document.getElementById("owner");
  let obCardForm = document.getElementById("card");
  let obBrandForm = document.getElementById("brand");

  let selectOwner = obCardForm.querySelector("[name=OWNER]");
  let selectBrand = obCardForm.querySelector('[name=BRAND]');

  let arOwners = DB.getValue("owners") || [];
  let arBrands = DB.getValue('brands') || [];

  function updateSelect(select, ar, titleChoice = 'Выберите') {
    let children = [];

    select.innerHTML = "";

    children.push(
      DOM.create("option", {
        attrs: { value: 0 },
        text: titleChoice,
      })
    );

    ar.forEach((item) => {
      if (Object.keys(item).length > 0) {
        children.push(
          DOM.create("option", {
            attrs: { value: item.id },
            text: Object.values(item.params).join(' '),
          })
        );
      }
    });

    DOM.adjust(select, {
      children: children,
    });
  }

  obOwnerForm.addEventListener("submit", function (event) {
    event.preventDefault(); //останавливает штатное событие

    let arFields = obOwnerForm.querySelectorAll("input");

    let owner = new Model();

    arFields.forEach((item) => {
      let params = {};

      params[item.name] = item.value;

      owner.set(params);
    });

    arOwners.push(owner);

    DB.setValue("owners", arOwners);

    updateSelect(selectOwner, arOwners, 'Выберите владельца');
  });

  obBrandForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let brand = new Model();

    let arFields = obBrandForm.querySelectorAll("input");

    arFields.forEach((item) => {
      let params = {};

      params[item.name] = item.value;

      brand.set(params);
    });

    arBrands.push(brand);

    DB.setValue("brands", arBrands);

    updateSelect(selectBrand, arBrands);
  });

  updateSelect(selectOwner, arOwners, 'Выберите владельца');
  updateSelect(selectBrand, arBrands);


})(window);