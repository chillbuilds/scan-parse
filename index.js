const copy = require('clipboardy')
const robot = require('robotjs')
const inquirer = require('inquirer')
const Artyom = require('artyom.js')
const artyom = new Artyom()
const fs = require('fs')
var barcodeArr= []

function barcodePrompt() {
inquirer.prompt({
    type:'input',
    name: 'input',
    message: `${barcodeArr.length} scanned`
}).then(function(data){
    if(data.input !== ''){
        barcodeArr.push(data.input)
        barcodePrompt()
    }else{
        barcodeParse()
    }
})
}

function barcodeParse() {
    let x = barcodeArr.join('" "')
    let y = ['"',x,'"']
    let z = y.join('')
    copy.writeSync(z)
    console.log('copied to clipboard')
    setTimeout(function(){}, 1000)
}

var commandHello = {
    indexes:["hello","good morning","hey"], // These spoken words will trigger the execution of the command
    action:function(){ // Action to be executed when a index match with spoken word
        artyom.say("Hey buddy ! How are you today?");
    }
};

artyom.addCommands(commandHello); // Add the command with addCommands method. Now

barcodePrompt()