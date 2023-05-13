# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :sign_in_params, only: [:create]

  def create
    @user = User.find_by(email: sign_in_params[:email].downcase)
    unless @user.present? && @user.valid_password?(sign_in_params[:password])
      render status: :unauthorized, json: { notice: 'Incorrect credentials, try again.' }
    end
  end

  def destroy
    @current_user = nil
  end

  protected

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end
end
