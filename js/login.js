//@author: Ashok Erva
//@date: November 01, 2015
var loginFlag=true;

function setLocalStorage(){
  if (typeof(Storage) !== "undefined") {
    var data={"admin":[{"name":"admin01","pwd":"admin@001"}],"users":[{"name":"jack"},{"name":"john"},{"name":"joe"}],"groups":[{"name":"Software Development"},{"name":"Testing"},{"name":"Designing"}]};
    localStorage.setItem('info', JSON.stringify(data));
    return true;
  } else {return false;}
}

function Authenticate(){
  if(setLocalStorage())
  {
    var username=document.forms["login"]["admin"].value;
    var pswd=document.forms["login"]["pwd"].value;
    var getInfo=JSON.parse(localStorage.getItem('info'));
    var adminInfo=getInfo.admin[0];
    if(username==adminInfo.name && pswd==adminInfo.pwd)
    {sessionStorage.loginFlag=true;return true;}
    else{document.getElementById("errorMsg").innerHTML="Invalid admin id and password!";return false;}
  }
}
function loadAdmin(){
  if(sessionStorage.loginFlag){
      var table='<table><tr><td style="align:left;">Admin</td><td></td><td style="align:right;"><button type="button" onclick="Logout()" id="button">Logout</button></td></tr></table>';
      document.getElementById("adminName").innerHTML = table//"Admin";
  }else{
    window.location = "login.html";
  }
}

function Logout(){
  if(sessionStorage.loginFlag){
    sessionStorage.loginFlag=false;
    window.location="login.html";
  }else{
    window.location="login.html";
  }
}

function getUsers() {
  var infoUsr = JSON.parse(localStorage.getItem('info'));
  var table = document.getElementById("addUsers");
  for(i=0;i<infoUsr.users.length;++i){
    if(infoUsr.users[i].name!=null){
      var row = table.insertRow(i+1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      cell1.innerHTML = i+1;
      cell2.innerHTML = infoUsr.users[i].name;
      cell3.innerHTML = '<a href=""  onclick="deleteUser(\'' + infoUsr.users[i].name + '\')"><img src="./images/del.png" style="width:20px;"></a>';
    }
  }
}
function getGroups() {
// /  var users = '{"users":[{"name":"jack"},{"name":"john"},{"name":"joe"}]}';
  var infoGrp = JSON.parse(localStorage.getItem('info'));
  var table = document.getElementById("addGroups");
  for(i=0;i<infoGrp.groups.length;++i){
    var row = table.insertRow(i+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i+1;
    cell2.innerHTML = infoGrp.groups[i].name;
    cell3.innerHTML = '<a href=""  onclick="deleteGroup(\'' + infoGrp.groups[i].name + '\')"><img src="./images/del.png" style="width:20px;"></a>';
  }
}

function initAdmin(){
    loadAdmin();
    getUsers();
    getGroups();
    displayAssignedUsers();
}

function addUser(){
    var newUser = prompt("Please enter a name", "");
    if(newUser!=null){

      var userFlag=false;
      var info = JSON.parse(localStorage.getItem('info'));
      for(i=0;i<info.users.length;++i){
        if(info.users[i].name==newUser)
        {
          userFlag=true;
        }
      }if(!userFlag){
        info.users[info.users.length]={"name":newUser};
        localStorage.setItem('info', JSON.stringify(info));
        location.reload();
      }
    }
}
function addGroup(){
  var newGroup = prompt("Please enter a group name", "");
  if(newGroup!=null){
    var grpFlag=false;
    var info = JSON.parse(localStorage.getItem('info'));
    for(i=0;i<info.groups.length;++i){
      if(info.groups[i].name==newGroup)
      {
        grpFlag=true;
      }
    }if(!grpFlag){
      info.groups[info.groups.length]={"name":newGroup};
      localStorage.setItem('info', JSON.stringify(info));
      location.reload();
    }

  }
}

function deleteUser(userName){
  var info=JSON.parse(localStorage.getItem('info'));
  for(i=0;i<info.users.length;++i){
    if(info.users[i].name==userName){
      info.users.splice(i,1);
      //delete info.users[i]['name'];
      localStorage.setItem('info', JSON.stringify(info));
      location.reload();
      break;
    }
  }
}

function deleteGroup(grpName){
  var grpFlag=false;
  var info=JSON.parse(localStorage.getItem('info'));
  for(i=0;i<info.users.length;++i){
    if(info.users[i].group==grpName){
      alert("Please unassign the users for the selected group: "+grpName);
      grpFlag=true;
    }
  }
  if(!grpFlag){
    for(i=0;i<info.groups.length;++i){
      if(info.groups[i].name==grpName){
        info.groups.splice(i,1);
        localStorage.setItem('info', JSON.stringify(info));
        location.reload();
        break
      }
    }
  }
}

function assignUser(){
  var User = prompt("Please enter a user name", "");
  var Group = prompt("Please enter a group name to assign", "")
  if (User!=null && Group!=null){
    var info=JSON.parse(localStorage.getItem('info'));
    for(i=0;i<info.users.length;++i){
      if(info.users[i].name==User){
        for(j=0;j<info.groups.length;++j){
          if(info.groups[j].name==Group){
            info.users[i]["group"]=Group;
            //            alert(info.users[i].group+info.users[i].name);
            localStorage.setItem('info', JSON.stringify(info));
            location.reload();
          }
        }
      }
    }
  }
}

function unassignUser(){
  var User = prompt("Please enter a user name", "");
  var Group = prompt("Please enter a group name to assign", "")
  if (User!=null && Group!=null){
    var info=JSON.parse(localStorage.getItem('info'));
    for(i=0;i<info.users.length;++i){
      if(info.users[i].name==User && info.users[i].group==Group){
        for(j=0;j<info.groups.length;++j){
          if(info.groups[j].name==Group){
            delete info.users[i]['group'];
            localStorage.setItem('info', JSON.stringify(info));
            location.reload();
            break;
          }
        }
      }
    }
  }
}

function displayAssignedUsers(){
  var infoFlag=false;
  var info = JSON.parse(localStorage.getItem('info'));
  var table = document.getElementById("userGroup");
  for(i=0,j=0;i<info.users.length;++i){
    if(info.users[i].group!=undefined){
          var row = table.insertRow(j+1);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = j+1;j=j+1;
          cell2.innerHTML = info.users[i].group;
          cell3.innerHTML = info.users[i].name
          infoFlag=true;
      }
  }
  if(!infoFlag){
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "";
    cell2.innerHTML = "no groups";
    cell3.innerHTML = "no users assigned";
  }
}
