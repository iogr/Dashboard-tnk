begin
  require 'vlad'
  Vlad.load :scm => :git, :app => :unicorn, :web => :nginx
rescue LoadError
  # do nothing
end

task "vlad:deploy" => %w[ vlad:update vlad:bundle:install ]