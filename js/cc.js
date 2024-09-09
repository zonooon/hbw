//获取左右按钮
const left =document.querySelector(".btn_left");
const right =document.querySelector(".btn_right");
//获取图片列表
const  imgList =document.querySelector(".imgList");
const  firstLi =imgList.querySelector("li");
// 克隆节点以及子节点
const clonLi =firstLi.cloneNode(true);

//将第一张图片放最后一张下面
imgList.appendChild(clonLi)
//图片索引代表当前图片代表第几张
let index =0;
let lock =true
function right_btn(){
    if (!lock) return;
    index++;
    //计算平移距离
    let translate_right = -index *1920+"px";
    imgList.style.transform ="translateX("+ translate_right+")";
    imgList.style.transition = "0.5s ease";
    if (index===9){
        index =0;
        setTimeout(()=>{
          imgList.style.transition ="none";
          imgList.style.transform ="translateX("+index+")";
        },500)
    }
    setCircle()
    lock =false
    setTimeout(()=>{
        lock =true;
    },500)
}
//右边按钮点击效果
right.addEventListener("click",right_btn)
//左边点击效果
left.addEventListener("click",()=>{
    index--;
    if (index===-1){
        let translateValue_first =-9 * 1920 +"px";
        imgList.style.transition ="none";
        imgList.style.transform = "translateX(" + translateValue_first+")";
        index=8;
        setTimeout(()=>{
            imgList.style.transition ="0.5s ease";
            imgList.style.transform ="translateX("+(index * -1920 +"px")+")";
            setCircle(); // 更新小圆点状态
        })
    }else {
        let  translateValue_1 =index * -1962 +"px";
        imgList.style.transform ="translateX("+ translateValue_1 +")";
        setCircle(); // 更新小圆点状态
        }
})
//小圆点点的切换以及高亮
const  circles =document.querySelectorAll(".circle");

function  setCircle(){
    circles.forEach((item,i)=>{

        if (index===i){
            //因为索引与遍历出来的索引一样
            circles[i].classList.add("active")
        }else {
            circles[i].classList.remove("active")
        }
    })
}
setCircle()
const Circles_=document.querySelector("#circle-list")
Circles_.addEventListener("click",(e)=>{
    if (e.target.nodeName.toLowerCase()==="li"){
        const  n =Number(e.target.getAttribute("CircleNum"));
        index =n;
        imgList.style.transition ="0.5s ease";
        imgList.style.transform ="translateX(" + (index * -1920 +"px")+")";
        setCircle()
    }
})
let playId= setInterval(()=>{
    right_btn()
},3000)
const img_list =document.querySelector(".imgList");
// 鼠标进入
img_list.onmouseenter =()=>{
    clearInterval(playId)
}
//鼠标移除开启定时器
img_list.onmouseleave =()=>{
    // 清除旧的定时器
    clearInterval(playId);
    // 移出重新开启一个定时器
    playId =setInterval(right_btn,3000)
}
// 多次移入或者移除会图片切换速度会非常快
