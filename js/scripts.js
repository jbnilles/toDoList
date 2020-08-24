function ListItem(task) {
  this.task = task;
  this.isCompleted = false;
}
ListItem.prototype.done = function () {
  if (this.isCompleted) {
    this.isCompleted = false;
  } else {
    this.isCompleted = true;
  }
}
function CheckList() {
 this.items = [];
}
CheckList.prototype.addItem = function (item) {
  this.items.push(item);
}
CheckList.prototype.deleteItem = function(task) {
  for (let i=0; i<this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].task == task) {
        delete this.items[i];
        return true;
      }
    }
  };
  return false;
}
CheckList.prototype.deleteCheckedItems = function() {
  for (let i=0; i<this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].isCompleted) {
        delete this.items[i];
      }
    }
  };
  return true;
}
CheckList.prototype.findItem = function(task) {
  for (let i=0; i<this.items.length; i++) {
    if (this.items[i]) {
      if (this.items[i].task == task) {
        return this.items[i];
      }
    }
  };
  return false;
}

let checkList = new CheckList();

//User logic//
$(document).ready(function () {
  $("form#checklist").submit(function(event) {
    event.preventDefault();
    let newItem = new ListItem($("#listItem").val());
    checkList.addItem(newItem);
    $("#list").append("<li>" + newItem.task + "</li>");
    
  });

  $('#list').on('click','li', function() {
    let finishedItem =  checkList.findItem($(this).text());
    finishedItem.done();
    $('#list').text('');
    checkList.items.forEach(element => {
      if(element.isCompleted){
        $('#list').append('<li><del>' + element.task + '</del></li>');
      } else {
        $('#list').append('<li>' + element.task + '</li>');
      }
    });
  });

  $("#removeButton").click(function() {
    checkList.deleteCheckedItems();
    $('#list').text('');
    checkList.items.forEach(element => {
      if (element){
        $('#list').append('<li>' + element.task + '</li>');
      }
    });
  });
});



