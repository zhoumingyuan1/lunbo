require([''],function () {
    var imgs_div=document.getElementById("imgs");
    var nav_div=document.getElementById("nav");
    //获取到图片轮播的ul对象数组
    var imgsUl=imgs_div.getElementsByTagName("ul")[0];
    //获取到远点的ul对象数组
    var nav=nav_div.getElementsByTagName("ul")[0];
    //上一个
    var prious=document.getElementById("preous");
    //下一个
    var next =document.getElementById("next");
    prious.onclick=function(){
        //上一张，图片需要向右移动，（X轴正轴方向），所以加1280
        var offset=parseInt(imgsUl.offsetLeft)+1280;
        imgsUl.style.left=offset+"px";
   }
   next.onclick=function(){
        //下一张，图片像左移动，（X轴负轴方向），所以减1280
        var offset=parseInt(imgsUl.offsetLeft)-1280;
        imgsUl.style.left=offset+"px";
   }
   var index=1;//表示默认当前就是展示的第一张图片
   prious.onclick=function(){
        //上一张，图片需要向右移动，（X轴正轴方向），所以加1280
        var offset=parseInt(imgsUl.offsetLeft)+1280;
        imgsUl.style.left=offset+"px";
        //这里需要判断当前的下标是否小于1，小于了，则说明现在当前是第一张图片，再返回，就是要到第四张图片，让index=4，每次点击之后让index的值减1
        if(index<1){
             index=4;
        }
         index-=1; 
        btnShow(index);
    }
    next.onclick=function(){
        //下一张，图片像左移动，（X轴负轴方向），所以减1280
        var offset=parseInt(imgsUl.offsetLeft)-1280;
        imgsUl.style.left=offset+"px";
        //这里需要判断当前的下标是否大于4，大于了，则说明现在当前是第四张图片，再返下一张，就是要到第一张图片，让index=1，每次点击之后让index的值+1
        if(index>4){
             index=1;
        }
        index+=1;
        btnShow(index);            
   }
     function btnShow(cur_index){
        var list=nav.children;
        for(var i=0;i<nav.children.length;i++){
             nav.children[i].children[0].className="hidden";
        }
        nav.children[cur_index-1].children[0].className="current";
   }
   var animTimer;
               prious.onclick=function(){
               index-=1;
               if(index<1){
                    index=4;
               }
               animate(1280);
               btnShow(index);
          }
          next.onclick=function(){
               initImgs(index);
               index+=1;
               if(index>4){
                    index=1;
               }
               animate(-1280);
               btnShow(index);
          }
     
          function animate(offset){
               var newLeft=parseInt(imgsUl.offsetLeft)+offset;
               if(newLeft>-1280){
                    donghua(-5120);    
               }else if(newLeft<-5120){
                    donghua(-1280);    
               }else{
                    donghua(newLeft);
               }
 
          }
          function donghua(offset){
               clearInterval(animTimer);
               animTimer=setInterval(function(){
                    //动画原理： 盒子本身的位置 + 步长
                    imgsUl.style.left=imgsUl.offsetLeft+(offset-imgsUl.offsetLeft)/10 + "px";
                     //因为采用的动画原理计算方法，得到的值不可能精确到我们需要偏移的像素单位上，所以我这里判断，在还有20px的时候，就让动画停止。
                    if(imgsUl.offsetLeft-offset<10&&imgsUl.offsetLeft-offset>-10){
                         imgsUl.style.left=offset+"px";
                         clearInterval(animTimer);        
                    }
               },20);
          }
          var timer;
          function play(){
               timer=setInterval(function(){
                    next.onclick();
               },2000)
          }
          function initImgs(cur_index){
            clearInterval(timer);
            clearInterval(animTimer);
            var off=cur_index*1280;
            imgsUl.style.left=-off+"px";
       }
       for(var i=0;i<nav.children.length;i++){
        nav.children[i].index=i;
        var sd=nav.children[i].index;
        nav.children[i].onmouseover=function(){
             var now_index=this.index;
             //这里很重要，要让当前的图片的index的值等于鼠标选中的图片 
             index=this.index+1;
             initImgs(this.index+1);
             btnShow(this.index+1);
        }
        nav.children[i].onmouseout=function(){
             play();
        }
   }

})