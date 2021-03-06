var app = angular.module("app", ["checklist-model"]);

function controller($scope, $rootScope) {
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
    $scope.user.filterOptions = $scope.filterOptions.map(function(item) { return item.id; });
  };
  $scope.uncheckAll = function() {
    $scope.user.filterOptions = [];
  };
  $scope.checkFirst = function() {
    $scope.user.filterOptions.splice(0, $scope.user.filterOptions.length); 
    $scope.user.filterOptions.push(1);
  };
}