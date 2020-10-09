let img1 = document.getElementById('corner0');
let img2 = document.getElementById('corner1');
let img3 = document.getElementById('corner2');
let header = document.getElementsByClassName('greeting')[0];
let arrow = document.getElementById('arrow');
let bck = document.querySelector(".landing");

const eventListener = document.getElementById("pic-container");

/*console.log(bck.style.backgroundPositionY);

eventListener.addEventListener("mousemove", (e) => {
	img1.style.top = `calc(10vh + ${e.clientY / 200}px)`;
	img1.style.left = `calc(10vw + ${e.clientX / 200}px)`;

	img2.style.top = `calc(10vh + ${e.clientY / 200}px)`;
	img2.style.left = `calc(90vw - 10em + ${e.clientX / 200}px)`;

	img3.style.top = `calc(90vh - 10em + ${e.clientY / 200}px)`;
	img3.style.left = `calc(90vw - 10em + ${e.clientX / 200}px)`;

	arrow.style.top = `calc(95vh - 14vmin + ${e.clientY / 200}px)`;
	arrow.style.left = `calc(10vw + ${e.clientX / 200}px)`;

	header.style.top = `calc(50vh + ${e.clientY / 200}px)`;
	header.style.left = `calc(10% + ${e.clientX / 200}px)`;
});*/