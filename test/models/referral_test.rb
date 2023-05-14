require 'test_helper'

class ReferralTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @referral = create(:referral)
  end

  test 'should be valid' do
    assert @referral.valid?
  end

  test 'should require referred_email' do
    @referral.referred_email = ''
    assert_not @referral.valid?
    assert_includes @referral.errors[:referred_email], "can't be blank"
  end

  test 'should have maximum length for referred_email' do
    @referral.referred_email = 'a' * 51
    assert_not @referral.valid?
    assert_includes @referral.errors[:referred_email], 'is too long (maximum is 50 characters)'
  end

  test 'should have valid format for referred_email' do
    invalid_emails = ['test@example', 'test@example.']
    invalid_emails.each do |email|
      @referral.referred_email = email
      assert_not @referral.valid?
      assert_includes @referral.errors[:referred_email], 'is invalid'
    end
  end

  test 'should have unique referred_email scoped to referred_by_id' do
    existing_referral = create(:referral)
    @referral.referred_email = existing_referral.referred_email
    @referral.referred_by = existing_referral.referred_by
    assert_not @referral.valid?
    assert_includes @referral.errors[:referred_email], 'has already been referred'
  end

  test 'should require referred_by' do
    @referral.referred_by = nil
    assert_not @referral.valid?
    assert_includes @referral.errors[:referred_by], "can't be blank"
  end

  test 'should define enum for status' do
    assert_equal({ 'pending' => 0, 'accepted' => 1 }, Referral.statuses)
  end
end
