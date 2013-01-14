//swipe-related



//getting data from service
var __data__ = null;

var getData = function() {
    if (__data__ != null) {
        return __data__;
    } else {
        // $.getJSON('http://94.127.69.63:8080/data/index', function(data) {
        $.getJSON('data/index', function(data) {
            __data__ = data;
            setDataToDom(data);
            return data;
        });
    }
};

var setDataToDom = function(data) {
    // $('#eps_name').html(data['name']);
    // var d = new Date();
    // d.setTime(Date.parse(data['sumbaselinestartdate']))
    // $('#eps_sumbaselinestartdate').html($.datepicker.formatDate('dd.mm.yy', d));
    // d.setTime(Date.parse(data['sumbaselinefinishdate']));
    // $('#eps_sumbaselinefinishdate').html($.datepicker.formatDate('dd.mm.yy', d));

    $('#eps_name').html(data['eps_name']);
    $('#eps_exec_dir').html(data['eps_exec_dir']);
    $('#eps_dir').html(data['eps_dir']);
    $('#start_date').html(data['start_date']);
    $('#end_date').html(data['end_date']);
    $('#reporter').html(data['reporter']);
    $('#report_date').html(data['report_date']);
    $('#est_end_date').html(data['est_end_date']);
    $('#time_limits').html(data['time_limits']);
    $('#cost').html(data['cost']);
    $('#risks').html(data['risks']);

    plan_fact_gauge.series[0].points[0].update(parseFloat(data['gauge_percent']));

};

var plan_fact_gauge;

$(document).ready(function() {
    plan_fact_gauge = new Highcharts.Chart({

        chart: {
            renderTo: 'plan_fact_gauge',
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Шкала факт / план'
        },

plotOptions: {
gauge: {
                dial: {

                    backgroundColor: '#f46c5e',
                    borderColor: '#a5b4b9',
                    borderWidth: 1,
                    baseWidth: 13,
                    topWidth: 1,
                        baseLength: '20%', // of radius
                        rearLength: '0%'
                }
            
        },


            series: {
                dataLabels: {
                    enabled: false,
borderRadius:0,
padding:10,
x:-100,
                    formatter: function() {
                        return "Факт "+this.y +'%';
                    }
                }
            }
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFFFFF',
                borderWidth: 0,
                outerRadius: '108%',
                innerRadius: '9%'
            }]
        },


        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 1,
            tickPosition: 'inside',
            tickLength: 34,
            tickColor: '#666',
            labels: {
                step: 2,
                style: {fontSize: '15'},
            distance: -87,


         formatter: function() {
                        return this.value +'%';
                    }

            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 20,
                color: '#dde5f2', // green
            innerRadius: '67%',
 label: {
                    style: {
                        color: 'blue',
                        fontWeight: 'bold'
                    }
                } 
                
            }, {
                from: 20,
                to: 30,
                color: '#bacce4', // yellow
                innerRadius: '67%'
        }, {
                from: 30,
                to: 40,
                color: '#bacce4', // red
innerRadius: '67%'
            } , {
                from: 40,
                to: 50,
                color: '#96b3d5', // yellow
innerRadius: '67%'
            }, {
                from: 50,
                to: 60,
                color: '#96b3d5', // yellow
innerRadius: '67%'

            }, {
                from: 60,
                to: 70,
                color: '#5a8eca', // yellow
innerRadius: '67%'
            }, {
                from: 70,
                to: 80,
                color: '#5a8eca', // yellow
innerRadius: '67%'
            }, {
                from: 80,
                to: 100,
                color: '#376193', // yellow
innerRadius: '67%'
}]        
        },

        series: [{
            name: 'Данные',
            data: [0],
            tooltip: {
                valueSuffix: 'факт/план'
            }
        }]

    });

    getData();
});
