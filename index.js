
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var activeTab = document.querySelector(".tablinks.active");

        
        calculate({ currentTarget: activeTab }, '1M');

        function calculate(event, str) {
          
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            
            if (activeTab) {
                activeTab.classList.remove("active");
            }

            
            event.currentTarget.classList.add("active");
            activeTab = event.currentTarget;

            var values = [100, 100, 100, 100];

            switch (str) {
                case '1M':
                    values = [150, 90, 60, 80];
                    break;
                case '6M':
                    values = [320, 240, 255, 298];
                    break;
                case '1Y':
                    values = [950, 930, 738, 490];
                    break;
                case 'ALLTIME':
                    values = [1800, 1420, 1265, 1000];
                    break;
            }

            var colors = ['blue', '#BA9FE7', 'rgb(102, 240, 102)', 'darkblue'];
            var sum = eval(values.join('+'));
            var dollars = Math.floor(sum);
            var cents = Math.round((sum - dollars) * 100);
            
            var newValues = [];
            for (var i = 0; i < values.length; i++) {
                newValues.push((values[i] / sum) * 100);
            }
            
            dmbChart(150, 150, 125, 25, newValues, colors, 0);
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = 'black';
            ctx.font = 'bold 30px sans-serif';
            ctx.fillText('$' + dollars.toLocaleString(), 140, 165);
            
            ctx.textBaseline = 'bottom';
            ctx.font = 'bold 17px sans-serif';
            ctx.fillStyle = 'gray'; 
            ctx.fillText('.' + (cents < 10 ? '0' : '') + cents, 140 + ctx.measureText('$' + dollars.toLocaleString()).width + 5, 162);
        

            function dmbChart(cx, cy, radius, arcwidth, values, colors, selectedValue) {
                var tot = values.reduce((acc, val) => acc + val, 0);
                var accum = 0;
                var PI = Math.PI;
                var PI2 = PI * 2;
                var offset = -PI / 2;
                ctx.lineWidth = arcwidth;
                for (var i = 0; i < values.length; i++) {
                    ctx.beginPath();
                    ctx.arc(cx, cy, radius,
                        offset + PI2 * (accum / tot),
                        offset + PI2 * ((accum + values[i]) / tot)
                    );
                    ctx.strokeStyle = colors[i];
                    ctx.stroke();
                    accum += values[i];
                }
            }
        }

        