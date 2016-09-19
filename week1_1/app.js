(function () {
  'use strict';
  angular.module ('LunchCheck', [])
  .controller('LunchCheckController',  LunchCheckController);
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchMessage= "";

    $scope.checkLunch = function () {
      $scope.lunchMessage= checkLunchSize ($scope.lunchItems, ',') ;
    };

    function checkLunchSize(items, separator) {
      var lunchList = $scope.lunchItems.split(',');
      var message ;
      var count = 0;

      lunchList.forEach(function (item) {
        if(item){
          count++;
        }
      });



      if(count < 1){
        message = "Please enter data first";
      }else if(count < 4){
        message = "Enjoy!";
      }else{
        message = "Too much!";
      }
      // $scope.lunchMessage = lunchList.length;
      console.log('lunchList'+lunchList.length + ":"+ lunchList.join('//'));
      console.log('count:'+count);
      return message;
    }
  }
})();
