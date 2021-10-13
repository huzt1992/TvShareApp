

const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth;



//************* PARRALLEXMOVE *******************/

const texts = document.querySelector('.parallexMove .text')
const remoteController = document.querySelector('.parallexMove .remote-controller')
const remoteControllerImg1 = document.querySelector('.parallexMove .remote-controller .img')
const remoteControllerImg2 = document.querySelector('.parallexMove .remote-controller .img-2')

window.addEventListener('DOMContentLoaded',function(){
    texts.style.opacity=1;
    texts.style.paddingTop=200+"px"
    remoteController.style.opacity=1;
    // remoteController.style.marginTop=-40+"px"
})


window.addEventListener('scroll',function(){
    let yValue = window.scrollY
    console.log(yValue)
    const remoteRotate = 125+yValue*0.1
    if(remoteRotate<180){


        remoteControllerImg1.style.transform=`skew(0deg,${(yValue)*0.1}deg)`
        remoteControllerImg1.style.transform=`rotate(${remoteRotate}deg)`

        remoteControllerImg2.style.opacity=(yValue-450)/55
        remoteControllerImg2.style.transform=`skew(0deg,${(yValue)*0.1}deg)`
        remoteControllerImg2.style.transform=`rotate(${remoteRotate}deg)`
    }



})




//****************PARALLEX SCROLL******************/

// Selecting 
const parallexScroll = document.querySelector('.parallexScroll')
const whiteBorderLine = document.querySelector('#whiteMiddleLine')

//part 1
const part1Circle2 = document.querySelector('.part1 .circle2')
const part1Frame = document.querySelector('.part1 .frame-right')
const part1Image1Front = document.querySelector('.part1 .image-left')
const part1Image1Back = document.querySelector('.part1 .image-left-back')
const part1tvName = document.querySelector('.part1 .tvName')

//part 2
const part2Circle2 = document.querySelector('.part2 .circle2')
const part2Frame = document.querySelector('.part2 .frame-left')
const part2Image1Front = document.querySelector('.part2 .image-right')
const part2Image1Back = document.querySelector('.part2 .image-right-back')
const part2tvName = document.querySelector('.part2 .tvName')

//part 3
const part3Circle2 = document.querySelector('.part3 .circle2')
const part3Frame = document.querySelector('.part3 .frame-right')
const part3Image1Front = document.querySelector('.part3 .image-left')
const part3Image1Back = document.querySelector('.part3 .image-left-back')
const part3tvName = document.querySelector('.part3 .tvName')


//part4

const part4Circle2 = document.querySelector('.part4 .circle2')
const part4h1=document.querySelector('.part4 h1')

const scrollYPart0 = 400;
const scrollYPart1 = part1Circle2.offsetTop-innerHeight/2;
const scrollYPart2 = part2Circle2.offsetTop-innerHeight/2;
const scrollYPart3= part3Circle2.offsetTop-innerHeight/2;
const scrollYPart4= part4Circle2.offsetTop-innerHeight/2;

const frameColor = "rgba(0, 0, 0, 0.32)"


const mediaQuery = window.matchMedia('(max-width: 768px)')


// // image size
// if(mediaQuery.matches){
//     const width= part1Image1Front.offsetWidth
//     part1Image1Front.style.height=width*1.5+"px"
// }



window.addEventListener('scroll',function(){

    
    let yValue = window.scrollY
    // console.log(yValue)


    if(mediaQuery.matches){

        const offset = 300
        const backImageMt = function(scroll){
            return (yValue-scroll-offset)*1
        }
        const FrontImageMt =function(scroll){
            return 200-(yValue-scroll-offset)*0.4
        }


        // part 0
        if(yValue<scrollYPart1){
            parallexScroll.style.backgroundColor=`hsl(0, 0%, 70%)`
        
        }


        // part 1
        if(yValue>scrollYPart1){
            parallexScroll.style.backgroundColor="hsl(0, 0%, 40%)"

            part1Circle2.style.width ="25px";
            part1Circle2.style.height ="25px";
            
            part1Frame.style.backgroundColor=frameColor



            if(yValue>(scrollYPart1+offset)){
                if(FrontImageMt(scrollYPart1)>30){
                    part1Image1Front.style.marginTop=FrontImageMt(scrollYPart1)+"px";
                }
                else{
                    part1Image1Front.style.marginTop=30+"px";                    
                }
                if(backImageMt(scrollYPart1)<420){
                    part1Image1Back.style.marginTop=backImageMt(scrollYPart1)+"px";
                    part1tvName.style.opacity=1-backImageMt(scrollYPart1)/420
                }else{
                    part1Image1Back.style.marginTop=420+"px";
                }  
            }


        }else{
            part1Circle2.style.width ="1px";
            part1Circle2.style.height ="1px";

            part1Frame.style.backgroundColor=""

        }

        // part 2
        if(yValue>scrollYPart2){
            parallexScroll.style.backgroundColor="rgba(12, 29, 88, 0.8)"

            part2Circle2.style.width ="25px";
            part2Circle2.style.height ="25px";
            
            part2Frame.style.backgroundColor=frameColor

            if(yValue>(scrollYPart2+offset)){
                const FrontImageMt2=FrontImageMt(scrollYPart2)-200
 
                if(FrontImageMt2>-170){

                    part2Image1Front.style.marginTop=FrontImageMt2+"px";
                }
                else{
                    part2Image1Front.style.marginTop=-170+"px";                    
                }
                if(backImageMt(scrollYPart2)<420){
                    part2Image1Back.style.marginTop=backImageMt(scrollYPart2)+"px";
                    part2tvName.style.opacity=1-backImageMt(scrollYPart2)/420
                }else{
                    part2Image1Back.style.marginTop=420+"px";
                }  
            }


        }else{
            part2Circle2.style.width ="1px";
            part2Circle2.style.height ="1px";

            part2Frame.style.backgroundColor=""

        }        

        // part 3
        if(yValue>scrollYPart3){
            parallexScroll.style.backgroundColor="rgba(12, 75, 88, 0.8)"

            part3Circle2.style.width ="25px";
            part3Circle2.style.height ="25px";
            
            part3Frame.style.backgroundColor=frameColor

            if(yValue>(scrollYPart3+offset)){
                if(FrontImageMt(scrollYPart3)>30){
                    part3Image1Front.style.marginTop=FrontImageMt(scrollYPart3)+"px";
                }
                else{
                    part3Image1Front.style.marginTop=30+"px";                    
                }
                if(backImageMt(scrollYPart3)<420){
                    part3Image1Back.style.marginTop=backImageMt(scrollYPart3)+"px";
                    part3tvName.style.opacity=1-backImageMt(scrollYPart3)/420
                }else{
                    part3Image1Back.style.marginTop=420+"px";
                }  
            }


        }else{
            part3Circle2.style.width ="1px";
            part3Circle2.style.height ="1px";

            part3Frame.style.backgroundColor=""

        }

        // part 4
        
        if(yValue>scrollYPart4){
            parallexScroll.style.backgroundColor="white"   
            part4Circle2.style.width ="25px";
            part4Circle2.style.height ="25px";

            if((yValue-scrollYPart4)<2000){
                part4h1.style.marginTop=300+(yValue-scrollYPart4)*0.8+"px"
                part4h1.style.opacity=(yValue-scrollYPart4)/1500
            }



        }else{
            part4Circle2.style.width ="1px";
            part4Circle2.style.height ="1px";


        }            


    }
    
    else{

        // part 0
        if(yValue<scrollYPart1){
            parallexScroll.style.backgroundColor=`hsl(0, 0%, 70%)`
        
        }


        // part 1
        if(yValue>scrollYPart1){
            parallexScroll.style.backgroundColor="hsl(0, 0%, 40%)"

            part1Circle2.style.width ="25px";
            part1Circle2.style.height ="25px";
            
            part1Frame.style.backgroundColor=frameColor

            part1tvName.style.transform=`translateX(${(yValue-scrollYPart1)/4}px)`

            part1Image1Front.style.marginTop=-100-(yValue-scrollYPart1)*0.3+"px";
            part1Image1Back.style.marginTop=(yValue-scrollYPart1)*0.5+"px";



        }else{
            part1Circle2.style.width ="1px";
            part1Circle2.style.height ="1px";

            part1Frame.style.backgroundColor=""

        }


        // part 2
        if(yValue>scrollYPart2){
            parallexScroll.style.backgroundColor="rgba(12, 29, 88, 0.8)"
            part2Circle2.style.width ="25px";
            part2Circle2.style.height ="25px";
            
            part2Frame.style.backgroundColor=frameColor

            part2tvName.style.transform=`translateX(${-(yValue-scrollYPart2)/4}px)`

            part2Image1Front.style.marginTop=-100-(yValue-scrollYPart2)*0.3+"px";
            part2Image1Back.style.marginTop=-400+(yValue-scrollYPart2)*0.5+"px";

        }else{
            part2Circle2.style.width ="1px";
            part2Circle2.style.height ="1px";

            part2Frame.style.backgroundColor=""

        }


        // part 3
        if(yValue>scrollYPart3){
            parallexScroll.style.backgroundColor="rgba(12, 75, 88, 0.8)"

            part3Circle2.style.width ="25px";
            part3Circle2.style.height ="25px";
            
            part3Frame.style.backgroundColor=frameColor

            part3tvName.style.transform=`translateX(${(yValue-scrollYPart3)/4}px)`

            part3Image1Front.style.marginTop=-100-(yValue-scrollYPart3)*0.3+"px";
            part3Image1Back.style.marginTop=(yValue-scrollYPart3)*0.4+"px";



        }else{
            part3Circle2.style.width ="1px";
            part3Circle2.style.height ="1px";

            part3Frame.style.backgroundColor=""

        }    

        if(yValue>scrollYPart4){
            parallexScroll.style.backgroundColor="white"   
            part4Circle2.style.width ="25px";
            part4Circle2.style.height ="25px";

            if((yValue-scrollYPart4)<2000){
                part4h1.style.marginTop=300+(yValue-scrollYPart4)*0.8+"px"
                part4h1.style.opacity=(yValue-scrollYPart4)/1500
            }


        }else{
            part4Circle2.style.width ="1px";
            part4Circle2.style.height ="1px";


        }    

    }


})

        

