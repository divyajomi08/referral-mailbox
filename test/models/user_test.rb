require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = build(:user)
  end

  test 'validates presence and uniqueness of referral_code' do
    new_user = create(:user)
    new_user.referral_code = nil
    assert_not new_user.valid?

    create(:user, referral_code: new_user.referral_code)
    assert_not new_user.valid?
  end

  test 'generates a referral_code before validation on create' do
    @user.referral_code = nil
    assert_nil @user.referral_code

    @user.valid?
    assert_not_nil @user.referral_code
  end

  test "returns the user's full name" do
    @user.first_name = 'John'
    @user.last_name = 'Doe'
    assert_equal 'John Doe', @user.name
  end

  test "returns the user's display name" do
    @user.first_name = 'John'
    @user.last_name = 'Doe'
    assert_equal 'John Doe', @user.display_name

    @user.first_name = nil
    @user.last_name = nil
    @user.email = 'john.doe@example.com'
    assert_equal 'john.doe@example.com', @user.display_name
  end
end
