var Phone = require('../models/phone');

var mongoose = require('mongoose');

mongoose.Promise =global.Promise;
mongoose.connect('mongodb+srv://bavuong:BnYI8mHLK4A17lvh@cluster0.sqp3j.mongodb.net/Eatcake?retryWrites=true&w=majority');

var phones = [
new Phone({
	imagePath: 'https://cdn.tgdd.vn/Products/Images/42/198411/lg-g8-thinq-1-600x600.jpg',
	title: 'LG G8 THIN Q',
	description: "Excellent design, premium materials, luxurious colors,3 unlock options: fingerprint reader, Face Unlock and Hand ID (palm vein recognition) brand new,Use Crystal Sound OLED Speaker technology that combines Boombox effects to create rich, detailed sound",
	Type: 'Smartphone',
	price: '150'
}),
new Phone({
	imagePath: 'https://hoanghamobile.com/i/preview/Uploads/2021/01/15/11111.png',
	title: ' Samsung S21 5G',
	description: "The new 100% powered Exynos 9825 chip is also the first mobile microprocessor built on the advanced 7nm EUV UV etching process",
	Type: 'Smartphone',
	price: '210'
}),

new Phone({
	imagePath: 'https://didongviet.vn/pub/media/catalog/product//g/a/galaxy-a51-didongviet_1.png',
	title: 'Samsung A51',
	description: "The new 100% powered Exynos 9825 chip is also the first mobile microprocessor built on the advanced 7nm EUV UV etching process",
	Type: 'Smartphone',
	price: '60'
}),
new Phone({
	imagePath: 'https://www.xtmobile.vn/vnt_upload/product/03_2020/thumbs/600_lg_v50s_thinq_5g_8gb_256gb_han_quoc_like_new.jpg',
	title: 'LG V50S 5G',
	description: "Possessing a top configuration with 855 chip and 8GB of RAM for any game or application",
	Type: 'Smartphone',
	price: '49'
})
];


var done = 0;
phones.map(phone => {
	phone.save((err, result) => {
		console.log("Done! " + (result?._id ?? "undefined"));
		done++;
		if(done == phones.length){
			process.exit(1);
		}
	})
})