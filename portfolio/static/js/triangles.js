function Triangles(canvas, colors, size, over, spread, color_range, morph_speed, circle_speed) {
    var that = this;

    this.canvas = canvas;
    this.colors = colors;
    this.size = size;
    this.over = over;
    this.spread = spread;
    this.color_range = color_range;
    this.morph_speed = morph_speed;
    this.circle_speed = circle_speed;
    this.context = this.canvas.getContext('2d');

    // Resize canvas on window resize
    window.addEventListener('resize', function(event) { that.reset() });

    this.reset();

    window.requestAnimationFrame(function() { that.draw(); });
}

Triangles.prototype = {

    reset: function() {
        this.points = {};
        this.triangles = [];
        this.circle = new Circle(0, 0, 0);
        this.circle.r = 1;

        this.make_points();
        this.make_triangles();

        // Initially randomize triangles
        this.randomize();
        for (var i in this.points) this.points[i].step(1, 1);
        // Initially color triangles
        this.color_triangles(this.colors);
        for (var i in this.triangles) this.triangles[i].c = this.triangles[i].dest_c;

        // Resize canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    draw: function() {
        if (this.circle.r != this.circle.dest_r) {
            this.clear();

            for (var i in this.points) {
                if (this.circle.point_in(this.points[i]))
                    this.points[i].step(this.morph_speed, 0.1);
            }

            for (var i in this.triangles) {
                if (this.circle.point_in(this.triangles[i].center()))
                    this.triangles[i].step(this.morph_speed, 0.1);

                this.triangles[i].draw(this.context);
            }

            this.circle.step(this.circle_speed);
        }

        var that = this;
        window.requestAnimationFrame(function() { that.draw(); });
    },

    make_points: function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var max_x = Math.floor(width / this.size) + this.over + 1;
        var max_y = Math.floor(height / this.size) + this.over + 1;

        for (y = -this.over; y < max_y; y++) {
            for (x = -this.over; x < max_x; x++) {
                this.points[[x, y]] = new Point(x * this.size + (y % 2 ? this.size / 2 : 0), y * this.size);
            }
        }
    },

    make_triangles: function() {
        var max_x = Math.floor(window.innerWidth / this.size) + this.over;
        var max_y = Math.floor(window.innerHeight / this.size) + this.over;
        var t1, t2;

        for (y = -this.over; y < max_y; y++) {
            for (x = -this.over; x < max_x; x++) {
                t1 = new Triangle(this.points[[x, y]],
                                  this.points[y % 2 ? [x + 1, y + 1] : [x + 1, y]],
                                  this.points[[x, y + 1]]);
                t2 = new Triangle(this.points[[x + 1, y]],
                                  this.points[y % 2 ? [x, y] : [x, y + 1]],
                                  this.points[[x + 1, y + 1]]);

                this.triangles.push(t1, t2);
            }
        }
    },

    morph: function(x, y, colors) {
        this.randomize();

        if (colors) {
            this.colors = colors;
            this.color_triangles(colors);
        }

        this.circle = new Circle(x, y, 0);
        this.circle.set_dest(Math.max(window.innerWidth, window.innerHeight) * 1.5);
    },

    color_triangles: function(colors) {
        var gradient = this.make_gradient(colors);

        for (var i in this.triangles)
            this.triangles[i].set_dest(this.get_color(gradient, this.triangles[i].center()));
    },

    make_gradient: function(colors) {
        // Create canvas for gradient
        var canvas_g = document.createElement('canvas');
        var context_g = canvas_g.getContext('2d');

        // Set size to account for overfill
        canvas_g.width = window.innerWidth + (this.size * this.over * 2);
        canvas_g.height = window.innerHeight + (this.size * this.over * 2);

        var gradient = context_g.createRadialGradient(0, 0, 0, 0, 0, canvas_g.width * 1.5);

        for (var i in colors)
            gradient.addColorStop(colors[i].stop, colors[i].color);

        context_g.fillStyle = gradient;
        context_g.fillRect(0, 0, canvas_g.width, canvas_g.height);

        return {canvas: canvas_g,
                data: context_g.getImageData(0, 0, canvas_g.width, canvas_g.height).data};
    },

    get_color: function(gradient, point) {
        var offset = this.size * this.over;
        var i = (Math.floor(point.x) + offset + ((Math.floor(point.y) + offset) * gradient.canvas.width)) * 4;

        // Randomize colors
        var rand = Math.floor((Math.random() * this.color_range * 2) - this.color_range);

        var g = gradient.data;
        return [g[i] + rand, g[i + 1] + rand, g[i + 2] + rand];
    },

    randomize: function() {
        var range = this.size * this.spread;
        var rand_x, rand_y;

        for (var i in this.points) {
            rand_x = (Math.random() * (range * 2)) - range + this.points[i].orig_x;
            rand_y = (Math.random() * (range * 2)) - range + this.points[i].orig_y;
            this.points[i].set_dest(rand_x, rand_y);
        }
    },

    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
};

function Point(x, y) {
    this.x = this.orig_x = this.dest_x = x;
    this.y = this.orig_y = this.dest_y = y;
}

Point.prototype = {
    set: function(x, y) {
        this.x = x;
        this.y = y;
    },

    set_dest: function(dest_x, dest_y) {
        this.dest_x = dest_x;
        this.dest_y = dest_y;
    },

    draw: function(context, size) {
        context.fillRect(this.x - (size / 2), this.y - (size / 2), size, size);
    },

    step: function(step, thresh) {
        var diff_x = (this.dest_x - this.x);
        var diff_y = (this.dest_y - this.y);

        var new_x = Math.abs(diff_x) > thresh ? diff_x * step + this.x : this.dest_x;
        var new_y = Math.abs(diff_y) > thresh ? diff_y * step + this.y : this.dest_y;

        this.set(new_x, new_y);
    },
};


function Triangle(p1, p2, p3, c) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.c = this.dest_c = c;
}

Triangle.prototype = {
    set_dest: function(dest_c) {
        this.dest_c = dest_c;
    },

    draw: function(context) {
        var color = this.color();
        context.fillStyle = color;
        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(this.p1.x, this.p1.y);
        context.lineTo(this.p2.x, this.p2.y);
        context.lineTo(this.p3.x, this.p3.y);
        context.lineTo(this.p1.x, this.p1.y);
        context.stroke();
        context.fill();
    },

    step: function(step, thresh) {
        var diff_c, new_c;

        for (var i in this.c) {
            diff_c = this.dest_c[i] - this.c[i];
            new_c = Math.abs(diff_c) > thresh ? diff_c * step + this.c[i] : this.dest_c[i];
            this.c[i] = Math.floor(new_c);
        }
    },

    color: function() {
        return 'rgb(' + this.c[0] + ',' + this.c[1] + ',' + this.c[2] + ')';
    },

    center: function() {
        var x = (this.p1.x + this.p2.x + this.p3.x) / 3;
        var y = (this.p1.y + this.p2.y + this.p3.y) / 3;
        return new Point(x, y);
    },
};


function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = this.dest_r = r;
}

Circle.prototype = {
    set: function(r) {
        this.r = r;
    },

    set_dest: function(dest_r) {
        this.dest_r = dest_r;
    },

    draw: function(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.stroke();
    },

    step: function(step) {
        var new_r = this.r + step;
        this.set(new_r <= this.dest_r ? new_r : this.dest_r);
    },

    point_in: function(p) {
        return Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2) < Math.pow(this.r, 2);
    },
};
