class AddUniqueConstraintToReferrals < ActiveRecord::Migration[7.0]
  def change
    add_index :referrals, [:referred_by_id, :referred_email], unique: true, name: 'index_unique_referrals'
  end
end
