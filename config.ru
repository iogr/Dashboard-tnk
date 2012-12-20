require 'sinatra'

set :env,  :production
disable :run

require './application.rb'

run Sinatra::Application