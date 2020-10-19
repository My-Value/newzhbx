var yzmcode=null;
// flag是发送验证码的标识，为true才会发送
var flag = false;
// pn指的就是手机号的input
var pn = document.getElementById("phone-number");
// username值学籍号的input
var username = document.getElementById("username");
// parentn值家长的input
var parentn = document.getElementById("parentname");
// console.log(mobile_code);
var sendphone=''
var chackNum='';
// check()为form表单进行校验，学籍号和手机号没有输入时不可以进行提交的
function check() {
    // username,usernameMsg 为学生学籍号的input的值
    var username = document.getElementById("username");
    var usernameMsg = document.getElementById("usernameMsg");
    // parentn,parentnameMsg 为家长姓名的input的值
    var parentn = document.getElementById("parentname").value;
    var parentnameMsg = document.getElementById("parentnameMsg");
    // pn,pnumberMsg 为手机号的input的值
    var pn = document.getElementById("phone-number").value;
    var pnumberMsg = document.getElementById("pnumberMsg");
    // mobile_code,codeMsg 为验证码的input的值
    var mobile_code = document.getElementById("mobile_code").value.length;
    var codeMsg = document.getElementById("codeMsg");

    var mobilevalue=document.getElementById("mobile_code").value

    // 全局变量，如果isPass为false就不能点击确定，进行绑定学生
    var isPass = true;
    // 复选框，用户协议
    var checkbox=document.getElementById("checkbox").checked;
    // console.log(checkbox);
    // 校验学籍号
    var length = username.value.length;
    var returnMsg = document.getElementById("returnMsg");

    (function () {
        // 校验学籍号
        if (length != 19) {
            usernameMsg.innerText = "学籍号长度必须是19位";
            isPass = false;
        } else {
            usernameMsg.innerText = "";
        }
        console.log(isPass);
        // 校验姓名
        if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(parentn))) {
            parentnameMsg.innerText = "姓名格式错误";
            isPass = false;
        } else {
            pnumberMsg.innerText = "";
        }
        console.log(isPass);
        // 校验手机号
        if (pn.length != 0) {
            var strarr = sendphone.split(",");
            console.log("这是校验获取的手机号" + strarr);
            var i = strarr.indexOf(pn);
            if(i == -1){
                isPass = false;
            }
            // for (let i = 0; i < strarr.length; i++) {
            //     if (pn != strarr[i]) {
            //         pnumberMsg.innerText = "请输入有效手机号";
            //         isPass = false;
            //     } else {
            //
            //         pnumberMsg.innerText = "";
            //         break;
            //     }
            // }
        }else{
            pnumberMsg.innerText = "请输入手机号";
        }
        console.log(isPass);
        console.log(mobile_code);

        // 提交输入的数据(验证码状态trueAndfalse)
        if (isPass && mobile_code == 6) {
            console.log("发送输入的信息"+username.value + parentn + pn + mobilevalue);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "addBinding",
                data: {
                    stu_num:username.value,
                    parentname:parentn,
                    phone:pn,
                    code:mobilevalue
                },
                success: function (msg) {
                    if(msg){
                        console.log(msg);
                        yzmcode=msg.status;
                        // returnMsg.innerHTML=msg.msg;
                        alert(msg.msg);

                        if(msg.status){

                            codeMsg.innerText = "";
                            window.location.href="student";
                        }
                    }


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });
        }
        // console.log(yzmcode);
        if (yzmcode) {
            codeMsg.innerText = "";
        } else {
            // codeMsg.innerText = "验证码错误";
            isPass = false;
        }
        if (mobile_code != 6) {
            codeMsg.innerText = "验证码位数错误";
            isPass = false;
        }

        if (checkbox != true) {
            alert('请先阅读并同意《用户协议》');
            isPass = false;
        }
    })();
    // if (length != 19) {
    //     usernameMsg.innerText = "学籍号长度必须是19位";
    //     isPass = false;
    // } else {
    //     usernameMsg.innerText = "";
    // }
    //
    // if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(parentn))) {
    //     parentnameMsg.innerText = "姓名格式错误";
    //     isPass = false;
    // } else {
    //     pnumberMsg.innerText = "";
    // }
    //
    // // 校验手机号
    // if (!(/^1(3|4|5|7|8)\d{9}$/.test(pn))) {
    //     pnumberMsg.innerText = "请输入有效手机号";
    //     isPass = false;
    // } else {
    //     pnumberMsg.innerText = "";
    // }
    //
    //
    // if (!yzmcode){
    //     codeMsg.innerText = "验证码错误";
    //     isPass = false;
    // } else {
    //     codeMsg.innerText = "";
    // }
    // if (checkbox!=true) {
    //     alert('请先阅读并同意《用户协议》');
    //     isPass = false;
    // }
    return isPass;
}
// 当学籍号的input失去焦点是会触发该函数，进行学籍号的校验
function checkUserName(uesrname) {
    var usernameMsg = document.getElementById("usernameMsg");
    var length = username.value.length;
    if (length != 19) {
        usernameMsg.innerText = "学籍号长度必须是19位";
    } else {
        usernameMsg.innerText = "";
        sendphone='';
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "checkStudent",
            data: {
                studentn: username.value
            },
            success: function (msg) {
                if(msg){
                    sendphone=msg['phone'];
                    console.log(sendphone);
                }else{
                    alert('学籍号错误');
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }
}

// 当姓名的input失去焦点是会触发该函数，进行姓名的校验
function isName(parentname) {
    var parentnameMsg = document.getElementById("parentnameMsg");
    var pname = parentn.value;
    console.log(pname);
    if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(pname))) {
        parentnameMsg.innerText = "姓名格式错误";
    } else {
        parentnameMsg.innerText = "";
        // $.ajax({
        //     type: "POST",
        //     dataType: "json",
        //     url: "data.php",
        //     data: {
        //         parentname: parentn.value
        //     },
        //     success: function (msg) {
        //         console.log(msg);
        //     },
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         console.log(XMLHttpRequest.status);
        //         console.log(XMLHttpRequest.readyState);
        //         console.log(textStatus);
        //     }
        // });
    }
}
// 当手机号的input失去焦点是会触发该函数，进行手机号的校验
function Phonenumber(phones) {
    var pnumberMsg = document.getElementById('pnumberMsg');
    // var length = phones.value.length;
   var strArr = sendphone.split(",");

    var phone = phones.value;
    if(phone ==''){
        pnumberMsg.innerText = "请输入手机号";
    }else {
        var i = strArr.indexOf(phone);
        if (i == -1 && phone != '') {
            pnumberMsg.innerText = "学籍号与手机号不匹配";
            // return false;
        } else {
            pnumberMsg.innerText = "";
            if (pn.value.length != 0) {
                flag = true;
            }
        }
    }

    // console.log(phone);
    // var i = strArr.indexOf(phone);
    // // for (let i = 0; i<strArr.length; i++) {
    // // if (phone!=strArr[i]) {
    // if (i == -1&&phone != '') {
    //     pnumberMsg.innerText = "请输入有效手机号";
    //     // return false;
    // } else {
    //     pnumberMsg.innerText = "";
    //     // $.ajax({
    //     //     type: "POST",
    //     //     dataType: "json",
    //     //     url: "data.php",
    //     //     data: {
    //     //         sjh: pn.value
    //     //     },
    //     //     success: function (msg) {
    //     //         console.log(msg);
    //     //     },
    //     //     error: function (XMLHttpRequest, textStatus, errorThrown) {
    //     //         console.log(XMLHttpRequest.status);
    //     //         console.log(XMLHttpRequest.readyState);
    //     //         console.log(textStatus);
    //     //     }
    //     // });
    //
    //     if (pn.value.length != 0) {
    //         flag = true;
    //     }
    //     // break;
    // }
    // }
}

// 发送验证码的值
// function yzmNumber(yzmn){
//     var mobile_code = document.getElementById("mobile_code").value.length;
//     var codeMsg = document.getElementById("codeMsg");
//     var mobilevalue=document.getElementById("mobile_code").value
//     console.log(mobilevalue);
//     var length=mobile_code
//     if (length != 6) {
//         codeMsg.innerText = "验证码位数错误";
//     } else {
//         codeMsg.innerText = "";
//         $.ajax({
//             type: "POST",
//             dataType: "json",
//             url: "checkCode",
//             data: {
//                 code:mobilevalue
//             },
//             success: function (msg) {
//                 console.log(msg);
//                 yzmcode = msg.status;
//             },
//             error: function (XMLHttpRequest, textStatus, errorThrown) {
//                 console.log(XMLHttpRequest.status);
//                 console.log(XMLHttpRequest.readyState);
//                 console.log(textStatus);
//             }
//         });
//     }
// }
// 以下是发送验证码的功能
var counts = 60;
var btn = document.getElementById("btn")
var pnlength = document.getElementById("phone-number").value.length;
var usernameMsg = document.getElementById("usernameMsg");

function settime() {
    var strArr = sendphone.split(",");
    var i = strArr.indexOf(pn.value);

    chackParStu();
    console.log(chackNum);
    if(chackNum == 999){
        alert("已绑定该学生！");
        return false;
    }
    if(chackNum<3){

    }else{
        alert("绑定学生已超过上限！");
        return false;
    }

    if(i != -1) {
        messcode = '';
        if (counts == 60 && flag) {
            // console.log(val);
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "sendCode",
                data: {
                    phone: pn.value
                },
                success: function (msg) {
                    messcode = msg['code'];
                    console.log(messcode);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest.status);
                    console.log(XMLHttpRequest.readyState);
                    console.log(textStatus);
                }
            });
        }
        jsq();
    }
}

function jsq(){
    if (flag == true) {
        // console.log(pn.value);
        if (counts == 0) {
            btn.style.backgroundColor = "#3FD1AD"
            btn.removeAttribute("disabled");
            btn.value = "发送验证码";
            counts = 60;

            return false;
        } else {
            btn.style.backgroundColor = "#E5E5E5"
            //发送验证码的字体变为黑色
            btn.style.color="black";
            btn.setAttribute("disabled", true);
            btn.value = "重新发送(" + counts + ")";
            counts--;
        }
        setTimeout(function () {
            jsq();
        }, 1000);
        // console.log(val);
    } else if (pnlength == 0) {
        pnumberMsg.innerText = "请输入手机号";
    } else{
        alert('请输入正确的手机号');
    }
}

function chackParStu() {
    var messcode;
    console.log(username.value);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajaxChackParStu",
        async: false,
        data: {
            studentn: username.value
        },
        success: function (msg) {
            console.log(msg);
            chackNum = msg['res'];
            console.log(chackNum);
            // console.log(messcode);
            return chackNum;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.status);
            console.log(XMLHttpRequest.readyState);
            console.log(textStatus);
        }

    });

}