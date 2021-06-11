const list = document.querySelector(".sortable_gallery");

Sortable.create(list, {
  animation: 150,
  chosenClass: "chosen",
  //ghostClass: "ghost",
  dragClass: "drag",
  group: {
    name: "adver-img",
    put: true
  },
  //filter:".text",
  draggable: ".sortable_item",
  onEnd: (e) => {
    // console.log("onEnd", e);
  },
  onAdd: function (e) {
    // same properties as onEnd
    //console.log("onAdd", e);
  },
  onRemove: function (e) {
    // same properties as onEnd
    //console.log("onRemove", e);
  },
  store: {
    get: (sortable) => {
      const nameGroup = sortable.options.group.name;
      const order = localStorage.getItem(nameGroup);
      // console.log("get", nameGroup, sortable, order);
      return order ? order.split("|") : [];
    },
    set: (sortable) => {
      const order = sortable.toArray();
      const nameGroup = sortable.options.group.name;
      localStorage.setItem(nameGroup, order.join("|"));
      // console.log("set", nameGroup, sortable, order);
    }
  }
});