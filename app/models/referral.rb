# frozen_string_literal: true

class Referral < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\. :a-z]+)*\.[a-z]+\z/i
  enum status: { pending: 0, accepted: 1 }

  belongs_to :referred_by, class_name: 'User'

  validates :referred_email, presence: true, length: { maximum: 50 }, format: { with: VALID_EMAIL_REGEX },
                             uniqueness: { scope: :referred_by_id, message: 'has already been referred' }
  validates :referred_by, presence: true
end
