const {Engine, Runner, Render, Composite, Bodies, Mouse, MouseConstraint, Events} = Matter;
let engine, render, runner, world, mouse, mouseConstraint;

class Ball {
    constructor(x, y, r, options) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.options = options;
        this.body = Bodies.circle(this.x, this.y, this.r, this.options);
        Composite.add(world, this.body);
    }
}

class Holder {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, { isStatic: true });
        Composite.add(world, this.body);
    }
}

engine = Engine.create();
world = engine.world;

render = Render.create({
    element: document.getElementById("container"),
    engine: engine,
    options: {
        wireframes: false,
        background: '#f0f0f0',
        width: 600,
        height: 600
    }
})
Render.run(render);

runner = Runner.create();
Runner.run(runner, engine);

let frameCount = 0;
Events.on(engine, "afterUpdate", () => {
    frameCount++;
    if (frameCount % 60 == 0) {
        let x = Math.floor(Math.random() * 600);
        new Ball (x, 0, 7, { restitution: 0.3 });
    }
})

function createPegs() {
    let c = 12, r = 7, space = screen.width/(c + 10) + 5;
    for (let i = 0; i < c; i++) {
        for(let j = 0; j < r; j++) {
            let x = i * space;
            if (j % 2 == 0) {
                x += space/2;
            }
            let y = space + j * space;
            new Ball(x, y, 20, { isStatic: true, friction: 0.2 });
        }
    }
}

function createHolder() {
    for (let i = 0; i < 660; i+=60) {
        new Holder(i, 565, 10, 60);
    }
    new Holder(300, 600, 600, 15)
}

createHolder();
createPegs();
Engine.update(engine); 