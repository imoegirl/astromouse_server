
const Redis = require('ioredis');
const redis = new Redis();

const timing = async (name = 'test', cb) => {
    console.time(name);
    typeof cb === 'function' && await cb();
    console.timeEnd(name);
}


function test_redis(){
    // lpush [list 列表]
    timing('lpush', _ => {
        // redis.lpush('list', [1, 2, 3]).then(res => console.log('1111 ',res));
        
        redis.lrange('list', [0, -1]).then(res => console.log(res));
        // for(let i = 0; i < 100; ++i){
        //     redis.lpop('list').then(res => console.log('value: ', res));
        // }
    });
}

async function push_unuse_names(names) {
    console.log('push names');
    await redis.lpush('unuse_nickname', names);
    console.log('name push down');
}

async function get_one_unuse_name() {
    let name = await redis.lpop('unuse_nickname');
    return name;
}

module.exports = {
    test_redis: test_redis,
    push_unuse_names: push_unuse_names,
    get_one_unuse_name: get_one_unuse_name,
}