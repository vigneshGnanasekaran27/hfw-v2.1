class AddDetailsToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :registration_deadline, :date
    add_column :events, :start_time, :time
    add_column :events, :end_time, :time
    add_column :events, :capacity, :integer
    add_column :events, :remaining_slots, :integer
    add_column :events, :prerequisites, :text
    add_column :events, :what_to_bring, :text
    add_column :events, :schedule, :text
    add_column :events, :instructor_name, :text
    add_column :events, :instructor_bio, :text
    add_column :events, :fitness_level_details, :text
    add_column :events, :cancellation_policy, :text
    add_column :events, :venue_details, :text
    add_column :events, :additional_info, :text
    add_column :events, :age_restriction, :string
  end
end
