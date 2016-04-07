(function () {
  'use strict'

  angular
    .module('notesee')
    .run(run)

  function run ($state) {
    $state.go('landing')
  }
})()
