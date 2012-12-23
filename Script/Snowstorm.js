function Snowstorm() {

    this.performance;

    this.canvas;
    this.context;

    this.raf;
    this.callback;
    this.calculateScore = true;
    this.currentScore = 0;
    this.countRAFs;
    this.countCallbacks = 0;
    this.measureCallbacks = true;

    this.checkFrameCount = 0;
    this.checkFrequency = 4;
    this.numberToAdjust = 3;

    this.snowflakes = new Array();
    this.countSnowflakes = 0;
    this.maxCountSnowflakes = 0;
    this.windSpeed = 0;

    this.Initialize();

    this.BeginSpinDown = function () {
        this.measureCallbacks = false;
        this.calculateScore = false;

        this.ClearSnow();
        this.Stop();
    }

    this.Draw = function () {

        this.performance.BeginDrawLoop();
        this.countRAFs++;
        this.context.clearRect(0, 0, sceneWidth, sceneHeight);
        this.context.textAlign = "center";
        this.context.font = "34pt Cookies";
        this.context.fillText(this.currentScore, 110, sceneHeight - 50);
        this.context.font = "14pt Cookies";
        this.context.fillText("PenguinMark Score", 110, sceneHeight - 22);
        var measures = "Snow:" + this.countSnowflakes + " Peak:" + this.maxCountSnowflakes + " Calls:" + this.countCallbacks;
        this.context.font = "7pt Cookies";
        this.context.fillText(measures, 110, sceneHeight - 8);

        var snowflake = null;
        for (var i = 1; snowflake = this.snowflakes[i]; i++) {
            snowflake.Move();
            snowflake.Draw(this.context);
        }
     
        this.checkFrameCount++;

        this.RequestAnimFrame();
        this.performance.FinishDrawLoop();

        this.currentScore = this.performance.drawCount;
    }

    this.HandleCallback = function () {
        this.countCallbacks++;

        if (this.measureCallbacks == true) {
            this.RequestCallback();
        }
    }

    this.Resize = function () {
        this.Initialize();
        this.canvas.setAttribute("width", sceneWidth);
        this.canvas.setAttribute("height", sceneHeight);
    }

    this.RequestAnimFrame = function () {
        this.raf = requestAnimFrame(function () { snowstorm.Draw(); }, (1000 / 60));
    }

    this.RequestCallback = function () {
        this.callback = requestCallback(function () { snowstorm.HandleCallback(); } );
    }

    this.ScheduleSpinDown = function () {
        this.callback = setTimeout(function () { snowstorm.BeginSpinDown(); }, 44000 );
    }

    this.ShowEntry = function () {
        this.RequestAnimFrame();
    }

    this.Start = function () {
        this.RequestAnimFrame();
        this.RequestCallback();
        this.ScheduleSpinDown();
    }

    this.Stop = function () {
        cancelAnimFrame(this.raf);
        this.context.clearRect(0, 0, sceneWidth, sceneHeight);
        ShowResults();
    }
}


Snowstorm.prototype.Initialize = function () {
    this.performance = new Performance();
    this.canvas = document.getElementById("SnowstormCanvas");
    this.context = this.canvas.getContext("2d");
    this.context.textAlign = "center";

    this.windSpeed = 1000;

    for (var i = 1; i <= 10000; i++) {
        this.snowflakes.push(new Snowflake());
        this.countSnowflakes++;
    }

    for (var i = 1; snowflake = this.snowflakes[i]; i++) {
        snowflake.snowstorm = this;
    }
};

Snowstorm.prototype.ClearSnow = function () {
    this.snowflakes = new Array();
    this.countSnowflakes = 0;
};

Snowstorm.prototype.RemoveSnowflakes = function (count) {
    for (var i = 1; i <= count; i++) {
        this.snowflakes.pop();
        this.countSnowflakes--;
    }
};
