# frozen_string_literal: true

class Api::V1::RegistrationsController < Devise::RegistrationsController
  before_action :sign_up_params, only: [:create]

  def create
    super
    update_referral_status
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :password_confirmation, :referral_code)
  end

  def referrer
    User.find_by(referral_code: sign_up_params[:referral_code])
  end

  def referral
    Referral.find_by(referred_email: sign_up_params[:email], referred_by_id: referrer.id) if referrer.present?
  end

  def update_referral_status
    referral.accepted! if referral.present?
  end
end
