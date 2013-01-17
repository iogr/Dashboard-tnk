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
                    text: 'Значение',
                    align: 'high'
                }

            },
            tooltip: {
            valueDecimals: 1,
            valuePrefix: '$',
            valueSuffix: ' USD'
            },
            plotOptions: {
		series: {
		
		},
                bar: {
			crop: true,
			dataLabels: {
			style: {
                        fontWeight:'bold',
			fontSize:15,
                    },
			valueDecimals: 1,
			crop: false,
			x:-150,
			y:-17,	
			
			zIndex:50,
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
              name: 'значение показателя',
                data: [0, 0, 0]
            }]
        });
        getData();
    });
    
// });