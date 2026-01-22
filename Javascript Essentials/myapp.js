console.log( "Hello World" );
console.log( 200 );
console.log( true );
console.log( null );

var num = 10;

console.log( num );
console.log( "string = ", "Text ,", "numbers = ", num, ", boolean = ", true, false, "," ,null, "," ,undefined );
// Execution context = 
// A list of instructions to complete the routine.

function makeCoffee (sugar, milk) {
    let instructions = "Boil Water,";
    instructions += " pour into cup,";
    instructions += " add coffee granules,";
    instructions += " add " + sugar + " spoon of sugar,";
    instructions += " add " + milk + "% milk.";

    return instructions;
}


makeCoffee(2, 10)

// return instructions;

// // let vars = array(10);

// // console.log(vars)
console.log(makeCoffee(2, 10));
// prompt(makeCoffee)

// let text = 'Wealth\'s';
// console.log(`my name is ${text}`);

// the function tells the compiler that you want to define a subroutine

/*
   1. Argument are Values
    While Parameters are the empty boxes or variables waiting to store the data whicah are the arguments.
   2. Once a function is placed indise an object
    it is known as a method.
    
*/ 

var car = {
    color: "red",
    speed: 200,
    drive: function(){
        return "drive";
    }
};

var shoppingList = [
    "Apple",
    "Orange",
    "Pear",
    ["embeded", 200],
    {car: "ford"},
    function(){
        return "Computed Member Access"
    },
    "Last Element"
];

var carr = {
    name: "Volvo",
    speed: 130,
    engine: {
        size: 2.0,
        make: "BMW",
        fuel: "Petrol",
        pistons:[
            {
                maker: "BMW"
            },
            {
                maker: "BMW"
            }
        ]
    },
    drive: function(){return "drive"}
}

console.log(carr.name);
console.log(carr.engine.pistons)
console.log(carr.drive())
console.log(shoppingList[1])
console.log(carr.engine.pistons[1])
console.log(shoppingList[5]())
// console.log(carr["engine"]["pistons"][1][maker])
// the shift method removes the first item in an array
console.log(shoppingList)
console.log(shoppingList.shift())
console.log(shoppingList)
console.log(shoppingList.pop())
console.log(shoppingList)
console.log(shoppingList.slice(1))
console.log(shoppingList)
console.log(shoppingList.unshift("Add element"))
console.log(shoppingList)
console.log(shoppingList.push("end", 200))
console.log(shoppingList)
console.log(shoppingList.splice(4, 2))
console.log(shoppingList)
console.log(shoppingList.splice(3, 0, "awesome", "legend", "boss"))
console.log(shoppingList)
console.log(shoppingList.slice(1))

console.clear();
/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;
console.log(video, src);

/* Make sure the video is 'activated' on iOS */
function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

/* ---------------------------------- */
/* Scroll Control! */

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1 },
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

once(video, "loadedmetadata", () => {
  tl.fromTo(
    video,
    {
      currentTime: 0
    },
    {
      currentTime: video.duration || 1
    }
  );
});

/* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
setTimeout(function () {
  if (window["fetch"]) {
    fetch(src)
      .then((response) => response.blob())
      .then((response) => {
        var blobURL = URL.createObjectURL(response);

        var t = video.currentTime;
        once(document.documentElement, "touchstart", function (e) {
          video.play();
          video.pause();
        });

        video.setAttribute("src", blobURL);
        video.currentTime = t + 0.01;
      });
  }
}, 1000);

/* ---------------------------------- */