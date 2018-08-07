var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }
}

var loadLevel = function (game, n) {
    n -= 1;
    var level = levels[n];
    var blocks = [];
    for (let index = 0; index < level.length; index++) {
        var b = new Block(game);
        b.x = level[index][0];
        b.y = level[index][1];
        blocks.push(b);
    }
    return blocks;
}

var __main = function () {
    enableDebugMode(true)
    var images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }


    var game = paddleGame(images, function (g) {
        var paddle = new Paddle(game);
        var ball = new Ball(game);
        var level = 1;
        var blocks = loadLevel(game, level);
        var score = new Score();
        //events
        game.registerAction('a', function () {
            paddle.moveLeft();
        });
        game.registerAction('d', function () {
            paddle.moveRight();
        });
        game.registerAction('f', function () {
            ball.fire();
        });
        window.addEventListener('keydown', function (event) {
            if (event.key === 'p') {
                game.pause();
            }
        })
        game.update = function () {
            if (game.paused) {
                return;
            }
            ball.move();
            // ball和 滑板相撞
            if (ball.collide(paddle)) {
                ball.speedY *= -1;
            }
            // blocks 和 ball 相撞
            for (let index = 0; index < blocks.length; index++) {
                var block = blocks[index];
                if (block.collide(ball)) {
                    block.kill();
                    ball.speedY *= -1;
                    //update score
                    score.score++;
                }
            }
            // 关卡更新
            if (blocks.every(function (item) {
                    if (!item.alive) {
                        return true
                    }
                })) {
                if (level++ === 4) {
                    level = 1;
                }
                blocks = loadLevel(game, level);
            }

        };
        // mouse event
        var enDrag = false;
        game.canvas.addEventListener('mousedown', function (event) {
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enDrag = true;
            }
        })
        game.canvas.addEventListener('mousemove', function (event) {
            // log(event)
            var x = event.offsetX
            var y = event.offsetY
            if (enDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', function (event) {
            enDrag = false
        })
        game.draw = function () {
            //draw
            game.drawImage(paddle);
            game.drawImage(ball);
            // draw block
            for (let index = 0; index < blocks.length; index++) {
                var block = blocks[index];
                if (block.alive) {
                    game.drawImage(block);
                }
            }
            //draw score
            game.context.font = "20px serif";
            game.context.fillText(`score:${score.score}`, score.x, score.y);
        }
    });

}

__main();