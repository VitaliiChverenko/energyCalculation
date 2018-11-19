
// angular.module('energyСalculation', ['firebase', 'ngRoute'])
angular.module('energyСalculation').controller('electricityController', function($scope, $firebaseArray, $firebaseAuth, $route, $window, $location, Auth){

    Auth.$onAuthStateChanged(function(user) {
        $scope.firebaseUser = user;
  
        const userReference = firebase.database().ref(`users/${user.uid}`);
        userReference.on('value', snapshot => {
            $scope.curUser = snapshot.val()
        });
    });

    $scope.addConsumption = function() {
        const dbref = firebase.database().ref('users/' +  $scope.firebaseUser.uid + '/energy')
        $scope.consumption.costs = $scope.consumption.uah * $scope.consumption.kVatt;
        if(!$scope.curUser.energy){
            $scope.curUser.energy = []
        }
        $scope.curUser.energy.push($scope.consumption);
        dbref.set(
            $scope.curUser.energy
        );
        document.getElementById('addItem').style.display = 'none'
        document.getElementById('addItemToTable').style.display = 'block'
    }
    
    $scope.buildDiagram = () => {
        $scope.departments = [];
        $scope.data = [];

        function splitDate(date) {
            parseDateTo = date.split('/');
            return new Date(parseDateTo[2], parseDateTo[1], parseDateTo[0])
        }   

        if($scope.searchPeriodFrom && $scope.searchPeriodTo){
            $scope.filteredEnergy = $scope.curUser.energy.filter((el) => {
                return splitDate(el.periodFrom) >= splitDate($scope.searchPeriodFrom) && splitDate(el.periodTo) <= splitDate($scope.searchPeriodTo)
            })
        }
        else{
            $scope.filteredEnergy = $scope.curUser.energy
        }

        if($scope.minConsumption && $scope.maxConsumption){
            $scope.filteredEnergy = $scope.filteredEnergy.filter((el) => {
                return el.costs >= $scope.minConsumption && el.costs <= $scope.maxConsumption
            })
        }
        $scope.filteredEnergy.forEach(element => {
            $scope.departments.push(element.department)
        });

        $scope.filteredEnergy.forEach(element => {
            $scope.data.push(element.costs)
        });
        document.getElementsByClassName('diagram')[0].style.display = 'block';
    }

    $scope.showFieldsToAdd = () => {
        document.getElementById('addItem').style.display = 'block'
        document.getElementById('addItemToTable').style.display = 'none'
    }
})