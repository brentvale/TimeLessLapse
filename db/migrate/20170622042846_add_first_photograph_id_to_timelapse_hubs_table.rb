class AddFirstPhotographIdToTimelapseHubsTable < ActiveRecord::Migration
  def change
    add_column :timelapse_hubs, :first_photograph_id, :integer
  end
end
