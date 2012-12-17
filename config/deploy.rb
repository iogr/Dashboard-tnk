require "bundler/vlad"
set :application, "dashboard-tnk"
set :domain, "94.127.69.63"
set :deploy_to, "/etc/deployment/dashboard-tnk"
set :repository, 'git@github.com:iogr/Dashboard-tnk.git'

set :unicorn_pid, "#{deploy_to}/shared/log/unicorn.pid"
set :unicorn_command, "cd #{deploy_to}/current && RACK_ENV=production bundle exec unicorn"