var app = angular.module("app", ["checklist-model"])
.controller('mastercontroller', ['$scope', '$rootScope', function($scope, $rootScope) {

  $scope.colorKeys = [
    {text:'Informational', color:'#FFF380'},
    {text:'Draft', color:'#FFFFFF'},
    {text:'Approved', color:'#4AA02C'},
    {text:'Closed', color:'#736F6E'},
    {text:'Awaiting Approval', color:'#F88017'},
    {text:'RCW', color:'#E73131'},
    {text:'Change spanning multiple days', color:'#FFFFFF', content:'*', contentColor:'black'},
    {text:'Emergency Change', color:'#FFFFFF', content:'R', contentColor:'red'} 
  ];

  $scope.filterOptions = [
    {id:'BND', text:'Brand'},
    {id:'COM', text:'Commerce'},
    {id:'FND', text:'Foundation'},
    {id:'SPT', text:'Nike'},
    {id:'TOI', text:'Tech Ops Infrastructure'},
    {id:'TOT', text:'Tech Ops Tools'},
    {id:'NORMAL', text:'Normal'},
    {id:'EMERGENCY', text:'Emergency'},
    {id:'INFO', text:'Information'},
    {id:'ROUTINE', text:'Routine'},
    {id:'ABT', text:'AB Testing/TMS'},
    {id:'ROC', text:'Recurring Operational Changes'},
    {id:'RCW', text:'RCWs'},
    {id:'CLSD', text:'Closed'}
  ];

  $scope.user = {
    filterOptions: ['BND', 'CLSD']
  };

  $scope.checkAll = function() {
    console.log('1');
    $scope.user.filterOptions = $scope.filterOptions.map(function(item) { return item.id; });
  };

  $scope.uncheckAll = function() {
    console.log('2');
    $scope.user.filterOptions = [];
  };

  $scope.checkFirst = function() {
    console.log('3');
    $scope.user.filterOptions.splice(0, $scope.user.filterOptions.length); 
    $scope.user.filterOptions.push(1);
  };
}]);