'use strict'
window.onload = (e) => {
	e.preventDefault();

	const carrot = document.getElementById('carrot');
	const btn = document.getElementById('btn');
	const rabit = document.getElementById('rabit');
	const radios = document.getElementsByTagName('input');
	const labels = document.getElementsByTagName('label');

	let flag = false;
	let playing = false;
	let feel;
	let count = 0;
	let stopAl = false;
	let njy, hjy, hjy2, vjy; // ジャンプ高さ

	btn.innerText = 'START ACTION !';

	labels[0].addEventListener('click', (e) => {
		e.preventDefault();
		playing || (radios[0].checked = true);
	}, { passive: false });

	labels[1].addEventListener('click', (e) => {
		e.preventDefault();
		playing || (radios[1].checked = true);
	}, { passive: false });

	labels[2].addEventListener('click', (e) => {
		e.preventDefault();
		playing || (radios[2].checked = true);
	}, { passive: false });

	function transNum(number) {
		return (window.innerHeight - ((carrot.offsetHeight + carrot.offsetTop + rabit.offsetHeight) * number)) * -1;
	}
	/* ふつう */
	njy = transNum(1.1);
	/* すごくうれしい */
	hjy = transNum(1.1);
	hjy2 = transNum(0.95);
	/* はげしくよろこぶ */
	vjy = transNum(0.95);

	// 画面リサイズ時
	window.onresize = () => {
		if (count !== 0) {
			stopAl = true;
		}
		let timeoutID = 0;
		let delay = 500;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {

			flag = false
			stopAl = false;
			playing = false;
			count = 0;
			setRadio(true);
			btn.innerText = 'START ACTION !';
			btn.style.color = '#f56500';
			btn.style.background = '#fff';

			/* ふつう */
			njy = transNum(1.1);
			/* すごくうれしい */
			hjy = transNum(1.1);
			hjy2 = transNum(0.95);
			/* はげしくよろこぶ */
			vjy = transNum(0.95);
		}, delay);
	}

	/* ラジオボタン有効・無効切替*/
	function setRadio(bool) {
		bool || (radios[0].disabled = true);
		bool || (radios[1].disabled = true);
		bool || (radios[2].disabled = true);
		!bool || (radios[0].disabled = false);
		!bool || (radios[1].disabled = false);
		!bool || (radios[2].disabled = false);
	}

	/* ふつう */
	let nj = anime({
		begin: () => {
			if (count === 0) {
				anime({
					targets: carrot,
					opacity: 1.0,
					duration: 200,
					easing: 'easeInOutCirc'
				})
			}
		},
		targets: rabit,
		translateY: njy,
		delay: 0,
		duration: 300,
		direction: 'alternate',
		easing: 'easeInOutCirc',
		autoplay: false,
		complete: () => {
			if (count % 2 === 0 && !stopAl) {
				count = (count + 1);
				nj.play();
			} else if (!stopAl) {
				count = (count + 1);
				anime({
					targets: rabit,
					duration: 200,
					direction: 'alternate',
					easing: 'easeInOutCirc',
					complete: () => {
						nj.play();
					}
				});
			} else if (stopAl) {
				stopAl = false;
				playing = false;
				count = 0;
				setRadio(true);
				btn.innerText = 'START ACTION !';
				btn.style.color = '#f56500';
				btn.style.background = '#fff';
				anime({
					targets: carrot,
					opacity: 0,
					duration: 100,
					easing: 'easeInOutCirc'
				});
			}
		}
	});

	/* すこしうれしい */
	let hj = anime({
		begin: () => {
			if (count === 0) {
				anime({
					targets: carrot,
					scale: 1.5,
					opacity: 1.0,
					duration: 200,
					easing: 'easeInOutCirc'
				});
			}
		},
		targets: rabit,
		translateY: hjy,
		delay: 0,
		duration: 200,
		direction: 'alternate',
		easing: 'easeInOutCirc',
		autoplay: false,
		complete: () => {
			if (count % 2 === 0 && !stopAl) {
				count = (count + 1) | 0;
				hj.play();
			} else if (!stopAl) {
				count = (count + 1) | 0;
				anime({
					targets: rabit,
					translateY: hjy2,
					duration: 300,
					direction: 'alternate',
					easing: 'easeInOutCirc',
					complete: () => {
						hj.play();
					}
				});
			} else if (stopAl) {
				stopAl = false;
				playing = false;
				count = 0;
				setRadio(true);
				btn.innerText = 'START ACTION !';
				btn.style.color = '#f56500';
				btn.style.background = '#fff';
				anime({
					targets: carrot,
					opacity: 0,
					scale: 1,
					duration: 100,
					easing: 'easeInOutCirc'
				});
			}
		}
	});

	/* すはげしくよろこぶ */
	let vj = anime({
		begin: () => {
			if (count === 0) {
				anime({
					targets: carrot,
					opacity: 1.0,
					scale: 2,
					duration: 200,
					easing: 'easeInOutCirc'
				});
			}
		},
		targets: rabit,
		translateY: vjy,
		// delay: 0,
		duration: 100,
		direction: 'alternate',
		easing: 'easeInOutCirc',
		autoplay: false,
		complete: () => {
			if (!stopAl) {
				count = (count + 1) | 0;
				vj.play();
			} else if (stopAl) {
				stopAl = false;
				playing = false;
				count = 0;
				setRadio(true);
				btn.innerText = 'START ACTION !';
				btn.style.color = '#f56500';
				btn.style.background = '#fff';
				anime({
					targets: carrot,
					opacity: 0,
					scale: 1,
					duration: 100,
					easing: 'easeInOutCirc'
				});
			}
		}
	});


	btn.onmousedown = (e) => {
		e.preventDefault();
		let ip = document.getElementsByTagName('input');
		feel = ip[0].checked ? 1 : ip[1].checked ? 2 : 3;
		flag = true;
		btn.style.color = '#fff';
		btn.style.background = '#f56500';
	}

	btn.onmouseup = (e) => {
		e.preventDefault();
		if (flag && !playing) {
			btn.innerText = 'STOP!';
			setRadio(false);
			playing = true;

			switch (feel) {
				case 1:
					nj.play();
					break;
				case 2:
					hj.play();
					break;
				case 3:
					vj.play();
					break;
			}
		} else if (flag && playing) {
			stopAl = true;
		}
		flag = false;
	}
}
