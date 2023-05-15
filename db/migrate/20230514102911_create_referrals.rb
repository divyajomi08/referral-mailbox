class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.references :referred_by, foreign_key: { to_table: :users }, null: false
      t.string :referred_email, null: false
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
