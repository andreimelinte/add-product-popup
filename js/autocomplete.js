/*global Tools, document */
/**
 * Enhances a simple imput with autocomplete feature
 * 
 * @module Autocomplete
 */
/**
 * Global property which keeps track of the current focused element
 * 
 * @property focusedElement
 */
var focusedElement = null;
function Autocomplete(element, data) {
    'use strict';
    
    var self = this;
    
    this.element = element;
    this.data = data.values || [];
    this.placeholderElement = document.createElement('span');
    this.filteredData = data.values || [];
    this.template = data.template || this.defaultTemplate;
    this.optionList = document.createElement('ul');
    this.currentOptionValue = '';
    
    this.init();
    
    this.placeholderElement.className = 'option-value';
    
    this.element.parentElement.appendChild(this.placeholderElement);
    this.element.parentElement.appendChild(this.optionList);
    
    this.element.addEventListener('keyup', function (event) {
        event.stopPropagation();
        
        self.filterElements(event.target.value);
    });
    
    this.element.addEventListener('focus', function (event) {
    
        self.filteredData = self.data;
        self.renderElementList();
        self.focusElement();
    });
    
    this.optionList.addEventListener('click', function (event) {
        event.preventDefault();
        var clickedElement = Tools.getParentElement(event.target, 'autocomplete-option');
        
        self.setOptionValue(clickedElement.getAttribute('data-value'));
        self.element.value = clickedElement.getAttribute('data-value');
        self.unfocusElement();
    });
}

/**
 * Default template for the custom autocomplete
 * 
 * @property defaultTemplate
 */
Autocomplete.prototype.defaultTemplate = '{{value}}';

/**
 * Filter elements that should be displayed in the autocomplete list
 * 
 * @method filterElements
 * @param   {[[Type]]} inputValue [[Description]]
 * @returns {[[Type]]} [[Description]]
 */
Autocomplete.prototype.filterElements = function (inputValue) {
    'use strict';
    var self = this;
    this.filteredData = Tools.filter(this.data, function (dataElement) {
        return (dataElement.name && dataElement.name.search(inputValue) !== -1) ||
               (dataElement.value && dataElement.value.search(inputValue) !== -1) ||
               (dataElement.alias && dataElement.alias.search(inputValue) !== -1);
    });
    
    this.renderElementList();
};

/**
 * Renders the autocomplete options list
 * 
 * @method renderElementList
 */
Autocomplete.prototype.renderElementList = function () {
    'use strict';
    var optionsList = this.createOptionsList(this.filteredData, this.template.option),
        parent = this.element.parentElement;
    parent.className = Tools.addClass(parent.className, 'option-list-parent');
};

/**
 * Creates a single option element
 * 
 * @method createOptionElement
 * @param   {object}   elementData [[Description]]
 * @param   {[[Type]]} template    [[Description]]
 * @returns {[[Type]]} [[Description]]
 */
Autocomplete.prototype.createOptionElement = function (elementData, template) {
    'use strict';
    var element = document.createElement('li');
    
    element.className = Tools.addClass('autocomplete-option', elementData.className);
    element.setAttribute('data-value', elementData.value);
    element.innerHTML = Tools.computeTemplate(template, elementData);
    
    return element;
};

/**
 * Set the selected value as the input value
 * 
 * @method setOptionValue
 * @param   {[[Type]]} newValue [[Description]]
 * @returns {[[Type]]} [[Description]]
 */
Autocomplete.prototype.setOptionValue = function (newValue) {
    'use strict';
    var optionIndex = Tools.findIndex(this.data, function (data) {
        return data.value === newValue;
    });
    
    this.placeholderElement.innerHTML = Tools.computeTemplate(this.template.inputValue, this.data[optionIndex]);
    this.currentOptionValue = newValue;
};

/**
 * Method to remove focus from the current element
 * 
 * @method unfocusElement
 */
Autocomplete.prototype.unfocusElement = function () {
    'use strict';
    
    this.element.parentElement.className = Tools.removeClass(this.element.parentElement.className, 'focused');
    
    focusedElement = null;
};

/**
 * Method that adds focus to the current element
 * 
 * @method focusElement
 */
Autocomplete.prototype.focusElement = function () {
    'use strict';
    
    this.element.parentElement.className = Tools.addClass(this.element.parentElement.className, 'focused');
    
    focusedElement = this;
};

/**
 * Creates the autocomplete options list
 * 
 * @mmethod createOptionsList
 * @param {[[Type]]} elements [[Description]]
 * @param {[[Type]]} template [[Description]]
 */
Autocomplete.prototype.createOptionsList = function (elements, template) {
    'use strict';
    var self = this;
    this.optionList.className = 'options-list';
    
    this.optionList.innerHTML = '';
    
    Tools.forEach(elements, function (element) {
        self.optionList.appendChild(self.createOptionElement(element, template));
    });
};

/**
 * Initializes the Autocomplete module
 * 
 * @method init
 */
Autocomplete.prototype.init = function () {
    'use strict';
    this.renderElementList();
};

document.addEventListener('click', function (event) {
    'use strict';
    var target = event.target;
    
    if (focusedElement) {
        if (!Tools.hasClass(target.className, 'autocomplete-options') &&
                !Tools.hasClass(target.parentElement.className, 'focused')) {
            focusedElement.unfocusElement();
        }
    }
});