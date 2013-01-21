# define paths and filenames
deploy_to = "/etc/deployment/dashboard-tnk"
working_directory = "#{deploy_to}/current"
pid_file = "#{deploy_to}/shared/pids/unicorn.pid"
socket_file= "#{deploy_to}/shared/unicorn.sock"
log_file = "#{deploy_to}/shared/log/unicorn.log"
err_log = "#{deploy_to}/shared/log/unicorn_error.log"
old_pid = pid_file + '.oldbin'

timeout 30
worker_processes 3 # increase or decrease
listen socket_file, :backlog => 1024
listen 8080

pid pid_file
stderr_path err_log
stdout_path log_file

# # make forks faster
# preload_app true

# # make sure that Bundler finds the Gemfile
# before_exec do |server|
#   ENV['BUNDLE_GEMFILE'] = File.expand_path('../Gemfile', File.dirname(__FILE__))
# end
