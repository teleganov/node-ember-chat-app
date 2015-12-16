angular.module('chat').controller('MainController', function ($scope, socket) {
  $scope.messages = [];
  $scope.newMessage = "";
  $scope.showError = false;
  $scope.errorMsg = "";
  $scope.userId = guidGenerator();

  $scope.sendMessage = function() {
    if($scope.newMessage.length > 0) {
      socket.emit('chat', {message: $scope.newMessage, id: $scope.userId});
      $scope.newMessage = "";
    } else {
      $scope.showError = true;
      $scope.errorMsg = "Can't send empty message"
    }
  };

  socket.on('chat', function(msg){
    $scope.messages.push({message: msg['message'], id: msg['id']});
  });
});

function guidGenerator() {
  var S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}