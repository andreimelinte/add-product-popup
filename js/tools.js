/*jslint nomen: true*/
/**
 * Module containing some commonly used funcitons in this example
 * @module tools
 */
var Tools = {
    
    /**
     * Filters an array of elements
     * 
     * @method filter
     * @param   {object}   data     [[Description]]
     * @param   {[[Type]]} callback [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    filter: function (data, callback) {
        'use strict';
        var i = 0,
            result = [];
        
        if (data.filter) {
            return data.filter(callback);
        }
        
        for (i = 0; i < data.length; i += 1) {
            if (callback(data[i], i)) {
                result.push(data[i]);
            }
        }
        
        return result;
    },

    /**
     * Executes a callback on each element of an array
     * 
     * @method forEach
     * @param   {object}   data     [[Description]]
     * @param   {[[Type]]} callback [[Description]]
     * @returns {boolean}  [[Description]]
     */
    forEach: function (data, callback) {
        'use strict';
        var i = 0;
        
        if (data.forEach) {
            data.forEach(callback);
            return true;
        }
        
        if (data.length === undefined) {
            for (i in data) {
                if (data.hasOwnProperty(i)) {
                    if (callback(data[i], i) === false) {
                        break;
                    }
                }
            }
            return true;
        }
        
        for (i = 0; i < data.length; i += 1) {
            if (callback(data[i], i) === false) {
                break;
            }
        }
    },
    
    /**
     * Finds the index of a certain element in an array
     * 
     * @method findIndex
     * @param   {object}   data     [[Description]]
     * @param   {[[Type]]} callback [[Description]]
     * @returns {boolean}  [[Description]]
     */
    findIndex: function (data, callback) {
        'use strict';
        var currentIndex = -1;
        
        if (data.findIndex && typeof callback === 'function') {
            return data.findIndex(callback);
        }
        
        if (typeof callback === 'function') {
            this.forEach(data, function (_data, index) {
                if (callback(_data, index)) {
                    currentIndex = index;
                    return false;
                }
            });
           
            return currentIndex;
        }
        
        this.forEach(data, function (_data, index) {
            if (callback === _data) {
                currentIndex = index;
                return false;
            }
        });

        return currentIndex;
    },
    
    /**
     * Passes each value in the array trough a callback function and
     * returns a new array with the results
     * 
     * @method map
     * @param   {object}   data     [[Description]]
     * @param   {[[Type]]} callback [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    map: function (data, callback) {
        'use strict';
        var result = [],
            i = 0;
        
        if (data.map) {
            return data.map(callback);
        }
        
        for (i = 0; i < data.length; i += 1) {
            result.push(callback(data[i], i));
        }
        
        return result;
    },
    
    /**
     * Creates a className from an array of strings
     * 
     * @method classnames
     * @param   {[[Type]]} classList [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    classnames: function (classList) {
        'use strict';
        var className = '';
        
        this.forEach(classList, function (_className, i) {
            if (_className && typeof _className === 'string') {
                className += ' ' + _className;
            }
        });
        
        return className;
    },
    
    /**
     * Removes a class from a className value
     * 
     * @method removeClass
     * @param   {string}   className     [[Description]]
     * @param   {[[Type]]} classToRemove [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    removeClass: function (className, classToRemove) {
        'use strict';
        var classes = className.split(' '),
            currentClassId = Tools.findIndex(classes, classToRemove);
        
        if (currentClassId !== -1) {
            classes.splice(currentClassId, 1);
            return classes.join(' ');
        }
        
        return className;
        
    },
    
    /**
     * Check if a className value contains a class
     * 
     * @method hasClass
     * @param   {string}   className    [[Description]]
     * @param   {[[Type]]} classToCheck [[Description]]
     * @returns {boolean}  [[Description]]
     */
    hasClass: function (className, classToCheck) {
        'use strict';
        var classes = className.split(' ');
        
        if (this.findIndex(classes, classToCheck) === -1) {
            return false;
        }
        
        return true;
    },
    
    /**
     * Adds a class value or a list of classes to a className
     * 
     * @method addClass
     * @param   {string} className  [[Description]]
     * @param   {string | array} classToAdd [[Description]]
     * @returns {string} [[Description]]
     */
    addClass: function (className, classToAdd) {
        'use strict';
        var _className = className;
        
        if (!classToAdd) {
            return className;
        }
        
        if (this.hasClass(className, classToAdd)) {
            return className;
        }
        
        if (typeof classToAdd === 'string') {
            _className += ' ' + classToAdd;
            
            return _className;
        }
        
        if (typeof classToAdd === 'object' && classToAdd.length !== undefined) {
            this.forEach(classToAdd, function (_cn) {
                _className += ' ' + _cn;
            });
            
            return _className;
        }
        
        return className;
        
    },
    
    /**
     * Receives a template and some data. Replaces all found data into
     * the template
     * 
     * @method computeTemplate
     * @param   {string}   template [[Description]]
     * @param   {[[Type]]} data     [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    computeTemplate: function (template, data) {
        'use strict';
        var _template = template;
        
        this.forEach(data, function (value, element) {
            _template = _template.replace(new RegExp('{{' + element + '}}', 'g'), value);
        });
        
        return _template;
    },
    
    /**
     * Returns the first found parent containing the parentClass class
     * 
     * @method getParentElement
     * @param   {object}   element     [[Description]]
     * @param   {[[Type]]} parentClass [[Description]]
     * @returns {[[Type]]} [[Description]]
     */
    getParentElement: function getParentElement(element, parentClass) {
        'use strict';
        
        if (!element) {
            return null;
        }
        if (this.hasClass(element.className, parentClass)) {
            return element;
        }
        
        return this.getParentElement(element.parentElement, parentClass);
    }
    
};
/*jslint nomen: false*/