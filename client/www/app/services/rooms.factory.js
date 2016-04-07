(function () {
  'use strict'

  angular
    .module('notesee')
    .factory('Rooms', Rooms)

  function Rooms () {
    return [
      {name: 'MKS35'},
      {name: 'HR2'}
    ]
  }
})()
