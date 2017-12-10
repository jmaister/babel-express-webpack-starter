const bitcoin = require('bitcoin-promise');
const batchPromises = require('batch-promises');

// all config options are optional
const client = new bitcoin.Client({
  host: '50.3.73.101',
  port: 8332,
  user: 'btc',
  pass: 'FDxmNSZRKWEC6Sg92eezsxUvdNceIXYrCUDbVADFujM=',
  timeout: 30000
});

/*
client.getBlockchainInfo(function (err, info, headers) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("info", info);
        console.log("headers", headers);
    }
});
*/


client.getBlockchainInfo().then(info => {
    var n = 0;
    var init = Date.now();

    console.log('starting');
    var heights = [];
    for (var height = info.blocks; height > 0; height--) {
        heights.push(height);
    }
    console.log(heights.length);

    batchPromises(2, heights, height => new Promise((resolve, reject) => {
        console.log('height',height);

        client.getBlockHash(height).then((blockHash)=>{
            console.log(blockHash);
            return client.getBlock(blockHash);
        })
        .then((blockInfo) => {
            console.log(height);
            n = n + 1;
            // console.log(height, blockInfo);
            var df = (Date.now() - init) / 1000;
            var bpers = n / df;
            console.log(df + ' ms', bpers + ' b/s');
            resolve();
        })
        .catch(function (err) {
            reject(err);
            console.log('ERROR !!!', err);
        });    
    }))
    .then(results => {
        console.log(results);
    })
    .catch(err => {
        console.log('Err', err);
    });


    for (var height = info.blocks; height > 0; height--) {
        // console.log(height);
        client.getBlockHash(height).then((blockHash)=>{
            return client.getBlock(blockHash);
        })
        .then((blockInfo) => {
            console.log(height);
            n = n + 1;
            // console.log(height, blockInfo);
            var df = (Date.now() - init) / 1000;
            var bpers = n / df;
            console.log(df + ' ms', bpers + ' b/s');
        })
        .catch(function (err) {
            console.log('ERROR !!!', err);
        });    
    }    
});
