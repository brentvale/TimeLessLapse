class AddPublicBoolToHubsTable < ActiveRecord::Migration
  def change
    add_column :timelapse_hubs, :public, :bool, default: false
  end
end
