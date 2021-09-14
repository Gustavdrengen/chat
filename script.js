gun = Gun()


objSize = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

userName = prompt("Username")
if(!userName) {
  close()
}


$("#chat").animate({ scrollTop: $("#chat")[0].scrollHeight}, 1000);

gun.get("chat").map().once(function(data, key) {
  if (key != "index") {
    $("#chat").append(`<div class="messageDiv"><nobr><p class="messageSender">`+data.sender+`</p>
    <p class="messageText">`+data.message+`</p></nobr></div><br>`)
  }
})

function send(message) {

  gun.get("chat").get("index").once(function(index) {
    if(index == undefined) {
     index = 0
    }
    gun.get(index).put({"message":message, "sender":userName})
    gun.get("chat").set(gun.get(index))
    gun.get("chat").get("index").put(index+1)
  })
  
  //len = objSize(gun.get("chat")["_"].next
  //if (len >= 20) {
  //  gun.unset()
  //}
}

$( "#send" ).submit(function() {
  event.preventDefault();
  
  send($(".msg").val());
  $("#chat").animate({ scrollTop: $("#chat")[0].scrollHeight}, 1000);
  $(".msg").val("");
});