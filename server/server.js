var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');
// 下面填写的myscrect跟github webhooks配置一样，下一步会说；path是我们访问的路径
var handler = createHandler({ path: '/api', secret: '121312asdasdasda@@@@@@' });
http.createServer(function (req, res) {
    handler(req, res, function (err) {
        res.statusCode = 404;
        res.end('no such location');
    })
}).listen(3002);
handler.on('error', function (err) {
    console.error('Error:', err.message)
});
// 监听到push事件的时候执行我们的自动化脚本
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref);
    // runCommand('sh', ['./deploy.sh'], function( txt ){
    //     console.log(txt);
    // });
});
function runCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
}
