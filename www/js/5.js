var __data__ = null;
// var cache = new ajaxCache('GET', true, 1800000);

var getData = function() {
    if (__data__ != null) {
        return __data__;
    } else {
        $.getJSON('http://94.127.69.63:8080/data/4', function(data) {
        // $.getJSON('data/4', function(data) {
            __data__ = data;
            setDataToDom(data);
            $("#cached").hide();
            return data;
        });
    }
};


// {"activities":[{"name":"Согласован доступ к газот...","planned":"2012-01-02 08:00:00 -0300","actual":"2012-01-02 08:00:00 -0300"},
//                {"name":"Заключены договоры с потр...","planned":"2012-04-02 08:00:00 -0300","actual":"2012-04-02 08:00:00 -0300"}
  var setDataToDom = function(data) {

    // monthArrayToTextArray(data['categories']);

    // for (index in data['categories']) {
    //     $('#table_header').append('<td style=\"background-color:#e0e0e0\"><b>' + data['categories'][index] + '</b></td>');
    // };

    var events = []
    var events2= []
      // {dates: [new Date(2011, 2, 31)], title: "2011 Season Opener", section: 0},
      // {dates: [new Date(2012, 1, 29)], title: "Spring Training Begins", section: 0},
      // {dates: [new Date(2012, 3, 5)], title: "Atlanta Braves @ New York Mets Game 1", section: 0},
      // {dates: [new Date(2012, 3, 7)], title: "Atlanta Braves @ New York Mets Game 2", section: 0},
      // {dates: [new Date(2012, 3, 8)], title: "Atlanta Braves @ New York Mets Game 3", section: 0}];
      // // {dates: [new Date(2012, 3, 9), new Date(2012, 3, 11)], title: "Atlanta Braves @ Houston Astros", section: 1},
    var mindate;
    var maxdate;
    var report_date = $.datepicker.parseDate('dd.mm.yy', data['report_date']);
    // report_date.setTime(Date.parse(data['report_date']));
    var pre_i = 1;
    var next_i = 1;

    $('.tabledata').remove();

    $.each(data['activities'], function(i, act) {
      // alert(Date.parse(act['planned']));
      var pl = $.datepicker.parseDate('dd.mm.yy', act['planned']);
      // pl.setTime(Date.parse(act['planned']));
      if (mindate == null) {mindate = pl};
      if (maxdate == null) {maxdate = pl};
      if (maxdate < pl) {maxdate = pl};
      if (mindate > pl) {mindate = pl};
        // alert(pl);
      if (act['actual'] == null) {
        ac = null;
      } else {
        var ac = $.datepicker.parseDate('dd.mm.yy', act['actual']);
        // ac.setTime(Date.parse(act['actual']));
        if (maxdate < ac) {maxdate = ac};
        if (mindate > ac) {mindate = ac};
        events.push({start: ac, title: '\u0424\u0430\u043A\u0442\u003A\u0020'+ act['name'], backgroundColor: 'green'});

      };

      if (pl < report_date) {
        $('#previous_list').append('<tr class="tabledata"><td style="background-color:white" width="4%">' + pre_i++ + '</td>' +
                                        '<td>' + act['name'] + '</td>' +
                                        '<td><a href="javascript: goToCalendar('+pl.getFullYear()+','+pl.getMonth()+','+pl.getDay()+');$(window).scrollTop(0);">' + $.datepicker.formatDate('dd.mm.yy', pl) + '</a></td>' +
                                        '<td>' + (ac == null ? "" : '<a href="javascript: goToCalendar('+ac.getFullYear()+','+ac.getMonth()+','+ac.getDay()+');$(window).scrollTop(0);">'+$.datepicker.formatDate('dd.mm.yy', ac)+'</a>') + '</td></tr>');
      } else {
        $('#next_list').append('<tr class="tabledata"><td style="background-color:white" width="4%">' + next_i++ + '</td>' +
                                        '<td>' + act['name'] + '</td>' +
                                        '<td><a href="javascript: goToCalendar('+pl.getFullYear()+','+pl.getMonth()+','+pl.getDay()+');$(window).scrollTop(0);">' + $.datepicker.formatDate('dd.mm.yy', pl) + '</a></td>' +
                                        '<td>' + (ac == null ? "" : '<a href="javascript: goToCalendar('+ac.getFullYear()+','+ac.getMonth()+','+ac.getDay()+';$(window).scrollTop(0);)">'+$.datepicker.formatDate('dd.mm.yy', ac)+'</a>') + '</td></tr>');
      };


      // events.push({dates: [pl], title: '\u041F\u043B\u0430\u043D\u003A\u0020'+act['name'], section: 2, description: '\u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E\u0020\u043D\u0430\u003A\u0020'+$.datepicker.formatDate('dd.mm.yy', pl)});
      events.push({start: pl, title: '\u041F\u043B\u0430\u043D\u003A\u0020'+ act['name']});
      
    });


    // alert('cal');

    $('#calendar').html('');
    
    $('#calendar').fullCalendar({
	firstDay:1,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      events: events
    });

};

var goToCalendar = function(y,m,d) {
  $('#calendar').fullCalendar('gotoDate', y, m, d);
};

$(document).ready(function() {
  window.setInterval(function(){if (__data__ == null) {$("#cached").show();}}, 4000);
  setDataToDom({"activities":[{"name":"Согласован доступ к газотранспортной системе ОАО «Газпром»","planned":"02.01.12","actual":"02.01.12"},{"name":"Заключены договоры с потребителями на реализацию продукции","planned":"02.04.12","actual":"02.04.12"},{"name":"Получена гарантия ценности газа","planned":"02.07.12","actual":"26.07.12"},{"name":"План управления программой утвержден Исполнительным директором Программы","planned":"02.04.12","actual":"02.04.12"},{"name":"Выпуск приказов о назначении Руководителей проектов","planned":"02.04.12","actual":"02.04.12"},{"name":"Ознакомление Руководителей проектов с Планом управления проектами, Согласование Руководителями проектов Планов исполнени","planned":"13.06.12","actual":"20.06.12"},{"name":"ПИПы утверждены Исполнительным директором программы","planned":"18.06.12","actual":"05.07.12"},{"name":"Определение потребностей в персонале на 2012 год","planned":"10.01.12","actual":"10.01.12"},{"name":"Формирование графика набора персонала на 2012 год","planned":"09.02.12","actual":"09.02.12"},{"name":"Утверждение графика по набору персонала на 2012 год","planned":"10.05.12","actual":"07.08.12"},{"name":"График по набору персонала на 2012 год утвержден","planned":"16.05.12","actual":"13.08.12"},{"name":"Набор персонала для работ программы","planned":"17.05.12","actual":"14.08.12"},{"name":"Принятие решения о закрытии программы","planned":"05.08.15","actual":null},{"name":"Закрытие договорных обязательств по программе","planned":"12.08.15","actual":null},{"name":"Защита Итогового отчета по программе","planned":"19.08.15","actual":null},{"name":"Сдача Архива программы","planned":"26.08.15","actual":null},{"name":"Регистрация закрытия программы","planned":"02.09.15","actual":null},{"name":"Проведение установочного совещания по программе","planned":"25.06.12","actual":"12.07.12"},{"name":"Проектная документация получила положительное заключение ГГЭ","planned":"03.12.12","actual":null},{"name":"Получены все разрешения на строительство 1 очереди","planned":"31.07.13","actual":null},{"name":"Подписаны все договора на изготовление оборудования","planned":"24.02.14","actual":null},{"name":"Завершена разработка РД","planned":"11.03.13","actual":null},{"name":"Подписаны все договора на СМР","planned":"04.03.13","actual":null},{"name":"Завершена поставка оборудования","planned":"14.01.14","actual":null},{"name":"Завершены все СМР","planned":"22.09.14","actual":null},{"name":"Запуск 1-ой очереди программы","planned":"30.10.14","actual":null},{"name":"Пуск первого газа","planned":"30.10.14","actual":null},{"name":"Передана в эксплуатацию 1-ая очередь программы","planned":"24.06.15","actual":null},{"name":"Подготовка ФМ на этап «Реализация» для ИК ЦДО","planned":"07.03.12","actual":"07.03.12"},{"name":"Защита ФМ на ИК ЦДО ","planned":"14.03.12","actual":"14.03.12"},{"name":"Утвержден ФМ на уровне ИК ЦДО","planned":"15.03.12","actual":"30.05.12"},{"name":"Подготовка ФМ на этап «Реализация» для ИК БНРиД","planned":"16.05.12","actual":"26.07.12"},{"name":"Защита ФМ на ИК БНРиД","planned":"30.05.12","actual":"09.08.12"},{"name":"Утвержден ФМ на уровене ИК БН РиД","planned":"31.05.12","actual":"09.08.12"},{"name":"Подготовка ФМ на этап «Реализация» для СД","planned":"22.06.12","actual":"10.08.12"},{"name":"Защита ФМ на уровне СД","planned":"12.07.12","actual":"30.08.12"},{"name":"Утвержден ФМ на уровне СД","planned":"13.07.12","actual":"30.08.12"},{"name":"Данные для ежеквартальных отчетов предоставленны 1 кв 2012","planned":"02.04.12","actual":"02.04.12"},{"name":"Ежеквартальная отчетность сформированна  1 кв 2012","planned":"13.04.12","actual":"13.04.12"},{"name":"Данные для ежеквартальных отчетов предоставленны 2 кв 2012","planned":"02.07.12","actual":"26.07.12"},{"name":"Ежеквартальная отчетность сформированна  2 кв 2012","planned":"13.07.12","actual":"08.08.12"},{"name":"Данные для ежеквартальных отчетов предоставленны 3 кв 2012","planned":"01.10.12","actual":null},{"name":"Ежеквартальная отчетность сформированна  3 кв 2012","planned":"12.10.12","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны 4 кв 2012","planned":"10.01.13","actual":null},{"name":"Ежеквартальная отчетность сформированна 4 кв 2012","planned":"14.01.13","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны  1 кв 2013","planned":"01.04.13","actual":null},{"name":"Ежеквартальная отчетность сформированна  1 кв 2013","planned":"12.04.13","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны  2 кв 2013","planned":"01.07.13","actual":null},{"name":"Ежеквартальная отчетность сформированна   2 кв 2013","planned":"12.07.13","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны  3 кв 2013","planned":"01.10.13","actual":null},{"name":"Ежеквартальная отчетность сформированна   3 кв 2013","planned":"14.10.13","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны  4 кв 2013","planned":"01.01.14","actual":null},{"name":"Ежеквартальная отчетность сформированна  4 кв 2013","planned":"14.01.14","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны  1 кв 2014","planned":"01.04.14","actual":null},{"name":"Ежеквартальная отчетность сформированна  1 кв 2014","planned":"14.04.14","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны 2 кв 2014","planned":"01.07.14","actual":null},{"name":"Ежеквартальная отчетность сформированна  2 кв 2014","planned":"14.07.14","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны 3 кв 2014","planned":"01.10.14","actual":null},{"name":"Ежеквартальная отчетность сформированна 3  кв 2014","planned":"14.10.14","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны 4 кв 2014","planned":"01.01.15","actual":null},{"name":"Ежеквартальная отчетность сформированна  4 кв 2014","planned":"14.01.15","actual":null},{"name":"Данные для ежеквартальных отчетов предоставленны 1 кв 2015","planned":"01.04.15","actual":null},{"name":"Ежеквартальная отчетность сформированна  1 кв 2015","planned":"14.04.15","actual":null},{"name":"Определение потребностей в персонале на 2013 год","planned":"10.01.13","actual":null},{"name":"Формирование графика набора персонала на 2013 год","planned":"11.02.13","actual":null},{"name":"Утверждение графика по набору персонала на 2013 год","planned":"13.05.13","actual":null},{"name":"График по набору персонала на 2013 год утвержден","planned":"17.05.13","actual":null},{"name":"Набор персонала для работ программы","planned":"20.05.13","actual":null},{"name":"Определение потребностей в персонале на 2014 год","planned":"10.01.14","actual":null},{"name":"Формирование графика набора персонала на 2014 год","planned":"11.02.14","actual":null},{"name":"Утверждение графика по набору персонала на 2014 год","planned":"13.05.14","actual":null},{"name":"График по набору персонала на 2014 год утвержден","planned":"19.05.14","actual":null},{"name":"Набор персонала для работ программы","planned":"20.05.14","actual":null},{"name":"Определение потребностей в персонале на 2015 год","planned":"12.01.15","actual":null},{"name":"Формирование графика набора персонала на 2015 год","planned":"11.02.15","actual":null},{"name":"Утверждение графика по набору персонала на 2015 год","planned":"13.05.15","actual":null},{"name":"График по набору персонала на 2015 год утвержден","planned":"19.05.15","actual":null},{"name":"Набор персонала для работ программы","planned":"20.05.15","actual":null},{"name":"Укомплектован штат для выполнения программы","planned":"02.01.12","actual":"02.01.12"}],"report_date":"14.09.12"});
  getData();
});