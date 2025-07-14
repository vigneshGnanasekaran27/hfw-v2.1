# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_07_14_000200) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.string "title", null: false
    t.text "description"
    t.string "event_type"
    t.string "level"
    t.string "location"
    t.boolean "paid", default: false
    t.integer "amount"
    t.string "image"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "registration_deadline"
    t.time "start_time"
    t.time "end_time"
    t.integer "capacity"
    t.integer "remaining_slots"
    t.text "prerequisites"
    t.text "what_to_bring"
    t.text "schedule"
    t.text "instructor_name"
    t.text "instructor_bio"
    t.text "fitness_level_details"
    t.text "cancellation_policy"
    t.text "venue_details"
    t.text "additional_info"
    t.string "age_restriction"
  end

  create_table "payments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.string "razorpay_payment_id"
    t.string "razorpay_order_id"
    t.string "status", default: "created", null: false
    t.integer "amount", null: false
    t.string "currency", default: "INR"
    t.jsonb "meta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_payments_on_event_id"
    t.index ["razorpay_order_id"], name: "index_payments_on_razorpay_order_id"
    t.index ["razorpay_payment_id"], name: "index_payments_on_razorpay_payment_id", unique: true
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", null: false
    t.string "encrypted_password", limit: 128, null: false
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128, null: false
    t.datetime "token_expires_at"
    t.string "provider"
    t.string "uid"
    t.string "name"
    t.string "picture"
    t.integer "role", default: 0, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email"
    t.index ["remember_token"], name: "index_users_on_remember_token", unique: true
  end

  add_foreign_key "payments", "events"
  add_foreign_key "payments", "users"
end
