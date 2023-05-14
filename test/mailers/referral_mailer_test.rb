require 'test_helper'

class ReferralMailerTest < ActionMailer::TestCase
  def setup
    ActionMailer::Base.default_url_options[:host] = 'localhost:3000'
  end

  test 'referral_email' do
    referred_email = 'test@example.com'
    referred_by_id = create(:user).id

    mail = ReferralMailer.referral_email(referred_email, referred_by_id)

    assert_emails 1 do
      mail.deliver_later
    end

    assert_equal [referred_email], mail.to
    assert_equal "You've been referred to Referral Mailbox - Sign up now!", mail.subject

    assert_match User.find(referred_by_id).display_name, mail.body.encoded
    assert_match User.find(referred_by_id).referral_code, mail.body.encoded
  end
end
