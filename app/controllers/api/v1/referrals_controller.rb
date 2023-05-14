# frozen_string_literal: true

class Api::V1::ReferralsController < ApplicationController
  before_action :authenticate_user!

  def index
    @referrals = current_user.referrals.order(status: :desc)
  end

  def create
    @referral = current_user.referrals.new(referral_params)
    if @referral.save
      send_referral_email
      render status: :ok, json: { notice: 'Email has been send successfully' }
    else
      render status: :unprocessable_entity, json: { error: @referral.errors.full_messages.to_sentence }
    end
  end

  private

  def referral_params
    params.require(:referral).permit(:referred_email, :referral_code)
  end

  def send_referral_email
    ReferralMailer.referral_email(@referral.referred_email, current_user.id).deliver_later
  end
end
