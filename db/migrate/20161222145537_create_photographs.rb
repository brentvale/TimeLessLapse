class CreatePhotographs < ActiveRecord::Migration
  def change
    create_table :photographs do |t|
      t.integer :timelapse_hub_id
      t.integer :user_id, null: false
      t.attachment :image
      t.timestamps null: false
      t.integer :rotation, null: false, default: 0
    end
    add_index :photographs, :timelapse_hub_id
    add_index :photographs, :user_id
  end
end
