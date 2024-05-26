function setup() {
  createCanvas(400, 400);
  // put setup code here
}

function draw() {
  background(51);
  // put drawing code here

  stroke(255);
  branch(100);
}

function branch(len) {
  const x = 200;
  const step = 50;

  if (x === 100) {
    return 0;
  }

  line(x, height, x, height - len);

  line(x, height - len, x - step, height - len - step);
  line(x, height - len, x + step, height - len - step);

  line(
    x - step,
    height - len - step,
    x - step - step / 2,
    height - len - step - step / 2,
  );
  line(
    x - step,
    height - len - step,
    x - step + step / 2,
    height - len - step - step / 2,
  );
  line(
    x + step,
    height - len - step,
    x + step - step / 2,
    height - len - step - step / 2,
  );
  line(
    x + step,
    height - len - step,
    x + step + step / 2,
    height - len - step - step / 2,
  );
}
