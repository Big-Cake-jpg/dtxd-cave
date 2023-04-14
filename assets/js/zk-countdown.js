var urodz1 = new Date("6/20/2023");
var now = new Date();
var ile1 = urodz1.getTime() - now.getTime();
var dni1 = Math.floor(ile1 / (1000 * 60 * 60 * 24));
document.write(dni1)
