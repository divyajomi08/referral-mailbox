# frozen_string_literal: true

class AuthenticationController < ApplicationController
  def logged_in
    if user_signed_in?
      render json: { logged_in: true }
    else
      render json: { logged_in: false }
    end
  end
end
