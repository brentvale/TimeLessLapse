class AddWebsiteAndTagLineToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :website_url, :string
    add_column :users, :tag_line, :string
    add_attachment :users, :avatar
  end
end
