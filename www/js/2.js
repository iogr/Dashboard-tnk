//getting data from service
var __data__ = null;

var getData = function() {
    if (__data__ != null) {
        return __data__;
    } else {
        $.getJSON('http://94.127.69.63:8080/data/2', function(data) {
        // $.getJSON('data/2', function(data) {
            __data__ = data;
            setDataToDom(data);
            $("#cached").hide();
            return data;
        });
    }
};

var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var strArrayToFloatArray = function(arr){
    for (index in arr) {
        arr[index] = parseFloat(arr[index])
    };
};

var monthArrayToTextArray = function(arr){
    for (index in arr) {
        monthNumber = arr[index].slice(0,2);
        if (monthNumber[0] == "0") {monthNumber = monthNumber.slice(1,2);};
        month = months[parseInt(monthNumber) - 1];
        year = arr[index].slice(2,6);
        arr[index] = month + ' ' + year;
    };
};

var setDataToDom = function(data) {
// {"ФСТ":["5","12","24.3","27.7"],
// "categories":["032012","042012","052012","062012"],
// "ФСР":["7.6","12.3","18","31.4"],
// "ПСТ":["9.6","14.7","20.3","25.1"],
// "ПСР":["12.8","16.7","17.3","19.1"],

    strArrayToFloatArray(data['ФСР']);
    strArrayToFloatArray(data['ФСТ']);
    strArrayToFloatArray(data['ПСТ']);
    strArrayToFloatArray(data['ПСР']);

    monthArrayToTextArray(data['categories']);

    $('.tabledata').remove();

    for (index in data['categories']) {
        $('#table_header').append('<td class="tabledata" style=\"background-color:#e0e0e0\"><b>' + data['categories'][index] + '</b></td>');
    };
    
    for (index in data['ФСР']) {
        $('#table_fsr_row').append('<td class="tabledata">' + data['ФСР'][index] + '%</td>');
    };

    for (index in data['ФСТ']) {
        $('#table_fst_row').append('<td class="tabledata">' + data['ФСТ'][index] + '%</td>');
    };

    for (index in data['ПСТ']) {
        $('#table_pst_row').append('<td class="tabledata">' + data['ПСТ'][index] + '%</td>');
    };

    for (index in data['ПСР']) {
        $('#table_psr_row').append('<td class="tabledata">' + data['ПСР'][index] + '%</td>');
    };


    chart = new Highcharts.Chart({
            chart: {
                renderTo: 'graph_risk',
                type: 'line',
                marginRight: 170,
                marginBottom: 50
            },
            title: {
                text: ' ',
                x: -20 //center
            },
            subtitle: {
                text: ' ',
                x: -20
            },
            xAxis: {
                categories: data['categories']
            },
            yAxis: {
                title: {
                    text: ' '
                },
  labels: {
                    formatter: function() {
                        return this.value +'%'
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
    shared: true,
    crosshairs: true,
         useHTML: true,
            headerFormat: '<center>{point.key}</small><table>',
            pointFormat: '<tr style="border-bottom: solid 1px gray;"><td><br>{series.name}: </td>' +
            '<td style="text-align: right"><br><br><br><b>{point.y} %</b></td></tr>',
            footerFormat: '</table>',
            },
            plotOptions: {
                line: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                },

            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 10,
                y: 45,
    
      itemMarginTop: 7,
            itemMarginBottom: 7,
                borderWidth: 0,
    symbolWidth: 20,
    symbolPadding: 10,
    itemStyle: {
    fontSize:'15px'
                  } 
            },
            series: [{
    
                name: 'Фактическое<br> отклонение<br> по стоимости',
                data: data['ФСТ']
            }, {
    color: '#db241e',
                name: 'Фактическое<br> отклонение<br> по срокам',
                data: data['ФСР']
            }, {
    lineWidth: 3,
    type: 'spline',
    color: '#4572a7',
                name: 'Прогнозируемое<br> отклонение<br> по стоимости',
                data: data['ПСТ'],
    marker: {
                    enabled: false
                },
    dashStyle: 'Dash'
            }, {
    lineWidth: 3,
    type: 'spline',
    color: '#db241e',
                name: 'Прогнозируемое<br> отклонение<br> по срокам',
                data: data['ПСР'],
    marker: {
                    enabled: false
                },
    dashStyle: 'Dash'
            }]
        });

};


$(document).swipe({
swipeLeft: function () {
window.location = "3.html";
$(next).show();
        },

swipeRight: function () {
window.location = "1.html";
$(previous).show();
        },
fingers:1,
});

var chart;
$(function () {
    $(document).ready(function() {

        window.setInterval(function(){if (__data__ == null) {$("#cached").show();}}, 4000);
        setDataToDom({"ФСТ":["5","12","24.3","27.7","30.1","32.6"],"categories":["032012","042012","052012","062012","072012","082012","092012"],"ФСР":["7.6","12.3","18","20.1","23.5","26"],"ПСТ":["9.6","14.7","20.3","25.4","26.9","28.5","31.4"],"ПСР":["12.8","16.7","17.3","21.1","24.7","28","32.6"],"Логотип":[]});

        getData();
    });
    
});