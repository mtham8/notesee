(function () {
  'use strict'

  angular
    .module('notesee.classrooms')
    .controller('ClassroomsController', ClassroomsController)

  function ClassroomsController ($state, Rooms) {
    var vm = this

    vm.rooms = Rooms

    vm.create = create
    vm.leave = leave
    vm.view = view

    function create () {
      console.log('should show a form for creating a room')
    }

    function leave () {
      console.log('should leave the room')
    }

    function view () {
      $state.go('tab.notes')
    }
  }
})()
