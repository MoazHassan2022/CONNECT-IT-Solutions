//    var mainColor = localStorage.getItem("color");


// this is back ground change
var backspan = document.querySelectorAll("#backbox div"),
    backinfo = document.getElementById("yes").getAttribute("data");
    backspan.forEach(span => {    
span.addEventListener("click", (e) => {
    
    backspan.forEach(span => {
        span.style.opacity= ".5";
    });
    e.target.style.opacity= "1";
    backinfo = e.target.getAttribute("data");
    if (backinfo === "no") {
        clearInterval(q);
    } else {
        setInterval(amy,3000);
    }
})
});

var i = 1;
var q = setInterval(amy,5000);
function amy() {
    "use strict";
    if (i <= 6) {
        document.getElementById("landing").style.backgroundImage = `URL(${i}.jfif)`;
        i += 1;
    } else {  
        i = 1;
    }     
    document.getElementById("landing").style.transition = "3s";
}

//slider setting box
var gear =document.querySelector(".circle");
var box = document.getElementById("setting-box");
gear.onclick = ()=> {
    if(box.style.left === "-250px") {
        box.style.left = "0px";
    } else {
        box.style.left = "-250px";
    }
}

var colorli = document.querySelectorAll("#colors li"),
    colorinfo;
    colorli.forEach(li => {
li.addEventListener("click", (e) => {
    
    colorli.forEach(li => {
        li.style.border= "none";
    });

    colorinfo = e.target.getAttribute("data");

    document.documentElement.style.setProperty("--main-",colorinfo);

    e.target.style.border= "2px Solid #333";
})
});
//localStorage.setItem("color",colorinfo);

window.onscroll = () => {
    if(pageYOffset >= 900) {
    let skills = document.querySelectorAll("#small-box #progress #progressed");
    skills.forEach(skill =>{
        skill.style.width = skill.getAttribute("data");
        skill.style.transition = "1s";

    })
}
if(pageYOffset >= "5650") {
    boxs.forEach(box => {
        let s = 0;
        setInterval(()=>{
            if(box.style.opacity <= 1) {
            box.style.transition = ".5s";
            box.style.opacity = s;
            s += .1;
            }
        },50)
    });
}
}

// let imgs = document.querySelectorAll("#gallry #container #imgbox img"),
//     cc = document.getElementById("overlav");
// imgs.forEach(() => {
//     addEventListener("click", () => {
//         console.log(cc);
//         cc.style.visibility = "hidden";
// })
// })

let imgs = document.querySelectorAll("#gallry #container #imgbox img");

imgs.forEach(_img => {
    _img.addEventListener("click", (_e) =>{
    let  overlav = document.createElement("div");
    overlav.setAttribute("id", "overlav")
    document.body.appendChild(overlav);

    const popbox = document.createElement("div"),
        popimg = document.createElement("img");
        popimg.setAttribute("src", _img.src);
    popbox.setAttribute("id", "popbox");
    if(_img.alt !== null) {
        let imgheading = document.createElement("h2"),
            imgtext = document.createTextNode(_img.alt),
            closebox = document.createElement("div"),
            closep = document.createElement("p");
            closex = document.createTextNode("X");
        imgheading.appendChild(imgtext);
        popbox.appendChild(imgheading);
        closep.appendChild(closex);
        closebox.appendChild(closep);
        popbox.appendChild(closebox);
        closebox.setAttribute("id", "closebox")        
        closebox.addEventListener("click", ()=> {
            overlav.remove();
        })
    }
    
    popbox.appendChild(popimg);
    let des = document.createElement("P"),
        deshead = document.createElement("h2"),
        destexthead = document.createTextNode(_img.alt),    
        destext = document.createTextNode(_img.getAttribute("des"));
    deshead.appendChild(destexthead);
    deshead.setAttribute("id", "deshead")
    popbox.appendChild(deshead);
    des.appendChild(destext);
    des.setAttribute("id", "descri")
    popbox.appendChild(des)
        console.log(destext.textContent);

    overlav.appendChild(popbox);
})
})

var boxs = document.querySelectorAll("#testdes #container #box");


// bullets
var bullets = document.querySelectorAll("#bullets li");
/*bullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
    document.getElementById(e.target.getAttribute("section")).scrollIntoView({
        behavior: "smooth"
    });
    });
});


console.log(navs)

navs.forEach(nav => {
    nav.addEventListener("click", (e) => {
        preventDefult();
        console.log(e.target.getAttribute("section"));
    document.getElementById(e.target.getAttribute("section")).scrollIntoView({
        behavior: "smooth"
    });
    });
});
*/
function scroller(links) {
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
        document.getElementById(e.target.getAttribute("section")).scrollIntoView({
            behavior: "smooth"
        });
        });
    });
}
var navs = document.querySelectorAll("#landing #header ul li a");
scroller(bullets);
scroller(navs);


//show/hiden bullets

var bulletsspan = document.querySelectorAll("#bulletbox div"),
    spandefu = document.querySelector("#backbox #yes").getAttribute("data");

bulletsspan.forEach(button =>{
    button.addEventListener("click", (e) =>{
        bulletsspan.forEach(button =>{
            button.style.opacity = ".5";
        })
        e.target.style.opacity = "1";
    console.log(e.target.getAttribute("data"));
        if(e.target.getAttribute("data") === "no"){
            bullets.forEach(ele  => {
                ele.style.display = "none";
            })
        } 
        if (e.target.getAttribute("data") === "yes") {
            bullets.forEach(ele  => {
                ele.style.display = "block";
            })
        }

    })



})













