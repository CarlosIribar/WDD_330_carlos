/* eslint-disable import/prefer-default-export */
const calculateY = (data, index, height, max) => {
  const valueRatio = (data[index] / max) * height - 50;
  return height - valueRatio;
};

const getMax = (data) => Math.max.apply(null, data);

const graph = (data) => {
  const canvas = document.getElementById('spark');
  const ctx = canvas.getContext('2d');
  const max = getMax(data);
  const xstep = canvas.width / data.length;
  let x = xstep;
  const xx = 5;
  let y = calculateY(data, 0, canvas.height, max);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(xx, y);
  ctx.strokeStyle = '#2C82C9';
  ctx.fillStyle = '#2C82C9';
  ctx.lineWidth = 3;
  ctx.arc(xx, y, 3, 0, 2 * Math.PI);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < data.length; i++) {
    y = calculateY(data, i, canvas.height, max);
    ctx.lineTo(x, y);
    ctx.arc(x, y, 3, 0, 2 * Math.PI);

    ctx.moveTo(x, y);

    x += xstep;
  }

  ctx.stroke();
  ctx.fill();
};

export { graph };
