console.clear();

function setup() {
  createCanvas(windowWidth,windowHeight);
  create();
}

const gap = 17;
const size = 5;
const dampingSpeed = .1;


let arms = [];

class Arm {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.pos = getPos(x,y);
    this.join = getJoin(x,y);
    this.targetJoin = this.join;
    
    this.updateColor();
  }
  updateColor () {
    this.color = random() < .95 ? 220 : [220,0,0];
  }
  update() {
    this.join.x += (this.targetJoin.x - this.join.x) * dampingSpeed;
    this.join.y += (this.targetJoin.y - this.join.y) * dampingSpeed;
  }
  draw () {
    if(random() < .001) {
      this.targetJoin = getJoin(this.x, this.y);
    }
    if(random() < .0005) {
      this.updateColor();
    }
    
    this.update()
    
    stroke(this.color);
    strokeWeight(size);
    line(this.pos.x,this.pos.y,this.join.x,this.join.y);
  }
}

const getJoin = (x,y) => {
  const options = [];
  options.push(getPos(x - 1, y));
  options.push(getPos(x + 1, y));
  options.push(getPos(x, y - 1));
  options.push(getPos(x, y + 1));
  options.push(getPos(x - 1, y - 1));
  options.push(getPos(x - 1, y + 1));
  
  return random(options);
}
const getPos = (x,y) => {
  let xPos = x * gap;
  let yPos = y * gap;
  
  if(y % 2 == 0) xPos += gap*.5;
  
  return createVector(xPos, yPos)
}
let radius;
const create = () => {
  arms = [];
  const horizCount = width / gap;
  const vertCount = height / gap;
  radius  = min(width, height) * .12;
  
  for(var x = 0; x <= horizCount; x++) {
    for(var y = 0; y <= vertCount; y++) {
      const xPos = x * size;
      const yPos = y * size;
      const d = dist(0,0,(xPos) - (width*.15),yPos  - (height*.15));
  
    console.log(d, radius)


      if(d < radius) {
        arms.push(new Arm(x,y));
      }
    }
  }
}

function draw () {
  background(50);
  arms.forEach(arm => arm.draw());
}

function mouseClicked() { create() }
function touchEnded() { create() }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  create()
}