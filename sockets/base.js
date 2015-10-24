/*
 * SOCKETS BASE.JS
 */

var Post = require('mongoose').model('Post');
var Comment = require('mongoose').model('Comment');

'use strict';

module.exports = function (io) {  
  // io.set('origins', '*localhost:1337');
  io.on('connection', function (socket){
    // BROADCAST TOTAL QUESTION COOKIE CLIENTS
    // var totalClientsCount = Object.keys(io.sockets.sockets).length
    // io.sockets.emit('broadcast.total_clients_count', totalClientsCount)
    // console.log(totalClientsCount);

    // socket.on('disconnect', function (data) {
    //   var totalClientsCount = Object.keys(io.sockets.sockets).length
    //   io.sockets.emit('broadcast.total_clients_count', totalClientsCount)
    // });

    function getClientCount(roomName) {
      var room = io.sockets.adapter.rooms[roomName]; 
      if (room) {
        return Object.keys(room).length;  
      } else {
        return 0;
      }
    }
    
    // PUBLISH JOINING ROOM
    socket.on('publish.join_room', function (data) {
      console.log('user joined room', data.roomName);
      socket.join(data.roomName);

      var clientsCount = getClientCount(data.roomName)
      //GET ROOM USER COUNT SOCKET.IO >=1.3.5
      
      io.sockets.in(data.roomName).emit('broadcast.join_room', clientsCount)
    });

    // PUBLISH LEAVING ROOM
    socket.on('publish.leave_room', function (data) {
      console.log('user left room ', data.roomName);
      socket.leave(data.roomName);

      var clientsCount = getClientCount(data.roomName)

      io.sockets.in(data.roomName).emit('broadcast.leave_room', clientsCount)
    });
    
    // PUBLISH POST
    socket.on('publish.post', function (data) {
      console.log(data);
      var roomName = data.roomName.toLowerCase()
      var post = new Post({
          body: data.body
        , room_name: data.roomName.toLowerCase()
      });
      console.log(post);
      post.save(function (err, post) {
        console.log('post saved to room', post.room_name)
        if (err) { 
          return io.sockets.in(post.room_name).emit('error', post); 
        }
        io.sockets.in(post.room_name).emit('broadcast.post', post);
      });
    });

    // PUBLISH COMMENT
    socket.on('publish.comment', function (data) {
      console.log(data);
      Post.findById(data.post_id, function (err, post) {
        console.log(post);
        console.log(data.body)
        var comment = new Comment({ body: data.body });
        post.comments.unshift(comment);
        post.save(function (err, post) {
          if(err) { 
            console.log(err) 
            return io.sockets.in(post.room_name).emit('error', comment); 
          }
          return io.sockets.in(post.room_name).emit('broadcast.comment', post);
        })
      })
    });

    // VOTE UP
    socket.on('vote_up.post', function (data) {
      Post.findByIdAndUpdate(data.id, { $inc: { votes_count: 1 } } , function (err, post) {
        console.log(post)
        if (err) { 
          console.log(err);
          return io.sockets.in(post.room_name).emit('error', post); 
        }
        io.sockets.in(post.room_name).emit('broadcast.vote_up', post);
      });
    });

    socket.on('vote_down.post', function (data) {
      Post.findByIdAndUpdate(data.id, { $inc: { votes_count: -1 } } , function (err, post) {
        console.log(post)
        if (err) { 
          console.log(err);
          return io.sockets.in(post.room_name).emit('error', post); 
        }
        io.sockets.in(post.room_name).emit('broadcast.vote_down', post);
      });
    });
  });
}