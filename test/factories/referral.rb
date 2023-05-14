# frozen_string_literal: true

FactoryBot.define do
  factory :referral do
    referred_email { Faker::Internet.email }
    status { :pending }
    association :referred_by, factory: :user
  end
end
