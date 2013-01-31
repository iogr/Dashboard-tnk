    //getting data from service
    var __data__ = null;

    var getData = function() {
        if (__data__ != null) {
            return __data__;
        } else {
            $.getJSON('http://94.127.69.63:8080/data/3', function(data) {
            // $.getJSON('data/3', function(data) {
                __data__ = data;
                setDataToDom(data);
                $("#cached").hide();
                return data;
            });
        }
    };


function formatDollar(num) {
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (x in chars) {
        count++;
        if(count%3 == 1 && count != 1 && chars[x] != '-') {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr;
}


    var setDataToDom = function(data) {
        $('#ev').html('<nobr>'+formatDollar(Math.floor(parseFloat(data['ev'])/1000)) + ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');
        $('#ac').html('<nobr>'+formatDollar(Math.floor(parseFloat(data['ac'])/1000))+ ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');
        $('#pv').html('<nobr>'+formatDollar(Math.floor(parseFloat(data['pv'])/1000))+ ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');
        $('#spi').html(data['spi']);
        $('#sv').html(formatDollar(Math.floor(parseFloat(data['sv'])/1000))+ ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');
        $('#cpi').html(data['cpi']);
        $('#cv').html(formatDollar(Math.floor(parseFloat(data['cv'])/1000))+ ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');
        $('#vac').html(formatDollar(Math.floor(parseFloat(data['vac'])/1000))+ ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E');

        chart.series[0].points[0].update(parseFloat(data['pv']));
        chart.series[0].points[1].update(parseFloat(data['ev']));
        chart.series[0].points[2].update(parseFloat(data['ac']));

if (parseFloat(data['ev']) > parseFloat(data['ac'])) {

$('#res1').html('\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F\u0020\u043F\u043E\u0020\u0431\u044E\u0434\u0436\u0435\u0442\u0443')
$('#res1b').html('<img src="img/green.png"  height="22px" width="22px" style="vertical-align:middle;opacity:0.5">');
} else { 

$('#res1').html('\u041F\u0435\u0440\u0435\u0440\u0430\u0441\u0445\u043E\u0434\u0020\u043F\u043E\u0020\u0431\u044E\u0434\u0436\u0435\u0442\u0443')
$('#res1b').html('<img src="img/red.png"  height="22px" width="22px" style="vertical-align:middle;opacity:0.5">');
       };


if (parseFloat(data['ev']) > parseFloat(data['pv'])) {

$('#res2').html('\u041E\u043F\u0435\u0440\u0435\u0436\u0435\u043D\u0438\u0435\u0020\u043F\u043E\u0020\u0433\u0440\u0430\u0444\u0438\u043A\u0443')
$('#res2b').html('<img src="img/green.png"  height="22px" width="22px" style="vertical-align:middle;opacity:0.5">');
} else { 

$('#res2').html('\u041E\u0442\u0441\u0442\u0430\u0432\u0430\u043D\u0438\u0435\u0020\u043E\u0442\u0020\u0433\u0440\u0430\u0444\u0438\u043A\u0430')
$('#res2b').html('<img src="img/yellow.png"  height="22px" width="22px" style="vertical-align:middle;opacity:0.5">');
       };


if ((parseFloat(data['ev']) > parseFloat(data['ac'])) && (parseFloat(data['ev']) < parseFloat(data['pv']))) { 
(t13).style.opacity = 1
};
if ((parseFloat(data['ev']) > parseFloat(data['ac'])) && (parseFloat(data['ev']) > parseFloat(data['pv']))) { 
(t11).style.opacity = 1
};

if ((parseFloat(data['ev']) < parseFloat(data['ac'])) && (parseFloat(data['ev']) > parseFloat(data['pv']))) { 
(t31).style.opacity = 1
};

if ((parseFloat(data['ev']) < parseFloat(data['ac'])) && (parseFloat(data['ev']) < parseFloat(data['pv']))) { 
(t33).style.opacity = 1
};

if (parseFloat(data['spi']) * parseFloat(data['cpi']) >1) {
$('#res3').html('<a href="#" data-reveal-id="myModal" style="color: inherit">'+(parseFloat(data['spi'])*parseFloat(data['cpi'])).toFixed(4)+' > 1'+'</a>')
};

if (parseFloat(data['spi']) * parseFloat(data['cpi']) <1) {
$('#res3').html((parseFloat(data['spi'])*parseFloat(data['cpi'])).toFixed(4)+' < 1')
};

if ((parseFloat(data['spi'])*parseFloat(data['cpi']))>1) { 
$('#res3b').html('<img src="img/green.png"  height="22px" width="22px" style="vertical-align:middle;opacity:0.5">');
};


    };


    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'chart',
                type: 'bar',	
		
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Плановое освоение (PV)','Освоенный объём (EV)', 'Факт. Затраты (АС)'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u0020\u0028\u043E\u0431\u044A\u0435\u043C\u0029',
                    align: 'high'
                }

            },
            tooltip: {
	    shared: true,
            valueDecimals: 2,
            valuePrefix: '',
            valueSuffix: ' \u0440\u0443\u0431\u002E'
            },
            plotOptions: {
		
		series: {
		stickyTracking: false

		},
                bar: {
			
			crop: true,
			dataLabels: {
			formatter:  function() {
	return ''+ formatDollar(Math.floor(this.y / 1000)) + ' \u0442\u044B\u0441\u002E\u0020\u0440\u0443\u0431\u002E';
			},
			style: {
                        fontWeight:'bold',
			fontSize:15,
                    },
			valueDecimals: 1,
			crop: false,
			x:-150,
			y:-22,	
			
			zIndex:50,
                        enabled: true
                    }
                }
            },
	    legend: {enabled: false},
            credits: {
                enabled: true
            },
            series: [{
              name: 'значение показателя',
                data: [0, 0, 0]
            }]
        });

        window.setInterval(function(){if (__data__ == null) {$("#cached").show();}}, 4000);
        setDataToDom({"ev":"122003247871.89130","ac":"88960857323.94965","pv":"122430192865.72511","spi":"0.99651","sv":"-426944993.83384","cpi":"1.37143","cv":"33042390547.94165","vac":"1266715472611.14180"});

        getData();


    });
    
// });