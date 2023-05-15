class ReferralMailer < ApplicationMailer
  def referral_email(referred_email, referred_by_id)
    user = User.find(referred_by_id)

    @referrer_name = user.display_name
    @referral_code = user.referral_code

    mail(to: referred_email, subject: "You've been referred to Referral Mailbox - Sign up now!")
  end
end
