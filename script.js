window.addEventListener("load",function(){
const canvas = document.getElementById("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const ctx=canvas.getContext('2d');
const particleArray=[];
let amount=3;
const boost=document.getElementById("boost");

let pin = document.getElementById("pin");
let pinAngle=0;
window.addEventListener("resize",function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    
});

class Particle{
    constructor(){
        this.x=0;
        this.y=Math.floor(Math.random()*canvas.height);
        this.size=Math.random()*20;
        this.vx=0;
    }
    update(){
        this.x+=this.vx;
       
    }
    accelerate(){
        if(this.vx<12)this.vx+=2;
    }
    draw(){
        ctx.fillStyle='#2effff';
        ctx.beginPath();//這很重要，沒有這個的話，中間會有莫名其妙的線跑出來
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill();
    }
}

    for(let i=0;i<amount;i++){
        particleArray.push(new Particle());
    }

   
function check(){
    for(let i=0;i<particleArray.length;i++){
        if(particleArray[i].x>canvas.width){
            particleArray.splice(i,1);
            console.log(particleArray);
            i--;
        }
    }
    if(particleArray.length==0){
        for(let i=0;i<amount;i++){
            particleArray.push(new Particle());
        }
        pinAngle=0;
        pin.style.transform=`rotate(${pinAngle}deg)`;
    }
}

 boost.addEventListener("click",function(){
    particleArray.forEach(ball =>ball.accelerate());
    if(pinAngle<180)pinAngle+=30;
    pin.style.transform=`rotate(${pinAngle}deg)`;
 });
 
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    particleArray.forEach(ball => ball.draw());
    particleArray.forEach(ball => ball.update());
    check();
   
    requestAnimationFrame(animate);
}
animate();









});