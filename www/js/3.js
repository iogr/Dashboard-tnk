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
        if(count%3 == 1 && count != 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr;
}


    var setDataToDom = function(data) {
        $('#ev').html(Math.floor(parseFloat(data['ev'])));
        $('#ac').html(Math.floor(parseFloat(data['ac'])));
        $('#pv').html(Math.floor(parseFloat(data['pv'])));
        $('#spi').html(data['spi']);
        $('#sv').html(Math.floor(parseFloat(data['sv'])));
        $('#cpi').html(data['cpi']);
        $('#cv').html(Math.floor(parseFloat(data['cv'])));
        $('#vac').html(Math.floor(parseFloat(data['vac'])));

        chart.series[0].points[0].update(parseFloat(data['ev']));
        chart.series[0].points[1].update(parseFloat(data['ac']));
        chart.series[0].points[2].update(parseFloat(data['pv']));

if (parseFloat(data['ev']) > parseFloat(data['ac'])) {

$('#res1').html('\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F\u0020\u043F\u043E\u0020\u0431\u044E\u0434\u0436\u0435\u0442\u0443')

} else { 

$('#res1').html('\u041F\u0435\u0440\u0435\u0440\u0430\u0441\u0445\u043E\u0434\u0020\u043F\u043E\u0020\u0431\u044E\u0434\u0436\u0435\u0442\u0443');

       };


if (parseFloat(data['ev']) > parseFloat(data['pv'])) {

$('#res2').html('\u041E\u043F\u0435\u0440\u0435\u0436\u0435\u043D\u0438\u0435\u0020\u043F\u043E\u0020\u0433\u0440\u0430\u0444\u0438\u043A\u0443')

} else { 

$('#res2').html('\u041E\u0442\u0441\u0442\u0430\u0432\u0430\u043D\u0438\u0435\u0020\u043E\u0442\u0020\u0433\u0440\u0430\u0444\u0438\u043A\u0430');

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
                categories: ['Освоенный объём (EV)', 'Факт. Затраты (АС)', 'Плановое освоение (PV)'],
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
            valueDecimals: 1,
            valuePrefix: '$',
            valueSuffix: ' USD'
            },
            plotOptions: {
		
		series: {
		stickyTracking: false

		},
                bar: {
			
			crop: true,
			dataLabels: {
			formatter:  function() {
	return '$'+ formatDollar(this.y);
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
        getData();


    });
    
// });