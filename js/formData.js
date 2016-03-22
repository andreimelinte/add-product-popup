var FormData = function () {
    'use strict';
    
    return {
        brand: [{
            name: 'Opel',
            logo: 'opel.png',
            value: 'opel'
        }, {
            name: 'Volkswagen',
            alias: 'vw',
            logo: 'vw.png',
            value: 'vw'
        }, {
            name: 'Audi',
            logo: 'audi.png',
            value: 'audi'
        }, {
            name: 'BMW',
            logo: 'bmw.png',
            value: 'bmw'
        }, {
            name: 'Toyota',
            logo: 'toyota.png',
            value: 'toyota'
        }, {
            name: 'Dacia',
            logo: 'dacia.png',
            value: 'dacia'
        }, {
            name: 'Other',
            value: 'other',
            logo: 'other.png'
        }],
        
        fuel: [{
            name: 'petrol',
            value: 'petrol'
        }, {
            name: 'diesel',
            value: 'diesel'
        }, {
            name: 'hybrid',
            value: 'hybrid'
        }, {
            name: 'electric',
            value: 'electric'
        }],
        
        currency: [{
            name: 'USD',
            symbol: '$',
            value: 'usd'
        }, {
            name: 'Romanian leu',
            symbol: 'RON',
            value: 'ron'
        }, {
            name: 'Euro',
            symbol: '€',
            value: 'eur'
        }, {
            name: 'Pound',
            symbol: '£',
            value: 'pnd'
        }],
        
        color: [{
            name: 'red',
            value: '#ff0000'
        }, {
            name: 'crimson',
            value: '#dc143c'
        }, {
            name: 'indian red',
            value: '#cd5c5c'
        }, {
            name: 'salmon',
            value: '#fa8072'
        }, {
            name: 'yellow',
            value: '#ffff00'
        }, {
            name: 'gold',
            value: '#ffd700'
        }, {
            name: 'indigo',
            value: '#4b0082'
        }, {
            name: 'green',
            value: '#008000'
        }, {
            name: 'blue',
            value: '#0000ff'
        }, {
            name: 'royal blue',
            value: '#4169e1'
        }, {
            name: 'navy',
            value: '#000080'
        }, {
            name: 'sky blue',
            value: '#87ceeb'
        }, {
            name: 'black',
            value: '#000000'
        }]
    };
};
