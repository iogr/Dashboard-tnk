require "bundler/vlad"
set :application, "dashboard-tnk-service"
set :domain, "94.127.69.63"
set :deploy_to, "/etc/deployment/dashboard-tnk"
set :repository, 'https://github.com/iogr/Dashboard-tnk/docs.git'


# unicorn if used
set :unicorn_pid, "#{deploy_to}/shared/log/unicorn.pid"
# to ensure RACK_ENV 
set :unicorn_command, "cd #{deploy_to}/current && RACK_ENV=production unicorn"
# if bundler is being used...
# set :unicorn_command, "cd #{deploy_to}/current && RACK_ENV=production bundle exec unicorn"