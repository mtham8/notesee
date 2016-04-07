(function () {
  'use strict'

  angular
    .module('notesee.notes')
    .controller('NotesController', NotesController)

  function NotesController (Notes) {
    var vm = this

    vm.notes = Notes
  }
})()
