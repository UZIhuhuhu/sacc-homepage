<template>
   <canvas id="c"></canvas>
</template>

<script>
export default {
  name: "Canvas",
  mounted() {
    function Particle(t) {
      (this.id = t), (this.hue = rand(90, 0, 1)), (this.active = !1);
    }
    function drawScene() {
      (c.fillStyle = "#3b393e"), c.fillRect(0, 0, w, h);
      for (var t = 0; t < particles.length; t++)
        particles[t].active === !0 ? particles[t].draw() : particles[t].build();
      ANIMATION = requestAnimationFrame(drawScene);
    }
    function initCanvas() {
      getComputedStyle(a),
        particles.length && ((particles = []), cancelAnimationFrame(ANIMATION)),
        (w = a.width = window.innerWidth),
        (h = a.height = window.innerHeight);
      for (var t = 0; t < particleNum; t++) particles.push(new Particle(t));
      drawScene();
    }
    function rand(t, i, a) {
      t = 0 === t || t ? t : 1;
      i = i || 0;
      var e = i + (t - i) * Math.random();
      return a ? Math.round(e) : e;
    }
    var a = document.getElementById("c"),
      c = a.getContext("2d"),
      w = (a.width = window.innerWidth),
      h = (a.height = window.innerHeight),
      // area = w * h,
      particleNum = 700,
      ANIMATION,
      particles = [];
    (Particle.prototype.build = function() {
      (this.x = w / 2),
        (this.y = h / 2),
        (this.r = rand(7, 2, 1)),
        (this.vx = 10 * Math.random() - 5),
        (this.vy = 10 * Math.random() - 5),
        (this.gravity = 0.01),
        (this.opacity = Math.random() + 0.5),
        (this.active = !0),
        c.beginPath(),
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, !1),
        (c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)"),
        c.fill();
    }),
      (Particle.prototype.draw = function() {
        (this.active = !0),
          (this.x += this.vx),
          (this.y += this.vy),
          (this.vy += this.gravity),
          (this.hue -= 0.5),
          (this.r = Math.abs(this.r - 0.05)),
          c.beginPath(),
          c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, !1),
          (c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)"),
          c.fill(),
          this.r <= 0.05 && (this.active = !1);
      }),
      (function() {
        initCanvas(), addEventListener("resize", initCanvas, !1);
      })();
  }
};
</script>

<style lang="sass" scoped>
canvas
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  margin: auto
</style>
