class AddNameAndReferralCodeToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :referral_code, :string, null: false, unique: true
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_index :users, :referral_code
  end
end
