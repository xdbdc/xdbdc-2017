
var cnt=0;
$(".small_right").click(function(){
	if(cnt==0){
		$(".small_nav").css('height','20em');
		$(".small_nav").css('opacity','1');
		$("header").css("opacity",'0.8');
		cnt=1;
	}
	else{
		$(".small_nav").css('height','0');
		$(".small_nav").css('opacity','0.3');
		$("header").css("opacity",'0.3');
		cnt=0;
	}
})

var target = [$('.l_index'),$('.l_about'),$('.l_contact'),$('.l_join')];
for(var i=0; i<target.length ;i++){
	target[i].bind('click',function(){
		$('html body').animate({
			scrollTop:$($(this).attr('href')).offset().top
		},500);
		return false;
	})
}
var sign = 1;
var wordsList = ["The unexamined life is not worth living","Genius only means hard-working all one's life","Cease to struggle and you cease to live"];
function showWords(index){
	$('#words').html(wordsList[index]); 
	$("#words").css('opacity','1');
	var lis = document.getElementById('focusBox').getElementsByTagName('li');
	for (var i=0;i<lis.length;i++){
		lis[i].className = "cur";
	}
	lis[index].className = "cur1";
}
function setPic(){
	$('#words').css('opacity','0');
	setTimeout("showWords(sign%3)",500);
	sign++;
}
window.setInterval("setPic()",5000);

if ($(window).width()>900) {
	$(".left").mouseenter(function(){
		$(".left_cover").fadeIn(500).mouseleave(function(){
			$(".left_cover").fadeOut(500);
		})
	})
	$(".right").mouseenter(function(){
		$(".right_cover").fadeIn(500).mouseleave(function(){
			$(".right_cover").fadeOut(500);
		})
	})
}

$("#sub").click(function(){
	var name = $("#name").val();
	var tel = $("#tel").val();
	var email = $("#email").val();
	var choose = $("#choose").val();
	var about = $("#aboutYou").val();
	if(checkName(name) && checkTel(tel) && checkEmail(email) && checkAbout(about)){
		$.post("https://119.29.249.88:3001/reg",
		{
			name : name,
			tel : tel,
			email : email,
			choose : choose,
			about : about
		},
		function(data,status){
			if(data == "1"){
				$(".box").fadeIn(300);
				$(".box").delay(2500).fadeOut(300);
				console.log("Status: " + status);
			}else{
				$(".errbox").fadeIn(300);
				$(".errbox").delay(2500).fadeOut(300);
				console.log("Status: " + status);
			}
			
		}).error(function(){
				$(".errbox").fadeIn(300);
				$(".errbox").delay(2500).fadeOut(300);
				console.log("Status: " + status);
		});
	}
		
});
function checkName(name){
	if(!(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/.test(name))){
		alert("姓名输入有误,请重填");
		return false;
	}else{
		return true;
	}
}
function checkTel(tel){
	if(!(/^1[34578]\d{9}$/.test(tel))){ 
        alert("手机号码输入有误，请重填");  
        return false; 
    }else{
    	return true;
    } 
}

function checkEmail(email){
	if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))){
		alert("邮箱输入有误，请重填");
		return false;
	}else{
		return true;
	}
}

function checkAbout(about){
	if((/[\$]/.test(about))){
		alert("$为非法字符，请重填");
		return false;
	}else{
		return true;
	}
}



