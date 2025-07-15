class ApplicationController < ActionController::Base
  include Clearance::Controller
 skip_forgery_protection
end