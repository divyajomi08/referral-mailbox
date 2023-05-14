# frozen_string_literal: true

class ApplicationController < ActionController::Base
  respond_to :json
  protect_from_forgery with: :exception
  #before_action :authenticate_user!
end
