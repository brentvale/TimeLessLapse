# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170605203816) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "photographs", force: :cascade do |t|
    t.integer  "timelapse_hub_id"
    t.integer  "user_id",                        null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "rotation",           default: 0, null: false
    t.string   "latitude"
    t.string   "longitude"
    t.string   "altitude"
    t.string   "image_direction"
  end

  add_index "photographs", ["timelapse_hub_id"], name: "index_photographs_on_timelapse_hub_id", using: :btree
  add_index "photographs", ["user_id"], name: "index_photographs_on_user_id", using: :btree

  create_table "timelapse_hubs", force: :cascade do |t|
    t.string   "latitude",   limit: 15, null: false
    t.string   "longitude",  limit: 15, null: false
    t.string   "hub_name"
    t.integer  "user_id",               null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "timelapse_hubs", ["user_id"], name: "index_timelapse_hubs_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
