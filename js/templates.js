/** 
 * Contains templates for each custom dropdown
 * 
 * @method Templates
 * @returns {object} [[Description]]
 */
var Templates = function () {
    return {
        brand: {
            option: '<img src="images/cars/{{logo}}" class="option-logo">' + 
               '<span class="option-name">{{name}}',
            inputValue: '<img src="images/cars/{{logo}}" class="option-logo">' + 
               '<span class="option-name">{{name}}'
        },
        
        color: {
            option: '<span class="color-square" style="background-color: {{value}}"></span>' + 
               '<span class="option-name">{{name}}({{value}})</span>',
            inputValue: '<span class="full-color-display" style="background-color: {{value}}"></span>'
        },
        
        currency: {
            option: '<span class="currency-square">{{symbol}}</span> <span class="option-name">{{name}}</span>',
            inputValue: '<span class="currency-square">{{symbol}}</span> <span class="option-name">{{name}}</span>'
        },
        
        fuel: {
            option: '<span class="option-name">{{name}}</span>',
            inputValue: '<span class="option-name">{{name}}</span>'
        }
    };
}