(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListService', ShoppingListServiceProvider)
  ;

  ToBuyController.$inject = ['ShoppingListService'];
  function ToBuyController(ShoppingListService) {
    var BuyCtrl = this;
    BuyCtrl.itemsToBuy = ShoppingListService.getItemsToBuy();

    BuyCtrl.buyItem = function (itemIndex) {
      ShoppingListService.buyItem(itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListService'];
  function AlreadyBoughtController(ShoppingListService) {
    var BoughtCtrl = this;

    BoughtCtrl.boughtItems = ShoppingListService.getBoughtItems();
  }

  function ShoppingListService(maxItemsInList) {
    var service = this;

    var itemsToBuy = maxItemsInList;
    var boughtItems = [];

    service.getItemsToBuy = function () {
      // console.log('itemsToBuy', itemsToBuy);
      return itemsToBuy;
    };

    service.buyItem = function (itemIndex) {
      console.log('itemIndex', itemIndex);
      // var boughtItem = itemsToBuy[itemIndex];
      var boughtItem = itemsToBuy.splice(itemIndex,1);
      boughtItems.push(boughtItem[0]);
    };

    service.getBoughtItems = function () {
      // console.log('boughtItems', boughtItems);
      return boughtItems;
    };

  }

  function ShoppingListServiceProvider() {
    var provider = this;

    var defaultItems = [
      { name:'bananas', quantity:12},
      { name:'mangos', quantity:10},
      { name:'books', quantity:14},
      { name:'sticky notes', quantity:5},
      { name:'pens', quantity:20}
    ];

    provider.shoppingListItems = defaultItems;

    provider.$get = function () {
      var shoppingList = new ShoppingListService(provider.shoppingListItems);
      return shoppingList;
    };
  }




})();
