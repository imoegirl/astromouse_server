
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
    // console.log('push names');
    await redis.lpush('unuse_nickname', names);
    console.log('name push down');
}

async function get_one_unuse_name() {
    let name = await redis.lpop('unuse_nickname');
    // console.log('got name: ', name);
    return name;
}


async function update_score(guid, score) {

    let maxScore = await redis.zscore('max_rank', guid);
    let prevScore = 0;
    if(maxScore != null){
        prevScore = parseInt(maxScore);
    }

    if((maxScore == null) || score > prevScore){
        prevScore = score;
        await redis.zadd('max_rank', score, guid);
    }

    let rank = await redis.zrevrank('max_rank', guid);

    return {'rank': rank + 1, 'score': parseInt(prevScore) };
}


async function get_rank_and_max_score(guid) {
    let score = await redis.zscore('max_rank', guid);
    if(score == null) {
        return {'rank': 0, 'score': 0};
    }else{
        let rank = await redis.zrevrank('max_rank', guid);
        if(rank == null) {
            return {'rank': 0, 'score': 0};
        }else{
            return {'rank': rank + 1, 'score': parseInt(score) };
        }
    }
}

async function get_ranklist(count) {
    let ranklist = await redis.zrevrange('max_rank', 0, count - 1, 'WITHSCORES');
    return ranklist;
}

// function get_one_unuse_name() {
//     redis.lpop('unuse_nickname').then(function(result){
//         console.log('got nickname: ', result);
//     });
// }

module.exports = {
    test_redis: test_redis,
    push_unuse_names: push_unuse_names,
    get_one_unuse_name: get_one_unuse_name,
    update_score: update_score,
    get_rank_and_max_score: get_rank_and_max_score,
    get_ranklist: get_ranklist,
}