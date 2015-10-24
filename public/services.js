/*
 * SERVICES
 */

'use strict';

angular.module('question-cookie.services', [])
  .factory('Post', function ($resource, HOST) {
    return $resource(HOST + '/api/room/:roomName/posts/:id', {  roomName: '@roomName', id: '@id' })
  })

  .factory('socket', ['socketFactory', function (socketFactory) {
    var socket = socketFactory();
    // {
        // ioSocket: io.connect('http://localhost:1337/')
      // , prefix: ''
    // }
    
    // socket.forward('broadcast.total_clients_count')

    socket.forward('broadcast.join_room')
    socket.forward('broadcast.leave_room')
    socket.forward('broadcast.post');
    socket.forward('broadcast.comment');
    socket.forward('broadcast.vote_up');
    socket.forward('broadcast.vote_down');
    return socket
  }]);
