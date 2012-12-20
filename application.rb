require 'sinatra'
require 'json'
require 'tiny_tds'

db_client = TinyTds::Client.new(
	:username => 'pxrptuser', 
	:password => 'pxrptuser', 
	:host => '82.138.55.29',
	:database => 'PMDB')

before /.*/ do
  content_type :json
end

get '/db/:table' do
  result = []
  query_result = db_client.execute("SELECT * FROM #{params[:table]};")
  query_result.each{|row| result << row}
  result.to_json
end

get '/tables' do
  result = []
  query_result = db_client.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")
  query_result.each{|row| result << row}
  result.to_json
end
