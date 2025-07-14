class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description
      t.string :event_type
      t.string :level
      t.string :location
      t.boolean :paid, default: false
      t.integer :amount
      t.string :image
      t.date :date
      t.timestamps
    end
  end
end
