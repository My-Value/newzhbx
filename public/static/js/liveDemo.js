var syudentname=document.getElementById('syudentname');
var classroom=document.getElementById('classroom');


var myVideo1=document.getElementById('myVideo1');
var myVideo2=document.getElementById('myVideo2');
var myVideo3=document.getElementById('myVideo3');

console.log(myVideo3);
function gradeChange() {
    var myselect = document.getElementById("pid");
    var index=myselect.selectedIndex; 
    // selectedIndex代表的是你所选中项的index
    var value = myselect.options[index].value;
     $.ajax({
            type: "POST",
            dataType: "json",
            url: "changeStudent",
            data: {
                stuNum:value
            },
            success: function (msg) {
                console.log(msg);
                console.log(msg.classVideo);
                syudentname.innerHTML=msg.name;
                classroom.innerHTML=msg.className;
                myVideo1.setAttribute("src",msg.classVideo);
                myVideo2.setAttribute("src",msg.gateVideo);
                myVideo3.setAttribute("src",msg.playgroundVideo);
                // myVideo1.innerHTML=msg.classVideo;
                // myVideo2.innerHTML=msg.gateVideo;
                // myVideo3.innerHTML=msg.playgroundVideo;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    console.log(value);
}