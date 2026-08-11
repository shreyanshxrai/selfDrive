class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.controls = new Controls();
    }
    update() {
        this.#move();
    }
    #move() {if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        
        // Apply friction (simulate air resistance)
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        
        // Limit speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            const rotationSpeed = 0.03; // Adjust this value for faster or slower rotation
            if (this.controls.left) {
                this.angle += rotationSpeed * flip; // Rotate left
            }
            if (this.controls.right) {
                this.angle -= rotationSpeed * flip; // Rotate right
            }
            //reset rotation angle to 0 if arrow keys are not pressed slowly
            if (!this.controls.left && !this.controls.right) {
                this.angle *= 0.95; // Gradually reduce the angle to 0
            }
            
            if (this.controls.left) {
                this.angle += 0.03 * flip; // Rotate left
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip; // Rotate right
            }
        }
        // Move the car vertically based on speed
        this.x -= Math.sin(this.angle) * this.speed; // Move the car horizontally based on angle and speed
        this.y -= Math.cos(this.angle) * this.speed; // Move the car vertically based on angle and speed
    }   
    draw(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.fillStyle = "blue";
        ctx.rect(-this.width / 2,
            -this.height / 2,
            this.width,
            this.height);
        ctx.fill();
        ctx.restore();
    }
}