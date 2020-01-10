var app = angular.module('Stocks', [])
.controller('StocksCTRL', function($scope, $http, $filter) {
    $scope.resData = [];
    $scope.viewChanger = {'update': false};
    $http({
        method: 'GET',
        url: 'http://127.0.0.1:8000/stocks/',
        headers: {"Content-Type": "application/json"},
    }).then(res => $scope.resData = res.data
        , function error(res){
        console.log(res)
    });

    $scope.sendData = {};
    $scope.upperCaser = function(){
        $scope.sendData.ticker = $filter('uppercase')($scope.sendData.ticker);
    }
    $scope.Add = function(){
        
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8000/stocks/',
            headers: {"Content-Type": "application/json"},
            data: $scope.sendData,
        }).then(res => {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/stocks/',
                headers: {"Content-Type": "application/json"},
            }).then(res => {
                $scope.resData = res.data;
                $scope.sendData = {};
            }
                , function error(res){
                console.log(res)
            });
        }
            , function error(res){
            console.log(res)
        });
    }

    $scope.delete = function(id){
        $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:8000/stocks/'+ id + '/',
            headers: {"Content-Type": "application/json"},
            data: id,
        }).then(res => {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/stocks/',
                headers: {"Content-Type": "application/json"},
            }).then(res => $scope.resData = res.data
                , function error(res){
                console.log(res)
            });
        }
            , function error(res){
            console.log(res)
        });
    }

    $scope.updateStart = function(id){
        $http({
            method: 'GET',
            url: 'http://127.0.0.1:8000/stocks/' + id + '/',
            headers: {"Content-Type": "application/json"},
        }).then(res => {
            $scope.sendData = res.data;
            $scope.viewChanger.update = true;
        }
            , function error(res){
            console.log(res)
        });
    };

    $scope.UpdateFinal = function(){
        $http({
            method: 'PUT',
            url: 'http://127.0.0.1:8000/stocks/'+ $scope.sendData.id + '/',
            headers: {"Content-Type": "application/json"},
            data: $scope.sendData,
        }).then(res => {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1:8000/stocks/',
                headers: {"Content-Type": "application/json"},
            }).then(res => {
                $scope.resData = res.data;
                $scope.sendData = {};
                $scope.viewChanger.update = false;
            }
                , function error(res){
                console.log(res)
            });
        }
            , function error(res){
            console.log(res)
        });
    }
});

