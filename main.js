const canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight;
canvas.width = 200;
const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1 ), 100,  30, 50);


function animate() {
    car.update();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}

animate(); 