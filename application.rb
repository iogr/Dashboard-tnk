# encoding: utf-8
require 'sinatra'
require 'json'
require 'tiny_tds'

set :public_folder, File.dirname(__FILE__) + '/www'
set :eps_id, 3667

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

get '/data/3' do
  result = {}
  # Освоенный объём (EV) - ev
  # Факт. Затраты (АС) - ac
  # Плановое освоение (PV) - pv
  # Индекс выполнения сроков (SPI) - spi
  # Отклонение по срокам (SV) - sv
  # Индекс выполнения стоимости (CPI) - cpi
  # Отклонение по стоимости (CV) - cv
  # Длительность до заверш. (VACt) - vact
  # Стоимость до завершения (VAC) - vac


  eps_query_result = db_client.execute("SELECT sumcostpercentcomplete as gauge_percent FROM EPS WHERE objectid = #{options.eps_id};")
  result = eps_query_result.first
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
