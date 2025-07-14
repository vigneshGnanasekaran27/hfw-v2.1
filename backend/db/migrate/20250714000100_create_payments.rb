class CreatePayments < ActiveRecord::Migration[7.1]
  def change
    create_table :payments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.string :razorpay_payment_id
      t.string :razorpay_order_id
      t.string :status, null: false, default: "created"
      t.integer :amount, null: false
      t.string :currency, default: "INR"
      t.jsonb :meta
      t.timestamps
    end
    add_index :payments, :razorpay_payment_id, unique: true
    add_index :payments, :razorpay_order_id
  end
end
