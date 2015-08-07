'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('QtcoreGenerator') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\'s name ?'
    },{
        type: 'confirm',
        name: 'addQOject',
        message: 'Add QObject ?',
        default: true
    },
    {
    type: "input",
    name: "phone",
    message: "What's your phone number",
    validate: function( value ) {
      var pass = value.match(/^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
      if (pass) {
        return true;
      } else {
        return "Please enter a valid phone number";
      }
    }
  },
  {
    type: "list",
    name: "size",
    message: "What size do you need",
    choices: [ "Large", "Medium", "Small" ],
    filter: function( val ) { return val.toLowerCase(); }
  },
  {
    type: "input",
    name: "quantity",
    message: "How many do you need",
    validate: function( value ) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
  {
    type: "expand",
    name: "toppings",
    message: "What about the toping",
    choices: [
      {
        key: "p",
        name: "Peperonni and chesse",
        value: "PeperonniChesse"
      },
      {
        key: "a",
        name: "All dressed",
        value: "alldressed"
      },
      {
        key: "w",
        name: "Hawaïan",
        value: "hawaian"
      }
    ]
  },
  {
    type: "rawlist",
    name: "beverage",
    message: "You also get a free 2L beverage",
    choices: [ "Pepsi", "7up", "Coke" ]
  },
  {
    type: "input",
    name: "comments",
    message: "Any comments on your purchase experience",
    default: "Nope, all good!"
  },
  {
    type: "list",
    name: "prize",
    message: "For leaving a comments, you get a freebie",
    choices: [ "cake", "fries" ],
    when: function( answers ) {
      return answers.comments !== "Nope, all good!";
    }
  }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.addQOject = props.addQOject;
        console.log("\nOrder receipt:");
      console.log( JSON.stringify(props, null, "  ") );
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
