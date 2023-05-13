# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  before_action :sign_up_params

  def create
    @user = User.new(sign_up_params)
    if @user.save
      render status: :ok, json: { user: @user, notice: 'User was successfully created!' }
    else
      render status: :unprocessable_entity, json: {
        error: @user.errors.full_messages.to_sentence
      }
    end
  end

  protected

  def sign_up_params
    params.require(:user).permit( :email, :password)
  end
end
