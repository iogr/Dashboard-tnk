set :application, "dashboard-tnk-service"
set :user, "root"
set :password, "CrociduraDsiNezumi"
set :domain, "#{user}@94.127.69.63"
set :deploy_to, "/etc/deployment/dashboard-tnk"
set :repository, 'git://github.com/path_to/example_app.git'


# unicorn if used
set :unicorn_pid, "#{deploy_to}/shared/log/unicorn.pid"
# to ensure RACK_ENV 
set :unicorn_command, "cd #{deploy_to}/current && RACK_ENV=production unicorn"
# if bundler is being used...
# set :unicorn_command, "cd #{deploy_to}/current && RACK_ENV=production bundle exec unicorn"