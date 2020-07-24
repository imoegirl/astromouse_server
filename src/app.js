const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const redisopt = require('./db/redisopt');

// redisopt.test_redis();

const dbopt = require('./db/dbopt')

// while(!dbopt.is_db_ready()){
//   console.log('等待数据库链接');
// }

// console.log('数据库链接成功!!!');

// function insert_names() {
//   const fs = require('fs');
//   let data = fs.readFileSync('./nickname.txt').toString();
//   let names = data.split('\r\n');
//   // names.forEach((item) => {
//   //   dbopt.insert_nickname(item);
//   // });
//   console.log('length: ', names.length);
//   for(let i = 0; i < names.length; ++i){
//     let name = names[i];
//     if (name != ''){
//       dbopt.insert_nickname(name);
//       // console.log('%d - %s Done!', i, name);
//     }
//   }
// }

// const fs = require('fs');
// let data = fs.readFileSync('./nickname.txt').toString();
// let names = data.split('\r\n');
// if (names[names.length - 1] == '') {
//   names.pop();
// }

// redisopt.push_unuse_names(names);

// redisopt.push_unuse_names(['fredshao', 'queen'])

// for(let i = 0; i < names.length; ++i){
//   let name = names[i];
//   if (name != ''){
//     dbopt.insert_nickname(name);
//     // console.log('%d - %s Done!', i, name);
//   }
// }
// setTimeout(insert_names, 2000);

let new_nickname = redisopt.get_one_unuse_name();
// console.log('new_nickname: ', new_nickname);


// console.log('昵称插入完成，数量: ', names.length);

// print('insert nickname: fredshao');
// dbopt.insert_nickname('fredshao');
// print('insert end');

// dbopt.set_nickname_inuse('fredshao');

// dbopt.get_unuse_nickname(100);


// async function asyncCall() {
//   console.log('calling');
//   const result = await new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
//   // expected output: "resolved"
// }

// asyncCall();



// dbopt.save_score(100);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get_ranklist/:guid', dbopt.get_ranklist);
app.post('/save_score', dbopt.save_score);
app.post('/create_user', dbopt.create_user);

app.listen(3000, () => {
  console.log('示例应用正在监听 3000 端口!');
});