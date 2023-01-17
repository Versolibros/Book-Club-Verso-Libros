const selectors = {
  customerAddresses: "[data-customer-addresses]",
  addressCountrySelect: "[data-address-country-select]",
  addressContainer: "[data-address]",
  toggleAddressButton: "button[aria-expanded]",
  cancelAddressButton: 'button[type="reset"]',
  deleteAddressButton: "button[data-confirm-message]",
};

const attributes = {
  expanded: "aria-expanded",
  confirmMessage: "data-confirm-message",
};

class CustomerAddresses {
  constructor() {
    this.elements = this._getElements();
    if (Object.keys(this.elements).length === 0) return;
    this._setupCountries();
    this._setupEventListeners();
  }

  _getElements() {
    const container = document.querySelector(selectors.customerAddresses);
    return container
      ? {
          container,
          addressContainer: container.querySelector(selectors.addressContainer),
          toggleButtons: document.querySelectorAll(
            selectors.toggleAddressButton
          ),
          cancelButtons: container.querySelectorAll(
            selectors.cancelAddressButton
          ),
          deleteButtons: container.querySelectorAll(
            selectors.deleteAddressButton
          ),
          countrySelects: container.querySelectorAll(
            selectors.addressCountrySelect
          ),
        }
      : {};
  }

  _setupCountries() {
    if (Shopify && Shopify.CountryProvinceSelector) {
      // eslint-disable-next-line no-new
      new Shopify.CountryProvinceSelector(
        "AddressCountry_new",
        "AddressProvince_new",
        {
          hideElement: "AddressProvinceContainer_new",
        }
      );
      this.elements.countrySelects.forEach((select) => {
        const formId = select.dataset.formId;
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector(
          `AddressCountry_${formId}`,
          `AddressProvince_${formId}`,
          {
            hideElement: `AddressProvinceContainer_${formId}`,
          }
        );
      });
    }
  }

  _setupEventListeners() {
    this.elements.toggleButtons.forEach((element) => {
      element.addEventListener("click", this._handleAddEditButtonClick);
    });
    this.elements.cancelButtons.forEach((element) => {
      element.addEventListener("click", this._handleCancelButtonClick);
    });
    this.elements.deleteButtons.forEach((element) => {
      element.addEventListener("click", this._handleDeleteButtonClick);
    });
  }

  _toggleExpanded(target) {
    const formBlockId = target.getAttribute("aria-controls");
    const formBlockElement = document.getElementById(formBlockId);
    const isExpanded = target.getAttribute(attributes.expanded) === "false";

    target.setAttribute(attributes.expanded, isExpanded.toString());
    formBlockElement.classList.toggle("hidden", isExpanded === false);
  }

  _handleAddEditButtonClick = ({ currentTarget }) => {
    this._toggleExpanded(currentTarget);
  };

  _handleCancelButtonClick = ({ currentTarget }) => {
    const toggleId = currentTarget.dataset.toggleId;
    const toggleElement = document.getElementById(toggleId);

    this._toggleExpanded(toggleElement);
  };

  _handleDeleteButtonClick = ({ currentTarget }) => {
    //eslint-disable-next-line no-alert
    if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
      Shopify.postLink(currentTarget.dataset.target, {
        parameters: { _method: "delete" },
      });
    }
  };
}
