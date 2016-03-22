/*global alert, document, Tools, Autocomplete, FormData, Templates */
/*jslint nomen: true*/
(function () {
    'use strict';
    var elements,
        formData,
        templates,
        formElement,
        formElements,
        damageSection;
    
    elements = document.querySelectorAll('[data-custom]');
    formData = new FormData();
    templates = new Templates();
    
    formElement = document.getElementById('add-form');
    formElements = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
    damageSection = document.getElementById('damage-section');
    
    Tools.forEach(elements, function (element) {
        var elementName = element.getAttribute('data-values'),
            computedData = {
                values: formData[elementName],
                template: templates[elementName]
            };
        new Autocomplete(element, computedData);
    });
    
    /**
     * Clears all the error spans inside the element
     * @method removeErrorElements
     * @param {object} 
     */
    function removeErrorElements(element) {
        var errorElements;
        
        element = element || document.body;
        errorElements = element.querySelectorAll('.error-message');
        
        Tools.forEach(errorElements, function (_element) {
            _element.parentElement.removeChild(_element);
        });
    }
    
    /**
     * Creates a span containing the error message
     * 
     * @method createErrorElement
     * @param   {[[Type]]} errorMessage [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    function createErrorElement(errorMessage) {
        var element = document.createElement('span');
        element.className = 'error-message';
        element.textContent = errorMessage;
        
        return element;
    }
    
    /**
     * Appends an error to an invalid field
     * 
     * @method addErrorToField
     * @param {object} errorData [[Description]]
     */
    function addErrorToField(errorData) {
        errorData.element.parentElement.appendChild(createErrorElement(errorData.error));
    }
    
    /**
     * Validates a single element
     * 
     * @method validateElement
     * @param   {object}   element [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    function validateElement(element) {
        var valid = true,
            errorData;
        // check if element is visible and empty
        if (element.value === '' && element.offsetParent !== null) {
            valid = false;
            errorData = {
                element: element,
                error: 'Field cannot be empty'
            };
        }

        // if element is valid check if the element is required to be a number
        // and it is a number or not
        if (valid && element.type === 'number') {
            if (isNaN(element.value)) {
                valid = false;
                errorData = {
                    element: element,
                    error: 'Value must be a number'
                };
            }
        }

        // if element is valid check if the element is required to be a number
        // and it is a number or not
        if (valid && element.type === 'number') {
            if (element.value < 0) {
                valid = false;
                errorData = {
                    element: element,
                    error: 'Value must be positive'
                };
            }
        }

        // add error for current field if required
        if (!valid) {
            addErrorToField(errorData);
        }
        
        return errorData;
    }
    
    /**
     * Validates the entire form passing trough each element
     * 
     * @method validateForm
     */
    function validateForm() {
        var errors = [];
        
        removeErrorElements(formElement);
        
        Tools.forEach(formElements, function (element) {
            var errorData = validateElement(element);
            
            if (errorData) {
                errors.push(errorData);
            }
        });
        
        if (errors.length === 0) {
            alert('good to send!');
        }
    }
    
    /**
     * Callback function for any form element change
     * 
     * @param {object} event [[Description]]
     */
    function formElementChange(event) {
        var target = event.target;
        
        if (target.name === 'damaged') {
            if (target.value === 'yes') {
                damageSection.style.display = 'block';
            } else {
                damageSection.style.display = 'none';
            }
        }
        
        // remove error element if exists
        removeErrorElements(target.parentElement);
        validateElement(target);
    }
    
    /**
     * Callback to execute when form is sumbitted
     * 
     * @param {[[Type]]} event [[Description]]
     */
    function formSubmit(event) {
        event.preventDefault();
        
        validateForm();
    }
    
    // listen for changes on form
    formElement.addEventListener('change', formElementChange);
    
    // listen for form submit
    formElement.addEventListener('submit', formSubmit);
}());
