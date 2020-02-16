const mongoose = require("mongoose");
module.exports = () => {
    const connect = () => {
        mongoose.connect('mongodb://localhost:15000/node', { // 1st url, 2nd option
        }, (err) => { // 3rd callback
            if (err) {
                console.log(err);
            } else {
                console.log('connected at mongodb');
            }
        });
    }
    connect();

    mongoose.connection.on('error', (err) => { // 에러발생
        console.log(err);
    });

    // db가 꺼지면 레플리카가 db 교체 재실행됨
    mongoose.connection.on('disconnected', () => { // 접촉끊기면 다시 접속
        console.log('try to reconnect at mongodb');
        connect();
    });

    require('./user'); // 모델 불러오기
    // require('./comment');
};