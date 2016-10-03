(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('NarrowItDownService', NarrowItDownService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");



NarrowItDownController.$inject = ['NarrowItDownService'];
function NarrowItDownController(NarrowItDownService) {
  var nidCtrl = this;
  var menuItems;
  nidCtrl.requiredMenuItems = [];
  // nidCtrl.formSubmit = false;

  nidCtrl.showItems = function() {
    // nidCtrl.formSubmit = true;
    console.log('search term', nidCtrl.searchItem);
    if(!!nidCtrl.searchItem ){
      nidCtrl.getDesiredItems(nidCtrl.searchItem);
    }
  }

  nidCtrl.clearMenuItems = function () {
    nidCtrl.requiredMenuItems = [];
  }

  nidCtrl.removeItem = function (index) {
    nidCtrl.requiredMenuItems.splice(index, 1);
  }

  nidCtrl.getDesiredItems = function (searchItem) {
    // var  = 'chicken';
    var promise = NarrowItDownService.getMenuItems();

    promise.then(function (response) {
      // console.log(response.data.menu_items);
      menuItems = response.data.menu_items;
      // console.log('length', menuItems.length);
      // console.log('first', menuItems[0]);
      nidCtrl.requiredMenuItems = nidCtrl.searchMenuItems(menuItems, searchItem);
      console.log('requiredMenuItems', nidCtrl.requiredMenuItems);
    })
    .catch(function (error) {
      console.log(error);
    })

  }

  nidCtrl.searchMenuItems = function (menuItems, searchTerm){
    var requiredMenuItems = [];
    for (var i = 0; i < menuItems.length; i++) {
      var found = nidCtrl.isMenuItemRequiredForSearch(menuItems[i], searchTerm);
      // console.log('found', found);
      if(found >= 0){
        // console.log('adding into requiredMenuItems');
        requiredMenuItems.push(menuItems[i]);
      }else{
        // console.log('missing not found');
      }
    }
    return requiredMenuItems;
  }

  nidCtrl.isMenuItemRequiredForSearch = function (menuItem, searchTerm){
    return menuItem.description.search(searchTerm);
  }
}

NarrowItDownService.$inject = ['$http', 'ApiBasePath']
function NarrowItDownService($http, ApiBasePath) {
  var service = this;
  var menuItems = null;

  service.getMenuItems = function() {

    console.log('menuItems from cache', menuItems);
    if(menuItems === undefined || menuItems == null){
      menuItems = service.getMenuItemsFromServer();
    }

    return menuItems;
  }

  service.getMenuItemsFromServer = function () {
    console.log('getting items from server');
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };
}

})();
