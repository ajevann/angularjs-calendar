var app = angular.module("app", []);

function controller($scope, $rootScope) {

  $scope.filterOptions = [
    {text:'Informational', color:'#FFF380'},
    {text:'Draft', color:'#FFFFFF'},
    {text:'Approved', color:'#4AA02C'},
    {text:'Closed', color:'#736F6E'},
    {text:'Awaiting Approval', color:'#F88017'},
    {text:'RCW', color:'#E73131'},
    {text:'Change spanning multiple days', color:'#FFFFFF', content:'*', contentColor:'black'},
    {text:'Emergency Change', color:'#FFFFFF', content:'R', contentColor:'red'} 
  ];
}