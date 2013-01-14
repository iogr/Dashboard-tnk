# encoding: utf-8
require 'sinatra'
require 'json'
require 'tiny_tds'

set :public_folder, File.dirname(__FILE__) + '/www'

set :eps_id, 17730

set :risk_red_score, 50
set :risk_yellow_score, 10

set :cost_red_score, -1000000
set :cost_yellow_score, 0

set :timeline_red_score, 24
set :timeline_yellow_score, 6


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
  eps_query_result = db_client.execute("SELECT eps.sumcostpercentcomplete as gauge_percent_actual,
                                               eps.sumcostpercentofplanned as gauge_percent_planned,
                                               eps.name as eps_name,
                                               convert(varchar, eps.sumbaselinestartdate, 4) as start_date,
                                               convert(varchar, eps.sumbaselinefinishdate, 4) as end_date,
                                               convert(varchar, eps.finishdate, 4) as est_end_date,
                                               (EPS.SumPlannedTotalCost - EPS.SumActualTotalCost) as cost,
                                               p.datadate as report_date

                                        FROM eps JOIN PROJECT as p ON p.parentepsobjectid = eps.objectid
                                        WHERE eps.objectid = #{options.eps_id};")
  result.merge!(eps_query_result.first)
  eps_query_result.do

  query_result = db_client.execute("SELECT r.score
                                    FROM RISK as r
                                      JOIN PROJECT as p ON r.projectobjectid = p.objectid
                                      JOIN EPS as eps ON p.parentepsobjectid = eps.objectid
                                    WHERE eps.objectid = #{options.eps_id} 
                                      OR eps.parentobjectid = #{options.eps_id};")
  risks = []
  query_result.each{|row| risks << row['score'].to_i}
  query_result.do

  red_count = risks.count{|x| x >= options.risk_red_score}
  yellow_count = risks.count{|x| x >= options.risk_yellow_score}
  if red_count == 0
    result['risks_text'] = "Количество красных рисков: #{red_count}"
    result['risks_alert'] = "red"
  elsif not yellow_count == 0
    result['risks_text'] = "Количество жёлтых рисков: #{yellow_count}"
    result['risks_alert'] = "yellow"
  else
    result['risks_text'] = ""
    result['risks_alert'] = "green"
  end

  cost = result['cost'].to_f
  if (cost < options.cost_red_score)
    result['cost_alert'] = "red"
  elsif (cost < options.cost_yellow_score)
    result['cost_alert'] = "yellow"
  else
    result['cost_alert'] = "green"
  end

  if (cost < 0)
    result['cost_text'] = "Отставание по графику составляет #{cost.abs} руб."
  else
    result['cost_text'] = "Опережение по графику составляет #{cost} руб."
  end

  query_result = db_client.execute("SELECT max(datediff(mm, a.BaselineStartDate, a.ActualStartDate)) as spread
                                    FROM ACTIVITY as a JOIN PROJECT as p
                                    ON a.projectobjectid = p.objectid
                                    WHERE p.parentepsobjectid = #{options.eps_id};")

  timespread = query_result.first['spread'].to_i
  result['timelimits_text'] = "Максимальное отставание по ключевым КТ соответвствует #{timespread} месяцев."
  result['timelimits_alert'] = "yellow"
  query_result.do
  
  if (timespread > options.timeline_red_score)
    result['timelimits_alert'] = "red"
  elsif (timespread > options.timeline_yellow_score)
    result['timelimits_alert'] = "yellow"
  else
    result['timelimits_alert'] = "green"
  end

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

get '/data/4' do
  result = {}
  query_result = db_client.execute("SELECT name, 
                                           sumcostpercentofplanned as planned,
                                           sumcostpercentcomplete as actual
                                    FROM EPS
                                    WHERE parentobjectid = #{options.eps_id};")
  result['works'] = []
  query_result.each{|row| result['works'] << row}
  query_result.do

  query_result = db_client.execute("SELECT r.name, 
                                           rr.name as response,
                                           res.name as responsible
                                    FROM RISK as r 
                                      LEFT JOIN RISKRESPONSEPLAN as rr ON rr.riskobjectid = r.objectid 
                                      LEFT JOIN RESOURCES as res ON r.resourceobjectid = res.objectid
                                      JOIN PROJECT as p ON r.projectobjectid = p.objectid
                                      JOIN EPS as eps ON p.parentepsobjectid = eps.objectid
                                    WHERE eps.objectid = #{options.eps_id} 
                                      OR eps.parentobjectid = #{options.eps_id};")
  result['risks'] = []
  query_result.each{|row| result['risks'] << row}
  query_result.do

  # d.documentcategoryname = “Запрос на изменение”

  query_result = db_client.execute("SELECT d.title, 
                                           d.revisiondate as revision_date,
                                           dsc.name as status
                                    FROM DOCUMENT as d 
                                      JOIN DOCUMENTSTATUSCODE as dsc ON d.documentstatuscodeobjectid = dsc.objectid 
                                      JOIN PROJECT as p ON d.projectobjectid = p.objectid
                                      JOIN EPS as eps ON p.parentepsobjectid = eps.objectid
                                    WHERE eps.objectid = #{options.eps_id} 
                                      OR eps.parentobjectid = #{options.eps_id}
                                      ;")
  result['documents'] = []
  query_result.each{|row| result['documents'] << row}
  query_result.do



  result.to_json
end

get '/data/5' do
  result = {}

  query_result = db_client.execute("SELECT a.name,
                                           a.BaselineStartDate as planned,
                                           a.ActualStartDate as actual
                                    FROM ACTIVITY as a JOIN PROJECT as p
                                    ON a.projectobjectid = p.objectid
                                    WHERE p.parentepsobjectid = #{options.eps_id};")
  result['activities'] =[]
  query_result.each do |row|
    # # next unless ['ПСТ', 'ПСР', 'ФСТ', 'ФСР'].include? row['value_name'].to_s
    # result[row['value_name']] = []
    # categories = []
    # raw_values = row['raw_values']
    # while raw_value = raw_values.slice!(/\d{6} \S+/)
    #   date, value = raw_value.split
    #   result[row['value_name']] << value
    #   categories << date
    # end
    # result['categories'] = categories unless result['categories']
    result['activities'] << row
  end

  # result['categories'].sort!

  query_result.do

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
