class CreateTimelapseHubs < ActiveRecord::Migration
  def change
    create_table :timelapse_hubs do |t|
      t.string :latitude, null: false, limit: 15
      t.string :longitude, null: false, limit: 15
      t.string :hub_name
      t.integer :user_id, null: false
      
      t.timestamps null: false
    end
    add_index :timelapse_hubs, :user_id
  end
end
