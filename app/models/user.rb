class User < ApplicationRecord
  has_many :referrals, foreign_key: :referred_by_id

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :referral_code, presence: true, uniqueness: true

  before_validation :generate_referral_code, on: :create

  def name
    [first_name, last_name].join(' ').strip
  end

  def display_name
    name || email
  end

  private

  def generate_referral_code
    loop do
      self.referral_code = SecureRandom.alphanumeric(8)
      break unless User.exists?(referral_code: referral_code)
    end
  end
end
