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
        $('#ev').html(data['ev']);
        $('#ac').html(data['ac']);
        $('#pv').html(data['pv']);
        $('#spi').html(data['spi']);
        $('#sv').html(data['sv']);
        $('#cpi').html(data['cpi']);
        $('#cv').html(data['cv']);
        $('#vac').html(data['vac']);

        chart.series[0].points[0].update(parseFloat(data['ev']));
        chart.series[0].points[1].update(parseFloat(data['ac']));
        chart.series[0].points[2].update(parseFloat(data['pv']));

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