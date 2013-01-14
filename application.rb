# encoding: utf-8
require 'sinatra'
require 'json'
require 'tiny_tds'

set :public_folder, File.dirname(__FILE__) + '/www'
set :eps_id, 17730

db_client = TinyTds::Client.new(
	:username => 'pxrptuser', 
	:password => 'pxrptuser', 
	:host => '82.138.55.29',
	:database => 'PMDB',
  :encoding => 'CP1251')

before /.*/ do
  content_type :json, 'charset' => 'utf-8' 
  headers("Access-Control-Allow-Origin" => "*")
end

get '/data/index' do
  result = {}
  # Полное наименование программы - eps_name
  # Исполнительный директор программы - eps_exec_dir
  # Директор программы - eps_dir
  # Дата начала - start_date
  # Дата окончания - end_date
  # Отчёт подготовил - reporter
  # Отчётный период -report_period
  # Значение на графике - gauge_percent
  # Прогнозная дата окончания программы - est_end_date
  # Сроки - time_limits
  # Стоимость - cost
  # Риски - risks
  eps_query_result = db_client.execute("SELECT sumcostpercentcomplete as gauge_percent,
                                               name as eps_name,
                                               convert(varchar,sumbaselinestartdate, 4) as start_date,
                                               convert(varchar, sumbaselinefinishdate, 4) as end_date,
                                               convert(varchar, finishdate, 4) as est_end_date,
                                               (EPS.SumPlannedTotalCost - EPS.SumActualTotalCost) as cost

                                        FROM EPS WHERE objectid = #{options.eps_id};")
  result.merge!(eps_query_result.first)
  eps_query_result.do

  result['risks'] = "3 критичных риска"
  result['time_limits'] = "Отсутствуют базовые показатели, т.к. базовый план не утвержден"
  result['report_date'] = "15.05.12"
  result['eps_exec_dir'] = "А. М. Слепцов"
  result['eps_dir'] = "В. А. Благовещенский"

  

  result.to_json
end

get '/data/2' do
  result = {}
  # ПСТ, ПСР, ФСТ, ФСР


  query_result = db_client.execute("SELECT pn.notebooktopicname as value_name,
                                           pn.rawtextnote as raw_values
                                    FROM PROJECTNOTE as pn JOIN PROJECT as p
                                    ON pn.projectobjectid = p.objectid
                                    WHERE p.parentepsobjectid = #{options.eps_id};")
  # result['1'] = query_result.as_array

  query_result.each do |row|
    # next unless ['ПСТ', 'ПСР', 'ФСТ', 'ФСР'].include? row['value_name'].to_s
    result[row['value_name']] = []
    categories = []
    raw_values = row['raw_values']
    while raw_value = raw_values.slice!(/\d{6} \S+/)
      date, value = raw_value.split
      result[row['value_name']] << value
      categories << date
    end
    result['categories'] = categories unless result['categories']
  end

  # result['categories'].sort!

  query_result.do

  result.to_json
end

get '/data/3' do
  result = {}
  # Освоенный объём (EV) - ev
  # Факт. Затраты (АС) - ac
  # Плановое освоение (PV) - pv
  # Индекс выполнения сроков (SPI) - spi
  # Отклонение по срокам (SV) - sv
  # Индекс выполнения стоимости (CPI) - cpi
  # Отклонение по стоимости (CV) - cv
  # Стоимость до завершения (VAC) - vac


  eps_query_result = db_client.execute("SELECT LTRIM(Str(sumearnedvaluebycost, 25, 5)) as ev,
                                               LTRIM(Str(sumactualvaluebycost, 25, 5)) as ac,
                                               LTRIM(Str(sumplannedvaluebycost, 25, 5)) as pv,
                                               LTRIM(Str(sumscheduleperfindexbycost, 25, 5)) as spi,
                                               LTRIM(Str(sumschedulevariancebycost, 25, 5)) as sv,
                                               LTRIM(Str(sumcostperfindexbycost, 25, 5)) as cpi,
                                               LTRIM(Str(sumcostvariancebycost, 25, 5)) as cv,
                                               LTRIM(Str(sumatcompletiontotalcostvar, 25, 5)) as vac
                                        FROM EPS WHERE objectid = #{options.eps_id};")
  result.merge!(eps_query_result.first)
  eps_query_result.do

  result.to_json
end

get '/db/:table' do
  result = []
  query_result = db_client.execute("SELECT * FROM #{params[:table]};")
  query_result.each{|row| result << row}
  query_result.do
  result.to_json
end

get '/tables' do
  result = []
  query_result = db_client.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")
  query_result.each{|row| result << row}
  query_result.do
  result.to_json
end
